import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'errorEntry',
  title: 'Error común',
  type: 'object',
  fields: [
    defineField({
      name: 'errorMessage',
      title: 'Mensaje de error',
      type: 'string',
      description: 'Ej: "Email inválido en fila 45"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cause',
      title: 'Causa probable',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Solución',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formulaHelper',
      title: 'Fórmula de Excel/Sheets útil (opcional)',
      type: 'string',
      description: 'Ej: =TRIM(A2)',
    }),
    defineField({
      name: 'severity',
      title: 'Severidad',
      type: 'string',
      options: {
        list: [
          { title: '❌ Bloqueante', value: 'blocking' },
          { title: '⚠️ Advertencia', value: 'warning' },
          { title: 'ℹ️ Informativo', value: 'info' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'errorMessage', subtitle: 'severity' },
  },
});
