// Niveles del medidor de intensidad. Cada nivel tiene sus propias verdades y retos.
// Puedes editar, quitar o añadir las que quieras — entre más agreguen, menos se repite el juego.

export const LEVELS = [
  { id: 1, label: 'Tierno', emoji: '🌱' },
  { id: 2, label: 'Coqueto', emoji: '😏' },
  { id: 3, label: 'Atrevido', emoji: '🔥' },
  { id: 4, label: 'Picante', emoji: '🌶️' },
  { id: 5, label: 'Fuego', emoji: '💋' },
]

export const PROMPTS = {
  1: {
    truth: [
      '¿Cuál fue tu primera impresión de mí?',
      '¿Qué es algo que te hace reír incluso cuando no quieres?',
      '¿Cuál es un recuerdo que te da nostalgia bonita?',
      '¿Qué canción no puede faltar en tu playlist ahora mismo?',
      '¿Qué es algo que admiras de la gente en general?',
    ],
    dare: [
      'Mándame un audio contando cómo estuvo tu día, con lujo de detalle.',
      'Enséñame algo que tengas cerca que te haga sonreír.',
      'Cuéntame un chiste malo, lo más serio que puedas.',
      'Manda una foto de tu snack favorito ahora mismo.',
      'Describe tu día perfecto en tres palabras.',
    ],
  },
  2: {
    truth: [
      '¿Qué es lo primero que notas en alguien que te llama la atención?',
      '¿Prefieres los mensajes de texto largos o las llamadas a media noche?',
      '¿Cuál ha sido tu cumplido favorito que te han dicho?',
      '¿Qué canción pondrías si estuviéramos coqueteando por chat?',
      '¿Qué es algo que te parece irresistible en una conversación?',
    ],
    dare: [
      'Mándame el emoji que mejor describe cómo te sientes ahora mismo, sin explicar por qué.',
      'Escribe una frase para coquetear conmigo como si nos acabáramos de conocer.',
      'Manda una selfie con tu mejor cara de "no estoy coqueteando, tú qué crees".',
      'Dime un apodo nuevo para mí, ahí improvisado.',
      'Cuéntame algo que te daría curiosidad probar conmigo (nada explícito, solo la idea).',
    ],
  },
  3: {
    truth: [
      '¿Qué detalle pequeño de alguien te desarma por completo?',
      '¿Cuál ha sido el momento más tenso-lindo de una cita?',
      '¿Prefieres que te sorprendan o planear todo con anticipación?',
      '¿Qué tan buena eres/eres para disimular cuando alguien te gusta?',
      '¿Qué es algo que te pondría muy nerviosa/o en una primera vez con alguien?',
    ],
    dare: [
      'Mándame un audio susurrando lo primero que se te ocurra.',
      'Describe, sin usar la palabra directa, qué tipo de cita te encantaría tener conmigo.',
      'Manda una foto donde se note que te arreglaste un poco para "la ocasión".',
      'Escribe el inicio de un mensaje que mandarías si quisieras dejarme pensando toda la noche.',
      'Cuéntame cuál sería tu manera ideal de romper el hielo cara a cara.',
    ],
  },
  4: {
    truth: [
      '¿Qué es algo que te resulta muy atractivo en la forma de hablar de alguien?',
      '¿Cómo te gusta que te noten cuando entras a un lugar?',
      '¿Qué tan directa te gusta que sea la gente cuando le gustas?',
      '¿Cuál ha sido el mensaje de texto que más te ha acelerado el pulso?',
      '¿Qué ambiente (lugar, hora, clima) te pone en modo "quiero que pase algo"?',
    ],
    dare: [
      'Mándame un audio en el tono de voz más bajo que tengas, diciendo cualquier cosa.',
      'Escribe una escena corta de cómo empezaría una noche perfecta entre los dos, sin pasar de la puerta.',
      'Manda una foto que muestre tu mejor "mirada" — la que usas cuando quieres decir algo sin hablar.',
      'Dime algo que llevarías puesto para una noche especial, sin dar más detalle del necesario.',
      'Cuéntame qué canción pondrías de fondo para una noche así.',
    ],
  },
  5: {
    truth: [
      '¿Qué es lo que más te intriga de mí en este momento?',
      '¿Qué tan seguido piensas en un "qué tal si" entre nosotros?',
      '¿Qué te gustaría que pasara si hoy nos viéramos en persona?',
      '¿Qué frase mía se te quedó grabada de una forma que no esperabas?',
      '¿Qué tanto te gusta la idea de dejar que el otro tome la iniciativa?',
    ],
    dare: [
      'Mándame el audio más sugerente que te animes a mandar, sin decir nada explícito — solo el tono.',
      'Escribe el mensaje que me mandarías si quisieras que no dejara de pensar en ti el resto de la noche.',
      'Manda la foto más "solo para mis ojos" que te sientas cómoda mandando (tú decides qué tan lejos llega eso).',
      'Describe, con toda la intriga posible, cómo sería el "buenas noches" perfecto entre los dos.',
      'Dime, sin filtro, qué es lo que más ganas te da de hacer la próxima vez que nos veamos.',
    ],
  },
}
