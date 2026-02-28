import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'table',
  title: 'Tabla',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Filas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            {
              name: 'cells',
              title: 'Celdas',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
  ],
});
