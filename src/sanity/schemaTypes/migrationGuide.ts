import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'migrationGuide',
  title: 'Guía de Migración',
  type: 'document',
  // @ts-ignore
  icon: () => '📦',
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma de origen',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          // Tier 1 — Conectores nativos
          { title: 'HubSpot', value: 'hubspot' },
          { title: 'Zoho CRM', value: 'zoho' },
          { title: 'Pipedrive', value: 'pipedrive' },
          { title: 'Odoo', value: 'odoo' },
          { title: 'Salesforce', value: 'salesforce' },
          { title: 'Freshsales', value: 'freshsales' },
          { title: 'Bitrix24', value: 'bitrix24' },
          // Tier 2 — Importación manual
          { title: 'Monday.com', value: 'monday' },
          { title: 'Notion', value: 'notion' },
          { title: 'Airtable', value: 'airtable' },
          { title: 'Excel / Google Sheets', value: 'excel' },
          { title: 'Act! CRM', value: 'act' },
          { title: 'SugarCRM', value: 'sugarcrm' },
          { title: 'Capsule CRM', value: 'capsule' },
          { title: 'Close CRM', value: 'close' },
          { title: 'Streak', value: 'streak' },
          { title: 'Plantilla Universal', value: 'universal' },
        ],
      },
    }),
    defineField({
      name: 'tier',
      title: 'Tipo de migración',
      type: 'string',
      options: {
        list: [
          { title: '⚡ Tier 1 — Conexión directa', value: 'tier1' },
          { title: '☁️ Tier 2 — Importación de archivo', value: 'tier2' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'platform', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platformLogo',
      title: 'Logo de la plataforma',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'platformColor',
      title: 'Color de marca (hex)',
      type: 'color', // using color-input here in the field type, though string works, color picker is better since we installed the plugin
      description: 'Ej: #FF7A59 para HubSpot',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Última actualización',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Tiempo estimado de migración',
      type: 'string',
      description: 'Ej: 15-30 minutos',
    }),
    defineField({
      name: 'difficulty',
      title: 'Dificultad',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Fácil', value: 'easy' },
          { title: '🟡 Medio', value: 'medium' },
          { title: '🔴 Avanzado', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'prerequisites',
      title: 'Requisitos previos',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: Tener permisos de administrador en HubSpot',
    }),
    defineField({
      name: 'exportSteps',
      title: 'Sección 1 — Cómo exportar desde la plataforma',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'codeBlock' }, { type: 'calloutBox' }, { type: 'table' }],
    }),
    defineField({
      name: 'prepareFileSteps',
      title: 'Sección 2 — Cómo preparar tu archivo (solo Tier 2)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'codeBlock' }, { type: 'calloutBox' }, { type: 'table' }],
    }),
    defineField({
      name: 'commonErrors',
      title: 'Sección 3 — Errores comunes y cómo resolverlos',
      type: 'array',
      of: [{ type: 'errorEntry' }],
    }),
    defineField({
      name: 'integrityChecks',
      title: 'Sección 4 — Validación de integridad',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'codeBlock' }, { type: 'calloutBox' }, { type: 'table' }],
    }),
    defineField({
      name: 'preImportChecklist',
      title: 'Sección 5 — Checklist pre-importación',
      type: 'array',
      of: [{ type: 'checklistItem' }],
    }),
    defineField({
      name: 'supportedEntities',
      title: 'Entidades soportadas en esta migración',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Contactos', value: 'contacts' },
          { title: 'Empresas', value: 'companies' },
          { title: 'Oportunidades / Deals', value: 'deals' },
          { title: 'Actividades', value: 'activities' },
          { title: 'Pipelines', value: 'pipelines' },
          { title: 'Etiquetas', value: 'tags' },
          { title: 'Documentos adjuntos', value: 'attachments' },
        ],
      },
    }),
    defineField({
      name: 'downloadableTemplate',
      title: 'Plantilla descargable',
      type: 'file',
      description: 'Archivo Excel/CSV con la plantilla para esta plataforma',
    }),
    defineField({
      name: 'videoTutorialUrl',
      title: 'URL de video tutorial (opcional)',
      type: 'url',
    }),
    defineField({
      name: 'faq',
      title: 'Preguntas frecuentes de esta guía',
      type: 'array',
      of: [{ type: 'faqItem' }],
    }),
    defineField({
      name: 'relatedGuides',
      title: 'Guías relacionadas',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'migrationGuide' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'tier' },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
  orderings: [
    { title: 'Plataforma A-Z', name: 'platformAsc', by: [{ field: 'platform', direction: 'asc' }] },
    { title: 'Actualización reciente', name: 'updatedDesc', by: [{ field: 'lastUpdated', direction: 'desc' }] },
  ],
});
