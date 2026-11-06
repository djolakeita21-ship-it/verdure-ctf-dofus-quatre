# Verdure CTF

TP BTS SIO 2e année · JavaScript et le DOM · groupes de 2 ou 3

Vous reprenez le site **Verdure** (la jardinerie du TP de 1re année). Le HTML des trois pages est fourni :
votre travail, c’est le **JavaScript**. Chaque fonctionnalité est un **défi** : quand elle marche, un **flag**
apparaît en bas à gauche de la page.

**Ce n’est pas une course** : tous les groupes peuvent capturer les 13 flags, il n’y a ni classement ni bonus
pour le premier. Chaque équipe a ses propres flags (calculés à partir de son nom) : copier ceux d’un autre
groupe ne sert à rien.

Tout ce qu’il faut a été vu en cours : `querySelector`, `textContent`, `classList`, `addEventListener`,
`createElement`, `append`, `remove` et `forEach`.

## Démarrer

1. **Trouvez un nom d’équipe** et faites-le valider par le professeur. Pas de « groupe-1 » : soyez créatifs !
   Il s’écrit en minuscules, sans accent, avec des tirets : `les-cactus-rebelles`, `team-photosynthese`…
2. Un membre de l’équipe dézippe le projet, puis crée sur GitHub un **dépôt vide** nommé
   `verdure-ctf-<nom-d-equipe>` (sans cocher « Add a README »).
3. Depuis le dossier du projet, il envoie les fichiers dans ce dépôt :
   ```
   git init
   git add .
   git commit -m "Départ"
   git branch -M main
   git remote add origin <url du dépôt>
   git push -u origin main
   ```
4. Il ajoute les autres membres et le professeur comme collaborateurs (*Settings → Collaborators*).
   Les autres acceptent l’invitation, puis clonent le dépôt : `git clone <url du dépôt>`.
5. Dans `js/ctf-config.js`, remplacez `a-renseigner` par votre nom d’équipe, écrit exactement comme dans le
   nom du dépôt. **Ne le changez plus ensuite** : vos flags en dépendent.
6. Ouvrez le dossier dans VS Code et lancez le site avec **Live Server**.

## Les fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html`, `plante.html`, `contact.html` | Le HTML des trois pages, fourni. Ne changez pas les `id` |
| `style.css` | Le CSS de Verdure, avec un minimum pour les nouveaux éléments : le reste est à faire |
| `js/plantes.js` | Le tableau `plantes` : les 10 plantes, une plante = un objet. Ne pas modifier |
| `js/commun.js` | Deux outils fournis (`euros()`, `idDansURL()`) et votre code commun à toutes les pages |
| `js/accueil.js` | Votre code pour `index.html` : catalogue, recherche, filtre, panier |
| `js/fiche.js` | Votre code pour `plante.html` |
| `js/contact.js` | Votre code pour `contact.html` |
| `js/ctf-config.js` | Le nom de votre groupe |
| `js/ctf.js` | Le vérificateur des défis. **Ne pas modifier** |
| `maquettes/` | Les maquettes des trois pages |
| `FLAGS.md` | Vos flags, à compléter au fur et à mesure |

## Le contrat d’interface

Le vérificateur cherche des éléments précis. Ceux du HTML fourni sont déjà là ; votre JavaScript doit
créer ou remplir les autres.

| Où | Élément attendu |
| --- | --- |
| Accueil | `#nb-plantes` affiche le nombre de plantes |
| Accueil | chaque carte créée porte `data-plante-id="<id>"` et contient un lien vers `plante.html?id=<id>` |
| Accueil | chaque ligne du panier créée porte `data-ligne-id="<id>"` ; `#compteur-panier` et `#panier-total` sont à jour |
| Toutes les pages | le bouton `#bouton-theme` ajoute ou retire la classe `sombre` sur `body` |
| `plante.html` | `#plante-nom` et `#plante-prix` |
| `contact.html` | `#contact-erreur` pour l’erreur, `#contact-confirmation` pour la confirmation |

## Les défis

Le détail de chaque défi (ce qu’il faut faire, la condition exacte qui déclenche le flag, et comment tester)
est dans `consigne.pdf`. En résumé :

| Défi | Fonctionnalité | Points |
| --- | --- | --- |
| J01 | `#nb-plantes` affiche le nombre de plantes du tableau | 100 |
| J02 | Le catalogue est créé en JS : une carte par plante | 100 |
| J03 | Le bouton `#bouton-theme` bascule le thème sombre | 100 |
| J04 | Chaque carte contient un lien vers sa fiche | 100 |
| J05 | `plante.html?id=…` affiche le nom et le prix de la bonne plante | 200 |
| J06 | Le bouton d’une carte ajoute une ligne au panier ; le compteur suit | 200 |
| J07 | Le total du panier est juste (au moins deux articles) | 200 |
| J08 | La recherche cache les cartes qui ne correspondent pas, à chaque frappe | 200 |
| J09 | Le filtre par difficulté, cumulable avec la recherche | 300 |
| J10 | Le bouton `#vider-panier` vide le panier, le compteur et le total | 300 |
| J11 | Formulaire de contact incomplet : message dans `#contact-erreur`, sans rechargement | 300 |
| J12 | Formulaire complet : confirmation dans `#contact-confirmation`, avec le nom saisi | 300 |
| J13 | Un bouton sur chaque ligne retire cet article du panier | 500 |

Le panier n’est pas enregistré : il se vide quand on recharge la page. C’est normal.

## Travailler avec Git

- Un commit par défi réussi, avec le flag ajouté dans `FLAGS.md` : `git commit -m "J06 : ajout au panier"`.
- Un fichier JS par personne pour éviter les conflits ; faites des `git pull` souvent.
- **Chaque membre doit avoir des commits** à son nom.
