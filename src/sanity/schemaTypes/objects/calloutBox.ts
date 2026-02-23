import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'calloutBox',
  title: 'Caja de aviso',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: '💡 Tip', value: 'tip' },
          { title: '⚠️ Advertencia', value: 'warning' },
          { title: '❌ Importante / Error', value: 'error' },
          { title: 'ℹ️ Información', value: 'info' },
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'type', subtitle: 'content' },
  },
});
