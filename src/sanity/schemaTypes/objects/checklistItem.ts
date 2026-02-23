import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'checklistItem',
  title: 'Ítem de checklist',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Descripción del ítem',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Detalle adicional (opcional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'required',
      title: '¿Es obligatorio?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'label' },
  },
});
