export interface PhotoLinks {
  categorie?: string;
  commentaires?: string;
  self?: string;
  [key: string]: string | undefined;
}

export interface Photo {
  id: number;
  titre: string;
  type: string;
  url: string;
  date?: string;
  description?: string;
  links: PhotoLinks;
}

export interface Categorie {
  id: number;
  libelle: string;
  links?: Record<string, string>;
}

export interface Commentaire {
  id: number;
  auteur: string;
  contenu: string;
  date?: string;
}

export interface PhotoCollection {
  data: Photo[];
  links: {
    next?: string;
    prev?: string;
    first?: string;
    last?: string;
    self?: string;
  };
  meta?: {
    total?: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
  };
}
