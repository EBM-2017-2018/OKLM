EBM Boilerplate
===============

[![Build Status](https://travis-ci.org/EBM-2017-2018/EBM-boilerplate.svg?branch=master)](https://travis-ci.org/EBM-2017-2018/EBM-boilerplate)
[![Maintainability](https://api.codeclimate.com/v1/badges/7b5e67d7a1c25ebd47d0/maintainability)](https://codeclimate.com/github/EBM-2017-2018/EBM-boilerplate/maintainability)

**Frontend :**

[![codecov](https://codecov.io/gh/EBM-2017-2018/EBM-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/EBM-2017-2018/EBM-boilerplate)

Ce dépôt fournit les éléments de base pour les projets du fil rouge.

Il comprend :
- un backend en NodeJS et Express
- un frontend en React
- des tests automatiques grâce à Travis

## Mode d'emploi

1. `git clone https://github.com/EBM-2017-2018/EBM-boilerplate.git`
2. Créer un dépôt pour votre projet à l'adresse https://github.com/organizations/EBM-2017-2018/repositories/new
3. Récupérer l'URL du projet, accessible depuis le bouton "Clone or download"
4. `git remote add upstream https://github.com/EBM-2017-2018/EBM-boilerplate.git`
5. `git remote set-url origin <adresse de votre dépôt récupérée à l'étape 3>` (exemple : `git remote set-url origin https://github.com/EBM-2017-2018/OKLM.git`)
6. Aller sur https://travis-ci.org/, se connecter avec son compte Github, et dans l'organisation EBM-2017-2018, activer Travis pour votre projet Github.
7. Générer un token Github pour l'APIDoc : Aller ici : https://github.com/settings/tokens, cliquer sur "Generate new token" et cocher le bloc "repo". Choisissez un nom pour le token et cliquez sur "Generate token". Copiez en le token qui s'affiche.
8. Retourner sur https://travis-ci.org/, dans la liste à gauche, le projet devrait apparaître. Cliquer dessus pour l'ouvrir et dans le menu "More Options" à droite, aller sur Settings. Dans la page qui s'affiche, dans la section "Environment Variables", ajouter une nouvelle ligne avec comme nom `GITHUB_TOKEN` et comme valeur le token précédemment généré, en laissant le booléen à Off.
9. Demander à Clément de rajouter les variables d'environnement `DOCKER_USERNAME` et `DOCKER_PASSWORD`
10. Modifier le fichier `docker-compose.yml` en suivant le guide ci-dessous.

N'hésitez pas à nous demander de l'aide ! Bonne chance :)

## Déploiement Continu

Des outils de déploiement continu ont été mis en place sur ce projet d'example pour que vous puissiez mettre votre application à disposition des autres groupes sur le serveur FilRouge EBM. Cette configuration utilise Docker et Docker-Compose (TODO: ajouter un lien de présentation rapide), et se déroule selon les étapes suivantes :

1. Lors d'un push sur une branche de votre dépôt Github ou de la création d'une pull request, Travis récupère les sources mises à jour.
2. Travis installe les dépendances, vérifie que votre code est propre, lance les tests et s'assurent qu'ils passent avant de compiler le projet.
3. Si la modification concerne la branche master, il publie l'image Docker sur http://hub.docker.com. Et envoie un signal au serveur de production.
4. Lorsqu'il reçoit la notification, le serveur fil rouge récupère la version mise à jour de votre fichier `docker-compose.yml`, met à jour l'image de votre projet, télécharge les dépendances et lance le tout. Il rend votre projet accessible sur un sous-domaine de https://ebm.nymous.io et génère au passage un certificat HTTPS pour ce domaine (swaaaag).

Alors, comment on configure tout ça ?

### Qu'est-ce que Docker ?

Si tu t'en fiches, skip jusqu'à la prochaine section.

L'objectif de docker est de compacter l'ensemble de votre projet et de ses dépendances dans une image, ainsi que l'exécutable NodeJS qui va permettre de l'exécuter. Cette image peut alors être facilement dupliquée et déplacée vers un serveur de production. On peut ensuite instancier un container à partir de cette image : ce container représentera alors une instance de NodeJS exécutant les sources de votre projet.

On peut comparer une image Docker à une classe Java, le container étant alors un objet, c'est-à-dire une instance de cette classe (image). On peut notamment instancier plusieurs containers à partir d'une même image.

Une image Docker est construite à partir d'un fichier Dockerfile, qui fait référence à une image de base (par exemple, une Debian (Linux) avec NodeJS installé), et définit un certain nombre d'étapes à réaliser pour construire l'image finale. Par exemple, dans ce projet d'exemple :

```
FROM node:alpine # On part de l'image node:alpine, qui contient NodeJS installé sur une image Linux de type Alpine (plus léger que Debian)

WORKDIR /app # On se place dans le dossier de notre application

COPY ./backend/package.json ./backend/package-lock.json /app/ # On copie les fichiers package.json et package-lock.json pour installer les dépendances

RUN npm i --production # On installe les dépendances de notre projet (uniquement celles nécessaires pour l'environnement de production)

COPY ./backend /app # On copie les sources du projet backend
COPY ./frontend/build /app/public # On copie le dossier contenant le projet frontend compilé

EXPOSE 4000 # On indique que notre serveur web sera disponible sur le port 4000

ENTRYPOINT npm run prod # On définit le processus qui sera lancé à l'instanciation de notre container.
```

Un container Docker ne peut néanmoins contenir qu'un seul processus (à la différence d'une machine virtuelle, qui est centrée autour d'un système d'exploitation, un container est centré sur un processus). On ne peut donc pas avoir dans un même container un serveur web NodeJS et une base de données MongoDB. Dans ce cas, il faut utiliser plusieurs containers et les lier les uns avec les autres pour qu'ils puissent communiquer.

C'est ici qu'intervient Docker-Compose. 

### Docker-Compose

Docker-Compose permet de démarrer automatiquement plusieurs containers, et paramétrer leurs interfaces réseaux pour leur permettre de communiquer entre eux.

Le bloc `services` décrit les différents containers dont notre projet a besoin. Voici comment l'adapter à votre projet :

1. Image Docker

Il y aura obligatoirement un premier service appelé `web` qui définit le container NodeJS correspondant au serveur web NodeJS. On commence par indiquer à partir de quelle image est instanciée le container (`image: ebm1718travis/ebm-boilerplate:latest`) : il faut donc remplacer ebm-boilerplate sur cette ligne par le nom de votre projet sur Github.

**Attention :** il est indispensable que le nom corresponde bien à celui sur Github, en minuscules (celui qui est écrit derrière EBM-2017-2018 sur la page de votre dépôt). C'est le nom utilisé par Travis pour publier votre image, et le déploiement ne fonctionnera pas si les noms ne correspondent pas.

2. Variables d'environnement

On définit ensuite les variables d'environnement qui doivent être mises en place au lancement du container, par exemple l'URI à laquelle est disponible MongoDB. Reportez-vous à celle déjà indiquée dans le fichier `docker-compose.yml` pour en rajouter si besoin, et pensez à modifier l'URI de MongoDB pour remplacer `ebm-boilerplate` par le nom de votre collection.

3. Interfaces réseaux

On définit ensuite les interfaces réseaux auxquelles est rattaché le container. Il y a a priori deux interfaces réseaux possibles.

L'interface ebm-filrouge permet aux différents projets fil rouge de communiquer entre eux, il ne faut donc y rattacher que les containers qui ont besoin d'être rendus accessibles aux autres groupes. Ce devrait être uniquement le cas, sauf cas particulier, de votre serveur web NodeJS. Pour cette interface réseau, il faut définir un alias qui correspondra à l'URL à laquelle les autres projets contacteront votre service. Par exemple ici : l'alias `ebm-boilerplate` défini dans le bloc `aliases` rend le service web accessible à l'URL `http://ebm-boilerplate/api/whatever`. Remplacez donc `ebm-boilerplate` par celui de votre projet.

L'interface `local` sert à relier les différents containers que vous utilisez pour votre projet, par exemple le serveur web NodeJS et une base de données mongodb. Inutile d'indiquer un alias pour cette interface, le nom du service servira directement de nom de domaine : par exemple, le service `mongodb` sera accessible depuis le service `web` à l'adresse `mongodb://mongodb/`.

4. Définition de services supplémentaires

Vous pouvez ensuite déclarer d'autres services, comme une base de données MongoDB. 

**À noter :** la structure qui a été mise en place ne vous empêche a priori pas d'utiliser la base de données de votre choix (MongoDB, MySQL, MariaDB, RethinkDB, Neo4J, ...).

Pour ce faire, indiquez simplement le nom de l'image à utiliser (`mongo` pour mongodb), et rattachez le service à l'interface réseau `local` de la même manière que pour le service `web`.
Pensez également à rajouter le nom du service dans la liste `depends_on` du service `web`, ce qui permettra à Docker-Compose de démarrer les containers dans le bon ordre.

Si vous utilisez MongoDB, il suffit simplement de décommenter le bloc correspondant dans l'exemple pour mettre en place tout ça. 

### TL;DR - Exemple

Si on reprend le fichier docker-compose.yml en l'adaptant à un projet spécifique, par exemple OKLM, on aura la configuration suivante :

```
version: "3"
services:
  web:
    image: ebm1718travis/oklm:latest
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb/oklm
    networks:
      local:
      ebm-filrouge:
        aliases:
          - oklm
  mongodb:
    image: mongo
    networks:
      - local
networks:
  local:
  ebm-filrouge:
    external: true 
```

Une fois que tout ça est fait, mets tout ça sur master sans trop réfléchir, et prie un bon coup (il parait que ça aide). Plus concrètement, il faut attendre que le build de la branche master soit fait sur Travis (compter environ 5 minutes). Comptez ensuite quelques minutes supplémentaires pour que votre projet soit déployé sur le serveur fil rouge. Une fois que c'est fait, si tout a marché, vous devriez pouvoir voir votre travail sur [https://[LâcheIciLeNomDeTonProjetGithub].ebm.nymous.io](https://[LâcheIciLeNomDeTonProjetGithub].ebm.nymous.io) (exemple : https://ebm-boilerplate.ebm.nymous.io`).

Si ce n'est pas le cas, et qu'au bout de longues minutes d'attente il ne se passe toujours rien, appelle-nous. On pleurera avec toi.

**A noter :** le déploiement s'effectue AUTOMATIQUEMENT (eh ouais !) à chaque push ou fusion de pull request sur la branche master.

Maxime Catrice
William Joncquel
Thomas GAUDIN
