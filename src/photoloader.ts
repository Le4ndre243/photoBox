import { API_BASE_URL } from './config';
import { Photo, Categorie, Commentaire, PhotoCollection } from './types';

const FETCH_OPTIONS: RequestInit = {
  credentials: 'include'
};

export function loadResource<T>(uri: string): Promise<T> {
  return fetch(uri, FETCH_OPTIONS)
    .then((r: Response): Promise<T> => {
      if (!r.ok) return Promise.reject(new Error(`HTTP ${r.status}: ${r.statusText}`));
      return r.json() as Promise<T>;
    })
    .catch((err: unknown): Promise<T> => {
      if (err instanceof Error) {
        console.error('Erreur loadResource:', err.message);
      }
      return Promise.reject(err);
    });
}

export function loadPicture(idPicture: number): Promise<Photo> {
  const url = `${API_BASE_URL}/photos/${idPicture}`;
  return fetch(url, FETCH_OPTIONS)
    .then((r: Response): Promise<Photo> => {
      if (!r.ok) return Promise.reject(new Error(`HTTP ${r.status}: ${r.statusText}`));
      return r.json() as Promise<Photo>;
    })
    .catch((err: unknown): Promise<Photo> => {
      if (err instanceof Error) {
        console.error('Erreur loadPicture:', err.message);
      }
      return Promise.reject(err);
    });
}

export function loadPhotos(uri?: string): Promise<PhotoCollection> {
  const url = uri ?? `${API_BASE_URL}/photos`;
  return loadResource<PhotoCollection>(url);
}

export function loadCategorie(photo: Photo): Promise<Categorie> {
  const uri = photo.links?.categorie;
  if (!uri) return Promise.reject(new Error('Pas de lien catégorie pour cette photo'));
  return loadResource<Categorie>(uri);
}

export function loadCommentaires(photo: Photo): Promise<Commentaire[]> {
  const uri = photo.links?.commentaires;
  if (!uri) return Promise.reject(new Error('Pas de lien commentaires pour cette photo'));
  return loadResource<Commentaire[] | { data: Commentaire[] }>(uri).then((result) => {
    // L'API peut retourner un tableau direct ou un objet avec data
    if (Array.isArray(result)) return result;
    if (result && typeof result === 'object' && 'data' in result) return result.data;
    return [];
  });
}
