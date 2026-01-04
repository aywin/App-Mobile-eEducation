import { Formation, Document } from '../types';

const formations: Formation[] = [
  {
    id: '1',
    titre: 'Connaissances de base',
    partie: 'Partie 1',
    categorie: 'Cycle complet agricole',
    icon: '📖',
    color: '#1E3A8A',
    isInscrit: false,
    documents: [
      { id: 'd1', titre: 'Guide complet agricole', type: 'pdf', url: '#', duree: '45 pages' },
      { id: 'd2', titre: 'Introduction à l\'agriculture', type: 'video', url: '#', duree: '12:30' },
      { id: 'd3', titre: 'Présentation générale', type: 'pptx', url: '#', duree: '28 slides' },
    ],
  },
  {
    id: '2',
    titre: 'Santé Humaine Végétale',
    partie: 'Partie 2',
    categorie: 'Santé & Prévention',
    icon: '⚕️',
    color: '#22c55e',
    isInscrit: false,
    documents: [
      { id: 'd4', titre: 'Manuel de santé végétale', type: 'pdf', url: '#', duree: '60 pages' },
      { id: 'd5', titre: 'Maladies courantes', type: 'video', url: '#', duree: '18:45' },
      { id: 'd6', titre: 'Diagnostics rapides', type: 'pptx', url: '#', duree: '35 slides' },
    ],
  },
  {
    id: '3',
    titre: 'Insecticides & Reptiles',
    partie: 'Partie 2',
    categorie: 'Santé & Prévention',
    icon: '🔬',
    color: '#f97316',
    isInscrit: false,
    documents: [
      { id: 'd7', titre: 'Guide des insecticides', type: 'pdf', url: '#', duree: '55 pages' },
      { id: 'd8', titre: 'Démonstration pratique', type: 'video', url: '#', duree: '15:20' },
      { id: 'd9', titre: 'Sécurité et protocoles', type: 'pptx', url: '#', duree: '32 slides' },
    ],
  },
  {
    id: '4',
    titre: 'Santé Animale',
    partie: 'Partie 2',
    categorie: 'Santé & Prévention',
    icon: '🏥',
    color: '#92400e',
    isInscrit: false,
    documents: [
      { id: 'd10', titre: 'Manuel vétérinaire', type: 'pdf', url: '#', duree: '70 pages' },
      { id: 'd11', titre: 'Traitement des animaux', type: 'video', url: '#', duree: '21:10' },
      { id: 'd12', titre: 'Prévention des maladies', type: 'pptx', url: '#', duree: '40 slides' },
    ],
  },
  {
    id: '5',
    titre: 'Agronomie',
    partie: 'Partie 3',
    categorie: 'Intégration',
    icon: '🌱',
    color: '#eab308',
    isInscrit: false,
    documents: [
      { id: 'd13', titre: 'Principes d\'agronomie', type: 'pdf', url: '#', duree: '52 pages' },
      { id: 'd14', titre: 'Cultures et rotations', type: 'video', url: '#', duree: '17:00' },
      { id: 'd15', titre: 'Gestion des sols', type: 'pptx', url: '#', duree: '38 slides' },
    ],
  },
  {
    id: '6',
    titre: 'Architecture',
    partie: 'Partie 3',
    categorie: 'Intégration',
    icon: '🏛️',
    color: '#78716c',
    isInscrit: false,
    documents: [
      { id: 'd16', titre: 'Plans et conception', type: 'pdf', url: '#', duree: '48 pages' },
      { id: 'd17', titre: 'Constructions durables', type: 'video', url: '#', duree: '19:30' },
      { id: 'd18', titre: 'Normes et standards', type: 'pptx', url: '#', duree: '42 slides' },
    ],
  },
  {
    id: '7',
    titre: 'Santé Animale Participative',
    partie: 'Partie 3',
    categorie: 'Intégration',
    icon: '👥',
    color: '#14b8a6',
    isInscrit: false,
    documents: [
      { id: 'd19', titre: 'Approches communautaires', type: 'pdf', url: '#', duree: '44 pages' },
      { id: 'd20', titre: 'Travail en groupe', type: 'video', url: '#', duree: '14:45' },
      { id: 'd21', titre: 'Mobilisation locale', type: 'pptx', url: '#', duree: '30 slides' },
    ],
  },
];

export const FormationService = {
  getAllFormations: (): Formation[] => formations,

  inscrire: (formationId: string): void => {
    const formation = formations.find(f => f.id === formationId);
    if (formation) {
      formation.isInscrit = true;
    }
  },

  desinscrire: (formationId: string): void => {
    const formation = formations.find(f => f.id === formationId);
    if (formation) {
      formation.isInscrit = false;
    }
  },

  getInscriptions: (): Formation[] => {
    return formations.filter(f => f.isInscrit);
  },
};
