import Handlebars from 'handlebars';
import { Photo } from './types';

export function display_galerie(photos: Photo[]): void {
  const templateEl = document.querySelector('#galerie-template');
  if (!templateEl) throw new Error('Template #galerie-template introuvable');
  const template = Handlebars.compile(templateEl.innerHTML);
  const container = document.querySelector('#la_galerie');
  if (!container) return;
  container.innerHTML = template({ photos });
}