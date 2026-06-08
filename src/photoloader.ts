import { API_BASE_URL } from './config';
import { Photo, Categorie, Commentaire, PhotoCollection } from './types';

const BASE = 'https://webetu.iutnc.univ-lorraine.fr';

const FETCH_OPTIONS: RequestInit = { credentials: 'include' };

function toAbsoluteUrl(link: any): string | null {
  let href: string | null = null;
  if (typeof link === 'string') href = link;
  else if (link?.href) href = link.href;
  if (!href) return null;
  if (href.startsWith('http')) return href;
  return `${BASE}${href}`;
}

export function loadResource<T>(uri: string): Promise<T> {
  return fetch(uri, FETCH_OPTIONS)
    .then(r => {
      if (!r.ok) return Promise.reject(new Error(`HTTP ${r.status}: ${r.statusText}`));
      return r.json();
    });
}

export function loadPicture(id: number): Promise<Photo> {
  const url = `${API_BASE_URL}/photos/${id}`;
  return fetch(url, FETCH_OPTIONS)
    .then(r => {
      if (!r.ok) return Promise.reject(new Error(`HTTP ${r.status}: ${r.statusText}`));
      return r.json();
    })
    .then(data => {
      const raw = data.photo;
      const photo: Photo = {
        id: raw.id,
        titre: raw.titre,
        type: raw.type,
        description: raw.descr,
        url: toAbsoluteUrl(raw.url) ?? '',
        links: data.links ?? {}
      };
      return photo;
    });
}

export function loadPhotos(uri?: string): Promise<PhotoCollection> {
  const url = uri ?? `${API_BASE_URL}/photos`;
  return fetch(url, FETCH_OPTIONS)
    .then(r => {
      if (!r.ok) return Promise.reject(new Error(`HTTP ${r.status}: ${r.statusText}`));
      return r.json();
    })
    .then(data => {
      // Normaliser les photos : { photo: {...}, links: {...} } → Photo
      const photos: Photo[] = (data.photos ?? []).map((item: any) => ({
        id: item.photo.id,
        titre: item.photo.titre,
        url: toAbsoluteUrl(item.photo.original) ?? '',
        thumbnail: toAbsoluteUrl(item.photo.thumbnail) ?? '',
        links: item.links ?? {}
      }));

      return {
        data: photos,
        links: data.links ?? {}
      } as PhotoCollection;
    });
}

export function loadCategorie(photo: Photo): Promise<Categorie> {
  const uri = toAbsoluteUrl(photo.links?.categorie);
  if (!uri) return Promise.reject(new Error('Pas de lien catégorie'));
  return loadResource<any>(uri).then(data => {
    const cat = data.categorie ?? data;
    return { id: cat.id, libelle: cat.nom } as Categorie;  
  });
}

export function loadCommentaires(photo: Photo): Promise<Commentaire[]> {
  const uri = toAbsoluteUrl(photo.links?.comments ?? photo.links?.commentaires);
  if (!uri) return Promise.reject(new Error('Pas de lien commentaires'));
  return loadResource<any>(uri).then(data => {
    const list: any[] = data.comments ?? data.data ?? data ?? [];
    return list.map(c => ({
      id: c.id,
      auteur: c.pseudo,     
      contenu: c.content,    
      date: c.date
    })) as Commentaire[];
  });
}