/* =================================================
   VERDURE – les données des plantes
   Un tableau d'objets : une plante = un objet.
   Ne modifiez pas ce fichier : servez-vous de la variable
   « plantes » dans vos propres scripts.
   ================================================= */

const plantes = [
  {
    "id": 1,
    "nom": "Monstera",
    "nomLatin": "Monstera deliciosa",
    "prix": 24.9,
    "difficulte": "facile",
    "lumiere": "Lumière indirecte",
    "arrosage": "1 fois par semaine",
    "description": "Ses grandes feuilles découpées en font la star des intérieurs. Elle pousse vite et pardonne les petits oublis d’arrosage.",
    "couleur": "#8DB596"
  },
  {
    "id": 2,
    "nom": "Pothos",
    "nomLatin": "Epipremnum aureum",
    "prix": 14.5,
    "difficulte": "facile",
    "lumiere": "Mi-ombre",
    "arrosage": "Quand la terre est sèche",
    "description": "Une plante retombante presque increvable, idéale en hauteur sur une étagère ou en suspension.",
    "couleur": "#4E7D5B"
  },
  {
    "id": 3,
    "nom": "Cactus",
    "nomLatin": "Cereus peruvianus",
    "prix": 9.9,
    "difficulte": "facile",
    "lumiere": "Plein soleil",
    "arrosage": "1 fois par mois",
    "description": "Le compagnon parfait des oublieux : un arrosage par mois suffit, et il adore les rebords de fenêtre.",
    "couleur": "#C9D9A6"
  },
  {
    "id": 4,
    "nom": "Calathea",
    "nomLatin": "Calathea orbifolia",
    "prix": 19.9,
    "difficulte": "intermediaire",
    "lumiere": "Lumière indirecte",
    "arrosage": "2 fois par semaine",
    "description": "Ses feuilles rayées se replient le soir. Elle aime l’humidité : pensez à la brumiser régulièrement.",
    "couleur": "#A9C9B0"
  },
  {
    "id": 5,
    "nom": "Sansevieria",
    "nomLatin": "Dracaena trifasciata",
    "prix": 17.5,
    "difficulte": "facile",
    "lumiere": "Toutes expositions",
    "arrosage": "Toutes les 3 semaines",
    "description": "Droite et graphique, elle supporte presque tout, même un coin un peu sombre.",
    "couleur": "#3E6A4B"
  },
  {
    "id": 6,
    "nom": "Ficus lyrata",
    "nomLatin": "Ficus lyrata",
    "prix": 39.0,
    "difficulte": "intermediaire",
    "lumiere": "Lumière vive",
    "arrosage": "1 fois par semaine",
    "description": "Ses grandes feuilles en forme de violon impressionnent. Il déteste être déplacé : trouvez-lui sa place et n’y touchez plus.",
    "couleur": "#6E9C7A"
  },
  {
    "id": 7,
    "nom": "Strelitzia",
    "nomLatin": "Strelitzia nicolai",
    "prix": 49.0,
    "difficulte": "expert",
    "lumiere": "Plein soleil",
    "arrosage": "2 fois par semaine",
    "description": "L’oiseau de paradis demande beaucoup de lumière et de place, mais transforme une pièce en jungle.",
    "couleur": "#5F8F6B"
  },
  {
    "id": 8,
    "nom": "Fougère de Boston",
    "nomLatin": "Nephrolepis exaltata",
    "prix": 16.9,
    "difficulte": "intermediaire",
    "lumiere": "Mi-ombre",
    "arrosage": "Terre toujours humide",
    "description": "Une cascade de frondes légères, parfaite pour une salle de bain lumineuse.",
    "couleur": "#7FAF83"
  },
  {
    "id": 9,
    "nom": "Orchidée",
    "nomLatin": "Phalaenopsis",
    "prix": 22.0,
    "difficulte": "expert",
    "lumiere": "Lumière indirecte",
    "arrosage": "Par trempage, 1 fois par semaine",
    "description": "Elle fleurit plusieurs mois par an, à condition de respecter son arrosage par trempage.",
    "couleur": "#C7B8D6"
  },
  {
    "id": 10,
    "nom": "Pilea",
    "nomLatin": "Pilea peperomioides",
    "prix": 12.0,
    "difficulte": "facile",
    "lumiere": "Lumière vive",
    "arrosage": "1 fois par semaine",
    "description": "La plante à monnaie et ses feuilles rondes. Elle fait facilement des bébés que l’on peut offrir.",
    "couleur": "#B5CF8E"
  }
];

const nbPlante = document.querySelector("#nb-plantes");
nbPlante.innerHTML = plantes.length;