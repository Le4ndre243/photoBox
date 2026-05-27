// Module gallery : chargement et pagination des galeries
import { loadPhotos } from './photoloader';
import { Photo, PhotoCollection } from './types';

// État interne de la galerie
interface GalleryState {
  photos: Photo[];
  links: {
    next?: string;
    prev?: string;
    first?: string;
    last?: string;
  };
}

let state: GalleryState = {
  photos: [],
  links: {}
};

/**
 * Charge la liste de photos initiale (ou depuis une URI donnée)
 * Stocke l'état pour la navigation et retourne la galerie
 */
export function load(uri?: string): Promise<Photo[]> {
  return loadPhotos(uri).then((collection: PhotoCollection): Photo[] => {
    // Stocker les données pour la navigation
    state.photos = collection.data ?? [];
    state.links = collection.links ?? {};
    return state.photos;
  });
}

/**
 * Charge la page suivante de la galerie
 */
export function next(): Promise<Photo[]> {
  if (!state.links.next) return Promise.reject(new Error('Pas de page suivante'));
  return load(state.links.next);
}

/**
 * Charge la page précédente de la galerie
 */
export function prev(): Promise<Photo[]> {
  if (!state.links.prev) return Promise.reject(new Error('Pas de page précédente'));
  return load(state.links.prev);
}

/**
 * Charge la première page de la galerie
 */
export function first(): Promise<Photo[]> {
  if (!state.links.first) return Promise.reject(new Error('Pas de première page'));
  return load(state.links.first);
}

/**
 * Charge la dernière page de la galerie
 */
export function last(): Promise<Photo[]> {
  if (!state.links.last) return Promise.reject(new Error('Pas de dernière page'));
  return load(state.links.last);
}

/**
 * Indique si une page suivante existe
 */
export function hasNext(): boolean {
  return !!state.links.next;
}

/**
 * Indique si une page précédente existe
 */
export function hasPrev(): boolean {
  return !!state.links.prev;
}
