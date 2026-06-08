import { loadPicture, loadCategorie, loadCommentaires } from './photoloader';
import { displayPicture, displayCategorie, displayCommentaires, displayError } from './ui';
import { display_galerie } from './gallery_ui';
import * as gallery from './gallery';
import { Photo } from './types';


function getPicture(id: number): void {
  loadPicture(id)
    .then((photo: Photo): void => {
      console.log('✅ Photo chargée:', photo.titre);
      displayPicture(photo);

      getCategorieForPhoto(photo).then(displayCategorie).catch((err: unknown) => {
        console.warn('⚠️ Catégorie non disponible:', err);
      });

      loadCommentaires(photo).then(displayCommentaires).catch((err: unknown) => {
        console.warn('⚠️ Commentaires non disponibles:', err);
      });
    })
    .catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('❌ Erreur getPicture:', msg);
      if (err instanceof Error) displayError(err.message);
    });
}


function getCategorieForPhoto(photo: Photo) {
  return loadCategorie(photo);
}

const hash = window.location.hash.replace('#', '');
const photoId = hash ? parseInt(hash, 10) : 105;
getPicture(photoId);

const btnLoad = document.querySelector<HTMLButtonElement>('#btn-load');
const btnNext = document.querySelector<HTMLButtonElement>('#btn-next');
const btnPrev = document.querySelector<HTMLButtonElement>('#btn-prev');
const btnFirst = document.querySelector<HTMLButtonElement>('#btn-first');
const btnLast = document.querySelector<HTMLButtonElement>('#btn-last');

if (btnLoad) {
  btnLoad.addEventListener('click', () => {
    gallery.load().then((photos: Photo[]) => {
      display_galerie(photos);
      attachGalerieClickHandlers();
      updateNavButtons();
    }).catch((err: unknown) => {
      if (err instanceof Error) displayError(err.message);
    });
  });
}

if (btnNext) {
  btnNext.addEventListener('click', () => {
    gallery.next().then((photos: Photo[]) => {
      display_galerie(photos);
      attachGalerieClickHandlers();
      updateNavButtons();
    }).catch((err: unknown) => {
      if (err instanceof Error) displayError(err.message);
    });
  });
}

if (btnPrev) {
  btnPrev.addEventListener('click', () => {
    gallery.prev().then((photos: Photo[]) => {
      display_galerie(photos);
      attachGalerieClickHandlers();
      updateNavButtons();
    }).catch((err: unknown) => {
      if (err instanceof Error) displayError(err.message);
    });
  });
}

if (btnFirst) {
  btnFirst.addEventListener('click', () => {
    gallery.first().then((photos: Photo[]) => {
      display_galerie(photos);
      attachGalerieClickHandlers();
      updateNavButtons();
    }).catch((err: unknown) => {
      if (err instanceof Error) displayError(err.message);
    });
  });
}

if (btnLast) {
  btnLast.addEventListener('click', () => {
    gallery.last().then((photos: Photo[]) => {
      display_galerie(photos);
      attachGalerieClickHandlers();
      updateNavButtons();
    }).catch((err: unknown) => {
      if (err instanceof Error) displayError(err.message);
    });
  });
}

function attachGalerieClickHandlers(): void {
  const vignettes = document.querySelectorAll<HTMLElement>('#la_galerie [data-photo-id]');
  vignettes.forEach((el: HTMLElement) => {
    el.addEventListener('click', () => {
      const idStr = el.dataset.photoId;
      if (!idStr) return;
      const id = parseInt(idStr, 10);
      getPicture(id);
      document.querySelector('#la_photo')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function updateNavButtons(): void {
  if (btnNext) btnNext.disabled = !gallery.hasNext();
  if (btnPrev) btnPrev.disabled = !gallery.hasPrev();
  if (btnFirst) btnFirst.disabled = !gallery.hasFirst();
  if (btnLast) btnLast.disabled = !gallery.hasLast();
}