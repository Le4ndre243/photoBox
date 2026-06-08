import { loadPhotos } from './photoloader';
import { Photo, PhotoCollection } from './types';

const BASE = 'https://webetu.iutnc.univ-lorraine.fr';

function toAbsoluteUrl(link: any): string | undefined {
  if (!link) return undefined;
  let href: string | null = null;
  if (typeof link === 'string') href = link;
  else if (link?.href) href = link.href;
  if (!href) return undefined;
  if (href.startsWith('http')) return href;
  return `${BASE}${href}`;
}

interface GalleryState {
  photos: Photo[];
  links: {
    next?: any;
    prev?: any;
    first?: any;
    last?: any;
  };
}

let state: GalleryState = { photos: [], links: {} };

export function load(uri?: string): Promise<Photo[]> {
  return loadPhotos(uri).then((collection: PhotoCollection): Photo[] => {
    state.photos = collection.data ?? [];
    state.links = collection.links ?? {};
    return state.photos;
  });
}

export function next(): Promise<Photo[]> {
  const url = toAbsoluteUrl(state.links.next);
  if (!url) return Promise.reject(new Error('Pas de page suivante'));
  return load(url);
}

export function prev(): Promise<Photo[]> {
  const url = toAbsoluteUrl(state.links.prev);
  if (!url) return Promise.reject(new Error('Pas de page précédente'));
  return load(url);
}

export function first(): Promise<Photo[]> {
  const url = toAbsoluteUrl(state.links.first);
  if (!url) return Promise.reject(new Error('Pas de première page'));
  return load(url);
}

export function last(): Promise<Photo[]> {
  const url = toAbsoluteUrl(state.links.last);
  if (!url) return Promise.reject(new Error('Pas de dernière page'));
  return load(url);
}

export function hasNext(): boolean { return !!toAbsoluteUrl(state.links.next); }
export function hasPrev(): boolean { return !!toAbsoluteUrl(state.links.prev); }
export function hasFirst(): boolean { return !!toAbsoluteUrl(state.links.first); }
export function hasLast(): boolean { return !!toAbsoluteUrl(state.links.last); }