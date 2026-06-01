"use client";

import { useEffect } from "react";

type OwlightFeedbackWidgetProps = {
  locale: string;
};

const OWLIGHT_INTRO_STORAGE_KEY = "owlight_intro_dismissed";

const SPANISH_MX_TEXT: Record<string, string> = {
  Feedback: "Comentarios",
  "Help us improve": "Ayúdanos a mejorar",
  "Pick a topic": "¿Qué quieres contarnos?",
  "Tell us more": "Cuéntanos más",
  "Want a reply? Leave your email (optional)":
    "¿Quieres que te respondamos? Déjanos tu correo (opcional)",
  "Something not working?": "¿Algo no funciona?",
  "Got an idea? We'd love to hear it!":
    "¿Tienes una idea? Nos encantaría escucharla.",
  "Drop a quick note here...": "Escribe tu comentario...",
  "Send feedback": "Enviar comentarios",
  Sending: "Enviando",
  "Take screenshot": "Tomar captura",
  "Retake Screenshot": "Volver a tomar captura",
  "Tip: Drag to select an area. Press Esc to cancel.":
    "Consejo: arrastra para seleccionar un área. Presiona Esc para cancelar.",
  "Screenshot attached": "Captura adjunta",
  "There was an error capturing the page. Try uploading an image instead.":
    "Hubo un error al capturar la página. Intenta subir una imagen directamente.",
  "Or upload an image instead": "O sube una imagen directamente",
  "Your opinion matters": "Tu opinión importa",
  "Want to tell us something? Share your ideas here or let us know if you ran into a problem.":
    "¿Quieres contarnos algo? Comparte tus ideas o avísanos si encontraste algún problema.",
  "Share something": "Compartir algo",
  Later: "Después",
  "Thank you!": "¡Gracias!",
  "We appreciate your feedback and will review it soon.":
    "Gracias por tus comentarios. Los revisaremos pronto.",
  "Please enter some feedback": "Escribe un comentario antes de enviar",
  "Message is too long (max 5000 characters)":
    "El mensaje es demasiado largo (máximo 5000 caracteres)",
  "Please enter a valid email address": "Ingresa un correo válido",
  "Failed to submit feedback. Please try again.":
    "Algo salió mal. Inténtalo de nuevo.",
  "Feedback is temporarily unavailable.":
    "Los comentarios no están disponibles por ahora.",
  Problem: "Problema",
  Suggestion: "Sugerencia",
  Comment: "Comentario",
  "Ayudanos a mejorar": "Ayúdanos a mejorar",
  "¿Qué querés contarnos?": "¿Qué quieres contarnos?",
  "Contanos más": "Cuéntanos más",
  "¿Querés que te respondamos? Dejanos tu mail (opcional)":
    "¿Quieres que te respondamos? Déjanos tu correo (opcional)",
  "¿Algo no anda bien?": "¿Algo no funciona?",
  "¿Tenés una idea? ¡Queremos escucharla!":
    "¿Tienes una idea? Nos encantaría escucharla.",
  "Escribí lo que quieras...": "Escribe tu comentario...",
  Enviar: "Enviar comentarios",
  "Sacar captura": "Tomar captura",
  "Volver a capturar": "Volver a tomar captura",
  "Tip: Arrastrá para seleccionar. Presioná Esc para cancelar.":
    "Consejo: arrastra para seleccionar un área. Presiona Esc para cancelar.",
  "Captura adjuntada": "Captura adjunta",
  "Hubo un error al capturar la página. Probá subiendo una imagen directamente.":
    "Hubo un error al capturar la página. Intenta subir una imagen directamente.",
  "O subí una imagen directamente": "O sube una imagen directamente",
  "¿Querés contarnos algo? Podés dejar acá tus ideas o avisarnos si tuviste algún problema.":
    "¿Quieres contarnos algo? Comparte tus ideas o avísanos si encontraste algún problema.",
  "Contar algo": "Compartir algo",
  "Tu feedback nos ayuda mucho, lo vamos a revisar pronto.":
    "Gracias por tus comentarios. Los revisaremos pronto.",
  "Escribí algo antes de mandar": "Escribe un comentario antes de enviar",
  "Ingresá un email válido": "Ingresa un correo válido",
  "Algo falló, pero podés volver a intentar.":
    "Algo salió mal. Inténtalo de nuevo.",
  "El feedback no está disponible por ahora.":
    "Los comentarios no están disponibles por ahora.",
};

function createFeedbackIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.classList.add("lucide", "lucide-message-square-plus");

  const bubble = document.createElementNS("http://www.w3.org/2000/svg", "path");
  bubble.setAttribute(
    "d",
    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h9",
  );

  const vertical = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  vertical.setAttribute("d", "M19 3v6");

  const horizontal = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  horizontal.setAttribute("d", "M16 6h6");

  svg.append(bubble, vertical, horizontal);

  return svg;
}

function renderFeedbackMark(mark: HTMLElement) {
  if (mark.dataset.noctraIconRendered === "true") {
    return;
  }

  mark.dataset.noctraIconRendered = "true";
  mark.replaceChildren(createFeedbackIcon());
  mark.classList.add("noctra-feedback-mark");
}

function replaceBrokenLogo(shadowRoot: ShadowRoot) {
  shadowRoot
    .querySelectorAll<HTMLElement>(".feedback-btn, a[href*='owlight'] > div")
    .forEach((container) => {
      const marks = container.querySelectorAll<HTMLElement>(
        ".noctra-feedback-mark, .feedback-logo-fallback",
      );

      marks.forEach((mark, index) => {
        if (index === 0) {
          renderFeedbackMark(mark);
          return;
        }

        mark.remove();
      });
    });

  shadowRoot
    .querySelectorAll<HTMLSpanElement>('a[href*="owlight"] span')
    .forEach((span) => {
      if (span.textContent?.trim() === "Owlight") {
        span.style.display = "none";
        span.setAttribute("aria-hidden", "true");
      }
    });

  shadowRoot
    .querySelectorAll<HTMLElement>(".feedback-logo-fallback")
    .forEach((fallback) => {
      renderFeedbackMark(fallback);
    });

  shadowRoot
    .querySelectorAll<HTMLImageElement>('img[alt="Feedback Logo"]')
    .forEach((img) => {
      if (img.dataset.noctraLogoFixed === "true") {
        return;
      }

      img.dataset.noctraLogoFixed = "true";
      img.style.display = "none";

      const parent = img.parentElement;
      const existingMark = parent?.querySelector<HTMLElement>(
        ".noctra-feedback-mark, .feedback-logo-fallback",
      );

      if (existingMark) {
        renderFeedbackMark(existingMark);
        return;
      }

      if (
        img.previousElementSibling?.classList.contains("noctra-feedback-mark")
      ) {
        return;
      }

      const fallback = document.createElement("span");
      fallback.setAttribute("aria-hidden", "true");
      fallback.className = "noctra-feedback-mark";
      renderFeedbackMark(fallback);

      img.insertAdjacentElement("beforebegin", fallback);
    });
}

function applySpanishMxCopy(shadowRoot: ShadowRoot) {
  const walker = document.createTreeWalker(
    shadowRoot,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return node.textContent?.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );

  let node = walker.nextNode();
  while (node) {
    const text = node.textContent?.trim();
    if (text && SPANISH_MX_TEXT[text]) {
      node.textContent =
        node.textContent?.replace(text, SPANISH_MX_TEXT[text]) ?? null;
    }
    node = walker.nextNode();
  }

  shadowRoot.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    "input[placeholder], textarea[placeholder]",
  ).forEach((element) => {
    const replacement = SPANISH_MX_TEXT[element.placeholder];
    if (replacement) {
      element.placeholder = replacement;
    }
  });
}

function suppressAutomaticIntro(shadowRoot: ShadowRoot) {
  try {
    window.localStorage.setItem(OWLIGHT_INTRO_STORAGE_KEY, "1");
  } catch {
    // Storage can be blocked in private browsing; the DOM fallback below still
    // keeps the automatic welcome popover from staying visible.
  }

  const introDismissButton =
    shadowRoot.querySelector<HTMLButtonElement>(".intro-btn--secondary");
  const feedbackForm = shadowRoot.querySelector(".feedback-form");

  if (introDismissButton && !feedbackForm) {
    introDismissButton.click();
  }
}

function syncMobileLayoutState(shadowRoot: ShadowRoot) {
  const container = shadowRoot.querySelector<HTMLElement>(
    '[data-widget-container="true"]',
  );

  if (!container) {
    return;
  }

  const feedbackForm = shadowRoot.querySelector(".feedback-form");
  container.dataset.noctraOpen = feedbackForm ? "true" : "false";
}

function syncOwlightWidget(locale: string) {
  const host = document.getElementById("owlight-feedback-widget-host");
  const shadowRoot = host?.shadowRoot;

  if (!shadowRoot) {
    return false;
  }

  const noctraStyle = `
      [data-widget-container="true"] {
        top: 50% !important;
        right: 20px !important;
        bottom: auto !important;
        left: auto !important;
        transform: translateY(-50%) !important;
      }

      @media (max-width: 640px) {
        [data-widget-container="true"] {
          right: 16px !important;
        }

        [data-widget-container="true"][data-noctra-open="true"] {
          inset: 0 !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100vw !important;
          height: 100dvh !important;
          min-height: 100svh !important;
          padding: max(16px, env(safe-area-inset-top)) 16px max(96px, calc(env(safe-area-inset-bottom) + 96px)) 16px !important;
          transform: none !important;
          box-sizing: border-box !important;
        }

        [data-widget-container="true"][data-noctra-open="true"] .feedback-form {
          width: min(100%, 360px) !important;
          max-height: min(78dvh, calc(100dvh - 128px)) !important;
          margin: 0 !important;
          overflow-y: auto !important;
          overscroll-behavior: contain !important;
          -webkit-overflow-scrolling: touch !important;
        }

        [data-widget-container="true"][data-noctra-open="true"] .feedback-textarea {
          min-height: 120px !important;
          max-height: 180px !important;
        }
      }

      .dark {
        --owl-bg: #050505 !important;
        --owl-surface: #050505 !important;
        --owl-surface-2: #0a0a0a !important;
        --owl-line: rgba(255, 255, 255, 0.12) !important;
        --owl-ink: #f5f5f5 !important;
        --owl-ink-2: #a3a3a3 !important;
        --owl-ink-3: #8a8a8a !important;
        --owl-ink-4: #5f5f5f !important;
        --owl-accent: #ffffff !important;
        --owl-accent-ink: #050505 !important;
        --owl-error: #f87171 !important;
        --owl-success: #10b981 !important;
      }

      .feedback-form {
        background: rgba(5, 5, 5, 0.96) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        border-radius: 8px !important;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.48) !important;
      }

      [role="dialog"]:not(.feedback-form) {
        display: none !important;
      }

      a[href*="owlight"] {
        pointer-events: none !important;
      }

      a[href*="owlight"] > div > span:not(.noctra-feedback-mark):not(.feedback-logo-fallback) {
        display: none !important;
      }

      img[alt="Feedback Logo"] {
        display: none !important;
      }

      .noctra-feedback-mark,
      .feedback-logo-fallback {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
        flex: 0 0 36px !important;
        margin-right: 12px !important;
        border-radius: 8px !important;
        background: #ffffff !important;
        color: #050505 !important;
        line-height: 1 !important;
      }

      .noctra-feedback-mark svg,
      .feedback-logo-fallback svg {
        display: block !important;
        width: 20px !important;
        height: 20px !important;
        stroke-width: 2 !important;
      }

      .feedback-btn .noctra-feedback-mark,
      .feedback-btn .feedback-logo-fallback {
        width: 24px !important;
        height: 24px !important;
        flex-basis: 24px !important;
        margin-right: 0 !important;
        border-radius: 6px !important;
      }

      .feedback-btn .noctra-feedback-mark svg,
      .feedback-btn .feedback-logo-fallback svg {
        width: 15px !important;
        height: 15px !important;
      }

      .feedback-form h2 {
        color: #f5f5f5 !important;
        font-weight: 600 !important;
        letter-spacing: 0 !important;
      }

      .feedback-label {
        color: #a3a3a3 !important;
      }

      .feedback-toggle-button,
      .feedback-input,
      .feedback-textarea,
      .feedback-secondary-btn {
        border-color: rgba(255, 255, 255, 0.12) !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, 0.02) !important;
        color: #a3a3a3 !important;
      }

      .feedback-toggle-option input[type="radio"]:checked + .feedback-toggle-button {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(255, 255, 255, 0.32) !important;
        color: #ffffff !important;
        font-weight: 600 !important;
      }

      .feedback-textarea:focus,
      .feedback-input:focus {
        border-color: rgba(255, 255, 255, 0.38) !important;
      }

      .feedback-submit {
        height: 44px !important;
        background: #ffffff !important;
        color: #050505 !important;
        border: 1px solid rgba(255, 255, 255, 0.82) !important;
        border-radius: 8px !important;
        font-weight: 700 !important;
      }

      .feedback-submit:hover:not(:disabled) {
        opacity: 0.92 !important;
      }

      .feedback-close:hover {
        background: rgba(255, 255, 255, 0.08) !important;
      }
    `;

  let style = shadowRoot.getElementById(
    "owlight-noctra-position",
  ) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement("style");
    style.id = "owlight-noctra-position";
    shadowRoot.appendChild(style);
  }

  if (style.textContent !== noctraStyle) {
    style.textContent = noctraStyle;
  }

  replaceBrokenLogo(shadowRoot);
  syncMobileLayoutState(shadowRoot);
  suppressAutomaticIntro(shadowRoot);

  if (locale === "es") {
    applySpanishMxCopy(shadowRoot);
  }

  return true;
}

export function OwlightFeedbackWidget({ locale }: OwlightFeedbackWidgetProps) {
  useEffect(() => {
    let retryTimer: number | undefined;
    let shadowObserver: MutationObserver | undefined;

    const syncPosition = () => {
      if (!syncOwlightWidget(locale)) {
        retryTimer = window.setTimeout(syncPosition, 250);
        return;
      }

      const shadowRoot = document.getElementById(
        "owlight-feedback-widget-host",
      )?.shadowRoot;

      if (shadowRoot && !shadowObserver) {
        shadowObserver = new MutationObserver(() => syncOwlightWidget(locale));
        shadowObserver.observe(shadowRoot, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
    };

    syncPosition();

    const observer = new MutationObserver(syncPosition);
    observer.observe(document.body, { childList: true });

    return () => {
      observer.disconnect();
      shadowObserver?.disconnect();
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [locale]);

  return null;
}
