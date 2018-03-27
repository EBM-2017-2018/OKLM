# Open Knowledge Management
[![Build Status](https://travis-ci.org/EBM-2017-2018/OKLM.svg?branch=master)](https://travis-ci.org/EBM-2017-2018/OKLM)

OKLM est le projet du fil rouge proposant une interface de gestion de documents participative aux utilisateurs.

- [Open Knowledge Management](#open-knowledge-management)
  - [Installation](#installation)
  - [Structure du projet](#structure-du-projet)
  - [Front-End](#front-end)
    - [Fonctionnalités](#fonctionnalit%C3%A9s)
    - [Structure du code](#structure-du-code)
      - [Composants principaux](#composants-principaux)
  - [Back-End](#back-end)
    - [ApiDoc](#apidoc)
    - [Ressources](#ressources)
      - [Catégories](#cat%C3%A9gories)
      - [Documents](#documents)
      - [Utilisateurs](#utilisateurs)
    - [Authentification](#authentification)
    - [Recherche](#recherche)
  - [Pistes d'améliorations](#pistes-dam%C3%A9liorations)

## Installation

Prérequis : nodeJS > 9.8, mongodb

1. Cloner le projet
1. Se rendre dans le dossier backend
    1. Copier le fichier `.env.example` en `.env`, et éditer les valeurs en fonction de votre environnement
    1. Installer les dépendances node : `npm i`
    1. Lancer le serveur : `npm start`
    1. L'API est disponible à l'adresse `http://localhost:4000/api`
1. Dans une autre console, se rendre dans le dossier frontend
    1. Installer les dépendances : `npm i`
    1. Lancer le serveur de développement React : `npm start`
    1. Le navigateur s'ouvre automatiquement sur la page

## Structure du projet

Le projet a été découpé en deux dossier, un pour le frontend et un pour le backend.

Les fichiers `Dockerfile` et `docker-compose.yml` définissent comment construire une image Docker combinant le serveur Express et le frontend compilé à partir des sources, et les dépendances de cette image lorsqu'elle tournera sur le serveur (dans notre cas, un conteneur avec mongodb, des réseaux virtuels pour dialoguer avec les autres services, et des bindings sur le disque afin de sauvegarder des données).

Le fichier `.travis.yml` définit la suite d'actions à effectuer pour l'intégration et le déploiement continu. On y retrouve les tests du frontend et du backend, la compilation du frontend, et la construction et l'upload de l'image Docker résultante.

Plus de détails concernant l'intégration et le déploiement continu seront fournis par [Thomas Gaudin](https://github.com/nymous) et [Clément MICHEL](https://github.com/m1ch3lcl) dans une autre documentation.

## Front-End

Le frontend utilise React (grâce à Create-react-app), et interagis avec le backend décrit ci-dessous. Un système de routage frontend a été mis en place grâce à React-router, ce qui permet de conserver des URL ayant un sens. L'interface est construite selon les recommandations Material Design de Google, grâce à la dépendance material-ui-next.

### Fonctionnalités

L'UI de OKLM permet différentes actions selon si l'utilisateur est connecté ou non :
- non connecté :
  - explorer les catégories (avec une profondeur infinie)
  - rechercher des documents et des catégories
  - se connecter (il est alors renvoyé vers Linkapp, et sera redirigé automatiquement)
- connecté :
  - créer une catégorie, à la racine ou comme enfant d'une catégorie
  - téléverser un document
  - afficher ses documents téléversés

### Structure du code

Les composants graphiques sont regroupés dans un dossier `components`.

Un simple fichier `api.js` regroupe toutes les fonctions permettant de faire des requêtes au backend.

#### Composants principaux

- `Content` est le composant de l'application permettant de router entre les différents affichages. Si l'URL est `/explore`, le composant affiché sera `Explore`...
- `Explore`, permet de naviguer entre les catégories, et d'aller vers les détails d'un document. Il est également possible de créer une nouvelle catégorie (fille de la catégorie courante) et de téléverser un nouveau fichier (appartenant à la catégorie courante), si jamais l'utilisateur est connecté.
- `DocumentDetails` affiche les informations sur un document (auteur, date d'envoi), permet de le télécharger, et propose même une prévisualisation si le document est une image, une vidéo ou un PDF.
- `GlobalAppBar` contient la barre de recherche, accessible depuis n'importe quel écran. On y trouve aussi des raccourcis pour téléverser un document, un menu utilisateur (les paramètres n'ont pas encore été implémentés), et un sélecteur d'applications permettant de naviguer entre les applications du fil rouge.
- `UploadForm` permet d'envoyer un nouveau document sur la plateforme. Il n'est accessible que si l'utilisateur est connecté.

## Back-End

Le backend utilise node.js avec l'infrastructure Express et la base de données MongoDB (gérée avec mongoose).

Elle propose une API REST *via* laquelle le client peut effectuer ses requêtes.

### ApiDoc

Une documentation de l'utilisation des routes est disponible [à cette adresse](https://ebm-2017-2018.github.io/OKLM/).

### Ressources

Les routes correspondant à des entités stockées en base de données sont rangées dans un dossier `resources`.

#### Catégories

Une catégorie a un nom, et une catégorie mère optionnelle. Il n'y a pour le moment pas de limite à la "profondeur" possible mais il ne devrait pas être possible pour une catégorie fille d'avoir elle aussi une catégorie fille **(à implémenter)**.

Le dossier `resources/categories` contient les routes pour manipuler les catégories, les fonctions correspondantes et le modèle MongoDB d'une catégorie. Se référer à l'[ApiDoc](#apidoc) pour plus d'informations.

#### Documents

Le document a le modèle plus complexe des 3 ressources implémentées pour le moment. Un document, pour le moment, peut être soit un lien vers un site extérieur, soit un fichier stocké en local et téléchargeable. Il a, dans la base de données :
- Un `title`
- Une `uri`, qui est soit un lien extérieur soit le lien de téléchargement du fichier téléversé si le document comprend un fichier
- Un booléen `isLocalFile` donnant l'information sur la nature du document : lien externe ou fichier interne.
- Un `fileName` qui correspond au nom du fichier téléversé par un utilisateur, si le fichier existe.
- Un `localFileName` qui correspond au nom du fichier tel qu'il a été enregistré en local, si le fichier existe. Cela permet de ne pas retrouver les fichiers depuis l'espace de stockage.
- Une `motherCategory`, chaque document devant appartenir à une catégorie.
- Un timestamp mongoDB `creationTime` généré automatiquement à la création du document.
- Un `author` : en effet, un document ne peut être créé que par un utilisateur enregistré.

Le dossier `resources/documents` contient les routes pour manipuler les documents, les fonctions correspondantes et le modèle MongoDB d'un document. Se référer à l'[ApiDoc](#apidoc) pour plus d'informations.

#### Utilisateurs

Un utilisateur a un nom, une heure de création et un ID correspondant à son username sur la plateforme *Linkapp*.

Le dossier `resources/users` contient les routes pour manipuler les utilisateurs, les fonctions correspondantes et le modèle MongoDB d'un utilisateur. Se référer à l'[ApiDoc](#apidoc) pour plus d'informations.

### Authentification

Le middleware `ebm-auth` est utilisé pour gérer l'authentification des utilisateurs. Celui ci vérifie si un utilisateur de la plateforme est connecté avec *Linkapp*. Il peut également forcer un utilisateur à être connecté pour l'utilisation de certaines routes ; s'il ne l'est pas, l'utilisateur est redirigé vers la page de connexion *Linkapp*, puis une fois identifié, il revient au point où il était.

Se référer à [la page GitHub d'EBM-auth](https://github.com/EBM-2017-2018/ebm-auth) pour une documentation plus précise.

### Recherche

La recherche est un élément central de notre projet. En effet, l'objectif étant de proposer une base documentaire, il est essentiel que la recherche puisse y être efficace.

Ainsi, nous avons dans un premier temps réalisé une API de recherche des documents et catégories sur la base de donnée MongoDB.

La recherche peut s'effectuer:
- Sur le nom des `categories`
- Sur le nom des `documents`

Plusieurs types de tri sont possibles:
- Par pertinence (`rank`), qui permet de trier les résultats de la recherche en fonction d'un score de recherche par rapport aux mots-clés reçus.
- Par ordre chronologique (`date_asc`)
- Par ordre antichronologique (`date_desc`)

Il est également possible de limiter la recherche uniquement aux documents, ou uniquement aux catégories.
Se référer à l'[ApiDoc](#apidoc) pour plus d'informations.

## Pistes d'améliorations

L'intégration des tags n'a pas pu être réalisée ; il manque une interface de gestion des tags (pour en créer ou supprimer des tags abusifs), la possibilité d'en ajouter sur les documents (avec une autocomplétion pour éviter les doublons).

Il manque une section administration à l'interface, accessible grâce à un compte aux permissions spéciales, et permettant de supprimer des catégories ou des documents.

Afin d'améliorer la recherche, une piste d'amélioration serait de mettre un place une base de donnée dédiée telle que [ElasticSearch](https://www.elastic.co/fr/). Ainsi, nous serions capable de réaliser les recherche non seulement sur les métadonnées des documents, mais également sur le contenu des documents tels que PDF.

Il manque également la gestions des commentaires autour d'un documents. Il faudrait ainsi implément l'ajout des commentaires, mais aussi un système de modération permettant de supprimer les commentaires abusifs.

Un autre aspect essentiel pour un outil de knowledge management est la possibilité de réaliser un versionning des documents, afin de pouvoir suivre les mises à jour qui peuvent être apportés aux documents déjà présents sur notre plate-forme.
