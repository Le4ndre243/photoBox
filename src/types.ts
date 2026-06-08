export interface PhotoLinks {
  categorie?: { href: string } | string;
  comments?: { href: string } | string;
  commentaires?: { href: string } | string;
  self?: { href: string } | string;
  [key: string]: { href: string } | string | object | undefined;
}

export interface Photo {
  id: number;
  titre: string;
  type?: string;
  url?: string;           
  thumbnail?: string;     
  date?: string;
  descr?: string;
  description?: string;
  links: PhotoLinks;
}

export interface Categorie {
  id: number;
  libelle: string;
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
    next?: { href: string } | string;
    prev?: { href: string } | string;
    first?: { href: string } | string;
    last?: { href: string } | string;
  };
}