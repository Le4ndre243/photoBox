// Module gallery_ui : affichage d'une galerie de photos
import Handlebars from 'handlebars';
import { Photo } from './src/types';

/**
 * Affiche une galerie de photos sous forme de vignettes dans #la_galerie
 * L'attribut data-photoId est positionné sur chaque vignette
 */
export function display_galerie(photos: Photo[]): void {
  const templateEl = document.querySelector('#galerie-template');
  if (!templateEl) throw new Error('Template #galerie-template introuvable');

  const template = Handlebars.compile(templateEl.innerHTML);
  const container = document.querySelector('#la_galerie');
  if (!container) return;

  container.innerHTML = template({ photos });
}
