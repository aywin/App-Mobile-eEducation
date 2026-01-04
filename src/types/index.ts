export interface User {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password: string;
}

export interface Document {
  id: string;
  titre: string;
  type: 'pdf' | 'video' | 'pptx';
  url: string;
  duree?: string;
}

export interface Formation {
  id: string;
  titre: string;
  partie: string;
  categorie: string;
  icon: string;
  color: string;
  isInscrit?: boolean;
  documents?: Document[];
}

export interface AuthContextType {
  currentUser: User | null;
  register: (user: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}
