// Preguntas para responder en privado y luego adivinar la respuesta del otro.
// El campo "spicy" marca si conviene desbloquearla solo con el medidor en 3+.

export const KNOW_ME_QUESTIONS = [
  // 💚 Tiernas
  { id: 'q1', text: '¿Cuál es tu manera favorita de que te coqueten?', spicy: false },
  { id: 'q2', text: '¿Prefieres un mensaje de buenos días o uno de buenas noches?', spicy: false },
  { id: 'q3', text: '¿Qué es lo primero que se te queda grabado de alguien?', spicy: false },
  { id: 'q4', text: '¿Qué tan buena idea te parece una cita a ciegas?', spicy: false },
  { id: 'q5', text: '¿Cuál sería una cita perfecta para ti?', spicy: false },
  { id: 'q6', text: '¿Qué detalle romántico nunca olvidarías?', spicy: false },
  { id: 'q7', text: '¿Qué canción te recuerda al amor?', spicy: false },
  { id: 'q8', text: '¿Eres más de abrazos largos o besos cortos?', spicy: false },
  { id: 'q9', text: '¿Qué cualidad te enamora más rápido?', spicy: false },
  { id: 'q10', text: '¿Crees en el amor a primera vista?', spicy: false },
  { id: 'q11', text: '¿Qué apodo cariñoso te gustaría que te dijeran?', spicy: false },
  { id: 'q12', text: '¿Qué lugar sueñas visitar con alguien especial?', spicy: false },

  // 💛 Atrevidas
  { id: 'q13', text: '¿Qué tipo de mensaje te acelera más el pulso: uno directo o uno sugerido?', spicy: true },
  { id: 'q14', text: '¿Prefieres tomar la iniciativa o que la tomen contigo?', spicy: true },
  { id: 'q15', text: '¿Qué ambiente asocias más con "algo puede pasar esta noche"?', spicy: true },
  { id: 'q16', text: '¿Qué tanto te gusta la intriga antes de que pase algo?', spicy: true },
  { id: 'q17', text: '¿Qué piensas cuando alguien mantiene demasiado el contacto visual contigo?', spicy: true },
  { id: 'q18', text: '¿Cuál ha sido el mejor piropo que te han dicho?', spicy: true },
  { id: 'q19', text: '¿Te gustan más las personas misteriosas o las que dicen todo lo que sienten?', spicy: true },
  { id: 'q20', text: '¿Qué gesto de coqueteo te parece irresistible?', spicy: true },
  { id: 'q21', text: '¿Qué tan importante es la química desde la primera cita?', spicy: true },
  { id: 'q22', text: '¿Cuál ha sido la cita más inesperada que has tenido?', spicy: true },
  { id: 'q23', text: '¿Alguna vez alguien te dejó sin palabras con solo una mirada?', spicy: true },
  { id: 'q24', text: '¿Qué tan rápido te enamoras del sentido del humor de alguien?', spicy: true },

  // 🧡 Coqueteo intenso
  { id: 'q25', text: '¿Cuál es tu mayor debilidad cuando alguien te gusta?', spicy: true },
  { id: 'q26', text: '¿Qué cumplido te haría sonrojar más?', spicy: true },
  { id: 'q27', text: '¿Qué harías si alguien que te encanta te pidiera un beso?', spicy: true },
  { id: 'q28', text: '¿Prefieres robar un beso o que te lo roben?', spicy: true },
  { id: 'q29', text: '¿Qué tan importante es la tensión antes del primer beso?', spicy: true },
  { id: 'q30', text: '¿Dónde sería el lugar más romántico para un beso?', spicy: true },
  { id: 'q31', text: '¿Qué detalle puede hacer que pierdas completamente la cabeza por alguien?', spicy: true },
  { id: 'q32', text: '¿Qué tipo de perfume te resulta más atractivo?', spicy: true },
  { id: 'q33', text: '¿Qué mirada dice más que mil palabras?', spicy: true },
  { id: 'q34', text: '¿Qué tan celoso(a) eres cuando alguien te interesa?', spicy: true },
  { id: 'q35', text: '¿Te gustan más los besos espontáneos o los planeados?', spicy: true },
  { id: 'q36', text: '¿Cuál sería una cita que probablemente terminaría siendo inolvidable?', spicy: true },

  // ❤️🔥 Fuego (sugerentes, no explícitas)
  { id: 'q37', text: '¿Qué parte de una persona te parece más atractiva?', spicy: true },
  { id: 'q38', text: '¿Qué tan importante es la tensión romántica antes de dar el siguiente paso?', spicy: true },
  { id: 'q39', text: '¿Qué tipo de contacto físico te hace sentir más conectado con alguien?', spicy: true },
  { id: 'q40', text: '¿Prefieres un abrazo largo o un beso apasionado?', spicy: true },
  { id: 'q41', text: '¿Cuál es el lugar más inesperado donde te gustaría recibir un beso?', spicy: true },
  { id: 'q42', text: '¿Qué situación te parece más romántica bajo la lluvia?', spicy: true },
  { id: 'q43', text: '¿Qué tan importante es la química física en una relación?', spicy: true },
  { id: 'q44', text: '¿Qué tipo de mirada hace que pierdas la concentración?', spicy: true },
  { id: 'q45', text: '¿Qué crees que hace inolvidable un primer beso?', spicy: true },
  { id: 'q46', text: '¿Te gustan más las sorpresas románticas o las planeadas?', spicy: true },
  { id: 'q47', text: '¿Cuál es la mayor locura romántica que harías por alguien?', spicy: true },
  { id: 'q48', text: '¿Qué tan importante es la confianza para dejarte llevar por el momento?', spicy: true },
  { id: 'q49', text: '¿Cuál ha sido el momento más intenso de química que has sentido con alguien?', spicy: true },
  { id: 'q50', text: 'Si tuvieras que describir tu estilo de conquista con una sola palabra, ¿cuál sería?', spicy: true },
];