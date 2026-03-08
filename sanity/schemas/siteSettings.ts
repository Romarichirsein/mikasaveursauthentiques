import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'Numéro WhatsApp',
      type: 'string',
      description: 'Format attendu: 237694916971 (sans le +)',
      validation: (Rule) => Rule.required(),
      initialValue: '237694916971',
    }),
    defineField({
      name: 'openingHours',
      title: 'Horaires d\'ouverture',
      type: 'text',
      initialValue: 'Lundi à vendredi : 10h à 17h\nWeek-end : Sur grandes commandes familiales',
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Zones de livraison',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Yaoundé'],
    }),
    defineField({
      name: 'heroTagline',
      title: 'Slogan Hero',
      type: 'string',
      initialValue: 'Le goût naturel, la saveur authentique.',
    }),
  ],
})
