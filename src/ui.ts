import * as Handlebars from 'handlebars';
import { Photo, Categorie, Commentaire } from './types';

function getTemplate(id: string): HandlebarsTemplateDelegate {
  const el = document.querySelector(`#${id}`);
  if (!el) throw new Error(`Template #${id} introuvable`);
  return Handlebars.compile(el.innerHTML);
}

export function displayPicture(photo: Photo): void {
  const template = getTemplate('photo-template');
  const container = document.querySelector('#la_photo');
  if (!container) return;
  container.innerHTML = template(photo);
}

export function displayCategorie(categorie: Categorie): void {
  const container = document.querySelector('#la_categorie');
  if (!container) return;
  container.textContent = categorie.libelle ?? String(categorie);
}

export function displayCommentaires(commentaires: Commentaire[]): void {
  const list = document.querySelector('#les_commentaires');
  if (!list) return;
  list.innerHTML = '';
  commentaires.forEach((c: Commentaire) => {
    const li = document.createElement('li');
    li.textContent = `(${c.auteur}) ${c.contenu}`;
    list.appendChild(li);
  });
}

export function displayGalerie(photos: Photo[]): void {
  const template = getTemplate('galerie-template');
  const container = document.querySelector('#la_galerie');
  if (!container) return;
  container.innerHTML = template({ photos });
}

export function displayError(message: string): void {
  const el = document.querySelector('#error-msg');
  if (!el) {
    console.error(message);
    return;
  }
  el.textContent = message;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}
