# Photobox — TD7 : fetch et promesses

Projet réalisé dans le cadre du TD n°7 de programmation web en JavaScript (BUT Info S4 — IUT Nancy Charlemagne).

## Membres du groupe

- AIMÉ--CABOCEL Léandre
- FAVINI-LENHOF Maël

---

## Description

Application web de galerie photo qui consomme l'API REST Photobox hébergée sur webetu.  
Elle permet d'afficher des photos individuelles avec leurs métadonnées, de naviguer dans une galerie paginée et d'afficher le détail d'une photo au clic.

---

## Fonctionnalités réalisées

### Exercice 1 — Affichage d'une photo
- Chargement des données d'une photo via son identifiant (`loadPicture`)
- Affichage de l'image, du titre, de la description et du type MIME dans la page via un template Handlebars
- Lecture de l'identifiant depuis le hash de l'URL (`index.html#106`)
- Chargement et affichage de la **catégorie** de la photo (`loadCategorie`)
- Chargement et affichage des **commentaires** associés (`loadCommentaires`)

### Exercice 2 — Galerie de photos
- Chargement de la liste de photos depuis l'API (`loadPhotos`)
- Affichage sous forme de vignettes en grille responsive via un template Handlebars (`display_galerie`)
- Bouton **load** pour déclencher le chargement initial de la galerie

### Exercice 3 — Navigation dans la galerie
- Navigation entre les pages via les boutons **first**, **prev**, **next**, **last**
- Les boutons sont activés/désactivés dynamiquement selon les liens de pagination retournés par l'API
- État de la galerie et des liens de navigation stocké dans le module `gallery`

### Exercice 4 — Affichage d'une photo depuis la galerie
- Clic sur une vignette → chargement et affichage de la photo en plein format dans la section `#la_photo`
- Défilement automatique vers la section photo après le clic

---

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Compiler le projet
npm run build

# Lancer un serveur local 
npx serve .
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000) dans le navigateur.