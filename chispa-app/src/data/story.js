// Historia ramificada: en cada escena, ambos eligen en secreto una opción.
// Si coinciden ("en sintonía"), la historia sigue por un camino;
// si no coinciden, sigue por otro camino, igual de interesante.
// Puedes editar el texto o añadir más nodos siguiendo la misma forma.

export const STORY = {
  start: {
    text:
      'Se encuentran en un bar poco iluminado que ninguno de los dos conocía. ' +
      'Hay una sola mesa libre, al fondo, casi escondida.',
    options: [
      { id: 'a', label: 'Proponer sentarse en esa mesa del fondo' },
      { id: 'b', label: 'Quedarse en la barra, donde hay más gente' },
    ],
    onMatch: 'mesa_fondo',
    onMismatch: 'tension_inicial',
  },

  mesa_fondo: {
    text:
      'Los dos van directo a la misma mesa, como si lo hubieran acordado sin hablarlo. ' +
      'La música baja un poco justo cuando se sientan.',
    options: [
      { id: 'a', label: 'Romper el hielo con una pregunta directa' },
      { id: 'b', label: 'Dejar que el silencio hable primero' },
    ],
    onMatch: 'complicidad',
    onMismatch: 'juego_miradas',
  },

  tension_inicial: {
    text:
      'Uno se queda en la mesa y el otro en la barra. Hay algo de tensión buena en la distancia: ' +
      'se miran de lejos más de una vez.',
    options: [
      { id: 'a', label: 'Acortar la distancia y acercarse' },
      { id: 'b', label: 'Esperar a ver quién cede primero' },
    ],
    onMatch: 'acercamiento',
    onMismatch: 'juego_miradas',
  },

  complicidad: {
    text:
      'La conversación fluye fácil, casi con demasiada complicidad. En algún punto sus manos ' +
      'están más cerca de lo que empezaron.',
    options: [
      { id: 'a', label: 'Sugerir seguir la noche en otro lugar, más tranquilo' },
      { id: 'b', label: 'Quedarse ahí, alargando el momento' },
    ],
    end: false,
    onMatch: 'final_sintonia',
    onMismatch: 'final_intriga',
  },

  juego_miradas: {
    text:
      'Ninguno da el primer paso del todo, pero tampoco lo evita: se arma un juego de miradas ' +
      'que dura más de lo normal.',
    options: [
      { id: 'a', label: 'Romper el juego con algo atrevido' },
      { id: 'b', label: 'Disfrutar el juego un rato más' },
    ],
    onMatch: 'final_atrevido',
    onMismatch: 'final_intriga',
  },

  acercamiento: {
    text:
      'Terminan compartiendo la misma mesa después de todo. La plática se siente distinta ' +
      'después de esa espera.',
    options: [
      { id: 'a', label: 'Decir directamente lo que se estaba pensando' },
      { id: 'b', label: 'Guardarlo para después, con una sonrisa' },
    ],
    onMatch: 'final_sintonia',
    onMismatch: 'final_atrevido',
  },

  final_sintonia: {
    text:
      'Terminan la noche de acuerdo en algo: quieren que haya una próxima vez, y pronto. ' +
      'Están más en sintonía de lo que ninguno de los dos esperaba.',
    end: true,
    resultLabel: 'Final: En sintonía 💫',
  },

  final_intriga: {
    text:
      'La noche termina sin resolver del todo la tensión — y eso, de alguna manera, ' +
      'la deja más interesante todavía. Queda pendiente.',
    end: true,
    resultLabel: 'Final: Intriga sin resolver 🌙',
  },

  final_atrevido: {
    text:
      'Uno de los dos se anima a decir exactamente lo que estaba pensando, sin rodeos. ' +
      'La noche cambia de tono de inmediato.',
    end: true,
    resultLabel: 'Final: Atrevido 🔥',
  },
}

export const STORY_START_ID = 'start'
