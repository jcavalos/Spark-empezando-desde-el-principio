// 20 preguntas de "esto o lo otro", ordenadas de más tranquilas a más intensas.
// Cada una que coincide da un punto a AMBOS. Al final, quien tenga menos puntos
// saca un castigo al azar de la lista de abajo. Si empatan, no hay castigo
// (o pueden sacar uno cada quien, como quieran jugarlo).

export const TWENTY_QUESTIONS = [
  { a: 'Mensaje en la mañana', b: 'Mensaje antes de dormir' },
  { a: 'Cita en casa viendo películas', b: 'Cita afuera, explorando algo nuevo' },
  { a: 'Que te digan las cosas de frente', b: 'Que te las insinúen' },
  { a: 'Reírse de algo tonto juntos', b: 'Hablar de algo profundo juntos' },
  { a: 'Un abrazo largo', b: 'Una mirada que dice todo' },
  { a: 'Planear la cita perfecta', b: 'Improvisar sobre la marcha' },
  { a: 'Que te presuman en público', b: 'Que lo suyo sea más discreto' },
  { a: 'Un cumplido inesperado', b: 'Un gesto pequeño pero constante' },
  { a: 'Coquetear todo el día por chat', b: 'Guardarlo todo para verse en persona' },
  { a: 'Tomar la iniciativa tú', b: 'Que la tomen contigo' },
  { a: 'Una noche de plática sin parar', b: 'Una noche donde sobran las palabras' },
  { a: 'Que te esperen despiertos con un mensaje', b: 'Que te sorprendan sin avisar' },
  { a: 'Un beso que se ve venir toda la noche', b: 'Un beso que llega de sorpresa' },
  { a: 'Dejar algo a la imaginación', b: 'Ser directos con lo que quieren' },
  { a: 'Una cita que termina en un buen "buenas noches"', b: 'Una cita que no quiere terminar' },
  { a: 'Que decidan juntos qué pasa después', b: 'Dejarse llevar sin planear nada' },
  { a: 'Un mensaje que te deja pensando toda la noche', b: 'Un momento que no deja nada a la imaginación' },
  { a: 'Tomar el control de la situación', b: 'Soltar el control por completo' },
  { a: 'Hablar de lo que quieren, sin pena', b: 'Que se entienda todo sin decir nada' },
  { a: 'Que la noche termine ahí', b: 'Que la noche apenas empiece' },
]

export const PUNISHMENTS = [
  'Cantarle una canción de amor cursi por audio, completa.',
  'Mandarle un piropo exageradísimo, en forma de poema malo.',
  'Confesar la cosa más vergonzosa que le haya pasado esta semana.',
  'Dejar que la otra persona le ponga un apodo nuevo y usarlo toda la semana.',
  'Mandar la selfie más chistosa (o fea) que tenga guardada en el celular.',
  'Escribir un mensaje de buenas noches digno de telenovela, con música de fondo.',
  'Confesar a quién estuvo stalkeando últimamente en redes sociales.',
  'Mandar un audio imitando a alguien famoso diciendo algo random.',
  'Dejar que la otra persona elija qué va a cenar hoy, sin protestar.',
  'Mandar un audio susurrando un cumplido sincero.',
  'Responder sin evadir una pregunta incómoda que le hagan.',
  'Hacer un cumplido sincero sin usar la palabra "bonita" o "bonito".',
  'Contar un sueño (de los de dormir) que haya tenido con la otra persona, real o inventado.',
  'Dejar que la otra persona elija el próximo reto de Verdad o Reto por ti.',
  'Mandar un audio de un minuto contando por qué le gusta la otra persona, sin cortarse.',
]