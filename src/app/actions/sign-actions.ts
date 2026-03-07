"use server";

import { createAdminClient, createClient } from "@/utils/supabase/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";

interface SignHistoryEntry {
  ip: string;
  userAgent: string;
  timestamp: string;
  status: "SENT" | "VIEWED" | "SIGNED";
}

/**
 * Generates a secure signing envelope and returns the hash
 */
export async function generateSigningLink(documentId: string, type: "proposal" | "contract", organizationId: string) {
  const supabase = await createClient();
  const hash = uuidv4();
  
  // Create an envelope linking the source document
  const envelopeData = {
    organization_id: organizationId,
    [type === "proposal" ? "proposal_id" : "contract_id"]: documentId,
    status: "sent",
    pdf_path: `${documentId}_draft.pdf`, // Mock for now: actual PDF generation should precede this
    hash_token: hash
  };

  const { data, error } = await supabase
    .from("document_envelopes")
    .insert(envelopeData)
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  // Optionally, we could update the source proposal/contract to reflect it's locked for signing,
  // but keeping it simple for the envelope architecture.
  
  return { hash, data };
}

/**
 * Validates a hash and returns the associated envelope with document details
 */
export async function validateSigningHash(hash: string) {
  const supabase = await createAdminClient();

  const { data: envelope, error } = await supabase
    .from("document_envelopes")
    .select(`
      *,
      proposals (*, lead:leads(*)),
      contracts (*, lead:leads(*))
    `)
    .eq("hash_token", hash)
    .single();

  if (error || !envelope) return null;

  // Determine type and format response to match expectations
  if (envelope.proposals) {
    return { type: "proposal", data: envelope.proposals, envelope };
  } else if (envelope.contracts) {
    return { type: "contract", data: envelope.contracts, envelope };
  }

  return null;
}

/**
 * Stamps a PDF with the signature and audit trail
 */
export async function stampDocumentSignature(
  hash: string,
  signatureDataUrl: string,
  auditData: { ip: string; userAgent: string; email: string; name: string }
) {
  const supabase = await createAdminClient();
  
  const timestamp = new Date().toISOString();

  const { data: envelope, error: envelopeError } = await supabase
    .from("document_envelopes")
    .select("id, status, expires_at, hash_token")
    .eq("hash_token", hash)
    .single();

  if (envelopeError || !envelope) {
    throw new Error("Invalid signing link");
  }

  if (envelope.status === "signed") {
    throw new Error("Document already signed");
  }

  if (envelope.expires_at && new Date(envelope.expires_at) < new Date()) {
    throw new Error("Signing link expired");
  }

  // 1. Log the signature event in the audit table FIRST
  const { error: signatureError } = await supabase
    .from("document_signatures")
    .insert({
      envelope_id: envelope.id,
      signer_name: auditData.name,
      signer_email: auditData.email,
      ip_address: auditData.ip,
      device_fingerprint: auditData.userAgent,
      signed_at: timestamp
    });

  if (signatureError) throw new Error(`Audit log failed: ${signatureError.message}`);

  // 2. STAMPING LOGIC (Mocked fetch for existing PDF bytes)
  // In a real flow:
  // const { data: fileData } = await supabase.storage.from('contracts').download(envelope.pdf_path);
  const existingPdfBytes = await fetchPlaceholderPdf(); 
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];
  
  // Embed Signature Image
  const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
  const signatureDims = signatureImage.scale(0.25);

  // Draw Signature and Audit Trail
  const { width, height } = lastPage.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Background for audit trail
  lastPage.drawRectangle({
    x: 50,
    y: 50,
    width: width - 100,
    height: 120,
    color: rgb(0.97, 0.97, 0.97),
  });

  // Stamp Signature
  lastPage.drawImage(signatureImage, {
    x: 100,
    y: 110,
    width: signatureDims.width,
    height: signatureDims.height,
  });

  // Audit Text
  lastPage.drawText("CERTIFICADO DE FIRMA DIGITAL - NOCTRA SIGN", {
    x: 70,
    y: 155,
    size: 10,
    font: boldFont,
    color: rgb(0.1, 0.6, 0.4),
  });

  lastPage.drawText(`IP: ${auditData.ip}`, { x: 70, y: 90, size: 8, font });
  lastPage.drawText(`Fecha: ${timestamp}`, { x: 70, y: 75, size: 8, font });
  lastPage.drawText(`Envelope ID: ${envelope.id}`, { x: 70, y: 60, size: 8, font });

  // 3. Save stamped PDF
  const pdfBytes = await pdfDoc.save();
  const signedPath = `${envelope.id}_signed.pdf`;
  
  // Mock Upload to storage
  // const { error: uploadError } = await supabase.storage.from('contracts').upload(signedPath, pdfBytes);

  // 4. Update Envelope Status
  const { error: updateError } = await supabase
    .from("document_envelopes")
    .update({ 
      status: "signed",
      signed_pdf_path: signedPath,
      hash_token: null // Invalidate public hash
    })
    .eq("id", envelope.id);

  if (updateError) throw new Error(updateError.message);

  return { success: true, timestamp };
}

// Helper for demonstration
async function fetchPlaceholderPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText("Documento de Prueba para Noctra Sign");
  return pdfDoc.save();
}
