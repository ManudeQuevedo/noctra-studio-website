import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      
      S.listItem()
        .title("📚 Centro de Documentación")
        .child(
          S.list()
            .title("Documentación")
            .items([
              // Singleton — contenido de landing
              S.listItem()
                .title("Landing — Sección Migración")
                .child(
                  S.document()
                    .schemaType("migrationLandingContent")
                    .documentId("migrationLandingContent")
                ),
              
              S.divider(),

              // Guías por Tier
              S.listItem()
                .title("⚡ Guías Tier 1 — Conexión directa")
                .child(
                  S.documentList()
                    .title("Guías Tier 1")
                    .schemaType("migrationGuide")
                    .filter('_type == "migrationGuide" && tier == "tier1"')
                ),
              
              S.listItem()
                .title("☁️ Guías Tier 2 — Importación de archivo")
                .child(
                  S.documentList()
                    .title("Guías Tier 2")
                    .schemaType("migrationGuide")
                    .filter('_type == "migrationGuide" && tier == "tier2"')
                ),
              
              S.listItem()
                .title("📋 Todas las guías")
                .child(
                  S.documentList()
                    .title("Todas las guías")
                    .schemaType("migrationGuide")
                    .filter('_type == "migrationGuide"')
                ),
            ])
        ),
        
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post", 
            "category", 
            "author", 
            "migrationGuide", 
            "migrationLandingContent"
          ].includes(item.getId()!)
      ),
    ]);
