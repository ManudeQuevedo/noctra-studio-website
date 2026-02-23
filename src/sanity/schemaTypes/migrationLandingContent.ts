import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'migrationLandingContent',
  title: 'Landing — Sección de Migración',
  type: 'document',
  // @ts-ignore
  icon: () => '🚀',
  // @ts-ignore - Sanity studio feature for singletons
  __experimental_actions: ['update', 'publish'], // Singleton: no crear ni eliminar
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Tag superior',
      type: 'string',
      initialValue: 'Migración sin complicaciones',
    }),
    defineField({
      name: 'headline',
      title: 'Título principal',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'subheadline',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'steps',
      title: 'Pasos del proceso',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Número', type: 'number' },
            { name: 'title', title: 'Título del paso', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text' },
            { name: 'icon', title: 'Ícono (emoji o nombre)', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas de confianza',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor', type: 'string' },
            { name: 'label', title: 'Etiqueta', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'CTA primario (texto del botón)',
      type: 'string',
    }),
    defineField({
      name: 'ctaPrimaryUrl',
      title: 'CTA primario (URL)',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'CTA secundario (texto del enlace)',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryUrl',
      title: 'CTA secundario (URL)',
      type: 'string',
    }),
    defineField({
      name: 'reassuranceBox',
      title: 'Caja de tranquilidad',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'body', title: 'Cuerpo', type: 'text' },
      ],
    }),
  ],
});
