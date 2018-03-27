# Open Knowledge Management
[![Build Status](https://travis-ci.org/EBM-2017-2018/OKLM.svg?branch=master)](https://travis-ci.org/EBM-2017-2018/OKLM)

OKLM est le projet du fil rouge proposant une interface de gestion de documents participative aux utilisateurs.

## Front-End

## Back-End
Le backend utilise node.js avec l'infrastructure Express et la base de données MongoDB (gérée avec mongoose). 
Elle propose une API REST _via_ laquelle le client peut effectuer ses requêtes. 

### ApiDoc
Une documentation de l'utilisation des routes est disponible [à cette adresse](https://ebm-2017-2018.github.io/OKLM/). 

### Ressources
Les routes correspondant à des entités stockées en base de données sont rangées dans un dossier `resources`.

#### Catégories
Une catégorie a un nom, et une catégorie mère optionnelle. Il n'y a pour le moment pas de limite à la "profondeur" possible mais il ne devrait pas être possible pour une catégorie fille d'avoir elle aussi une catégorie fille __(à implémenter)__.
Le dossier `resources/categories` contient les routes pour manipuler les catégories, les fonctions correspondantes et le modèle MongoDB d'une catégorie. Se référer à l'[ApiDoc](#ApiDoc) pour plus d'informations.

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

Le dossier `resources/documents` contient les routes pour manipuler les documents, les fonctions correspondantes et le modèle MongoDB d'un document. Se référer à l'[ApiDoc](#ApiDoc) pour plus d'informations.

#### Utilisateurs
Un utilisateur a un nom, une heure de création et un ID correspondant à son username sur la plateforme _Linkapp_.
Le dossier `resources/users` contient les routes pour manipuler les utilisateurs, les fonctions correspondantes et le modèle MongoDB d'un utilisateur. Se référer à l'[ApiDoc](#ApiDoc) pour plus d'informations.

### Authentification
Le middleware `ebm-auth` est utilisé pour gérer l'authentification des utilisateurs. Celui ci vérifie si un utilisateur de la plateforme est connecté avec _Linkapp_. Il peut également forcer un utilisateur à être connecté pour l'utilisation de certaines routes ; s'il ne l'est pas, l'utilisateur est redirigé vers la page de connexion _Linkapp_, puis une fois identifié, il revient au point où il était. 
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
Se référer à l'[ApiDoc](#ApiDoc) pour plus d'informations.
