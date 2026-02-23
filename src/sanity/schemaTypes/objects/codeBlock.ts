import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'codeBlock',
  title: 'Bloque de código',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Lenguaje',
      type: 'string',
      options: {
        list: ['bash', 'javascript', 'typescript', 'sql', 'json', 'csv', 'text'],
      },
    }),
    defineField({
      name: 'filename',
      title: 'Nombre del archivo (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'Código',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'filename', subtitle: 'language' },
  },
});
