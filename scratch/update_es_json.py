import json
import sys

file_path = '/Users/manu/Documents/1.Projects/Noctra-studio/website/noctra-studio/messages/es.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

new_tech_page = {
    "hero": {
      "title": "La tecnología no es compleja.",
      "subtitle": "Está mal explicada.",
      "description": "En un mundo que vende herramientas como si fueran magia, nosotros te damos el plano del motor para que entiendas el valor real de tu inversión."
    },
    "problem": {
      "title": "El ruido digital",
      "copy": "La mayoría de las agencias venden nombres de herramientas (React, Cloud, AI) para crear una barrera de complejidad. Esa barrera genera dependencia técnica y confusión estratégica. En Noctra, creemos que la tecnología solo tiene valor si es invisible, predecible y está al servicio de tu negocio."
    },
    "blueprint": {
      "label": "EL PLANO DEL SISTEMA",
      "title": "Tres capas de claridad",
      "items": [
        {
          "label": "01 · Cimentación",
          "title": "El fin del mantenimiento infinito",
          "explanation": "Usar tecnologías de vanguardia (Next.js) elimina la necesidad de actualizaciones constantes de plugins y el miedo a que el sitio se rompa sin previo aviso.",
          "example": "Es la diferencia entre una casa de madera que requiere mantenimiento constante y una estructura de concreto reforzado que dura décadas.",
          "impact": "Cero costos de mantenimiento técnico mensual e inversión protegida a largo plazo."
        },
        {
          "label": "02 · Inteligencia",
          "title": "Datos que trabajan, no que estorban",
          "explanation": "Estructurar la información para que tu negocio sea legible tanto para humanos como para algoritmos. Tu sitio deja de ser un folleto para ser un activo.",
          "example": "Un catálogo que se actualiza solo en los resultados de Google en el momento que cambias un dato en tu sistema interno.",
          "impact": "Aparición orgánica en búsquedas sin depender de pautas publicitarias infinitas."
        },
        {
          "label": "03 · Conectividad",
          "title": "El sistema nervioso digital",
          "explanation": "Automatizar flujos de trabajo para que el dato viaje sin fricción entre marketing, ventas y operación.",
          "example": "Un nuevo contacto en tu web activa un recordatorio en tu CRM y envía un WhatsApp de bienvenida de forma autónoma.",
          "impact": "Recuperas más de 10 horas semanales de gestión manual y eliminas el error humano."
        }
      ]
    },
    "system": {
      "label": "EL MÉTODO NOCTRA",
      "title": "Diseñamos este entendimiento en cada línea de código.",
      "subtitle": "No implementamos tecnología por moda. La implementamos por arquitectura de negocio.",
      "radar_note": "Nuestro software (Radar) monitorea la cimentación. Social sostiene la inteligencia. El Studio diseña la conectividad."
    },
    "cta": {
      "title": "¿Listo para aclarar tu sistema digital?",
      "primary": "Diagnosticar mi sistema",
      "secondary": "Ver método de trabajo",
      "subtitle": "Descubre los puntos de fuga de tu arquitectura actual en una consulta de 30 minutos."
    }
}

data['TechnologyPage'] = new_tech_page

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Successfully updated TechnologyPage in es.json")
