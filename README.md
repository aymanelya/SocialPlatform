![logo](https://i.imgur.com/4zZtAVU.png)

# SocialPlatform

Ce projet a été réalisé avec **Angular 9** et **Dotnet-Core 3.1**  
La partie serveur Dotnet-Core est [ICI](https://github.com/anascheriet/DotNetAPI)

## Modules ajoutés

`npm install bootstrap` - Module responsable de l'integration du bootstrap dans le projet  
`npm install font-awesome` - Module responsable de l'affichage de quelques icones  
`npm install alertifyjs` - Module responsable des pop-up alerts (notifications)  
`npm install @auth0/angular-jwt` - Module responsable de decodage du JsonWebToken  
`ng add @ng-bootstrap/ng-bootstrap` - Module pour remplacer le bootstrapjs parce qu'on veut pas utiliser le jquery  
`npm install bootswatch` - Module responsable de changement de theme du bootstrap  
`npm install ng2-file-upload --save` - Module responsable de la gestion du file upload

## Fonctionnalités

- Visiteur
  - Créer un compte
  - Se connecter
- Etudiant
  - Rejoindre des classes avec un code d'invitation
  - Quitter des classes
  - Gerer ses propres publications (**Ajouter**, **Modifier**, **Supprimer**, **Ajouter fichiers**, **Supprimer fichiers**)
  - Gerer ses propres commentaires (**Ajouter**, **Modifier**, **Supprimer**)
- Prof

  - Gerer des classes (**Ajouter**, **Supprimer**, **Voir code d'invitation**, **Rejoindre avec un code d'invitation**)
  - Gerer des membres (**Accepter invitation**, **Refuser invitation**, **Retirer un membre**)
  - Gerer toutes les publications (**Ajouter**, **Modifier**, **Supprimer**, **Ajouter fichiers**, **Supprimer fichiers**)
  - Gerer tous les commentaires (**Ajouter**, **Modifier**, **Supprimer**)
  - Gerer les utilisateurs (**Modifier**, **Supprimer**)

## Fonctionnalités a ajouter

- Ajouter nouveau rôle **Admin** pour la gestion des utilisateurs
- Ajouter fonction recherche Utilisateurs et Classes

## Demarrage du serveur

`dotnet run` pour demarrer le serveur de l'API  
`ng serve` pour demarrer un serveur de developpement . Accedez au lien `http://localhost:4200/`.

## Video demo

[![Video Demo](https://i.imgur.com/C6u1o1b.png)](https://youtu.be/bQZx28VRYmU)
