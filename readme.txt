PROJET 5 - Construisez un site e-commerce
----------------------------------------------------------------------------------------------------------------------------------------------
Pour tester le projet 5:

        -> Il faut cloner le back-end. Il s'agit d'un dossier représentant l'ensemble du code permettant de traiter l'information et communiquer avec une base de données. 
        Sans ce dossier, l'application n'existerait tout simplement pas. Il est intégralement fourni par OpenClassrooms et c'est avec ce code que nous allons
        devoir travailler pour que l'application prenne vie et soit entièrement dynamique. 
        => C'est le serveur.

            Pour le mettre en place, le repository GitHub doit être cloné => https://github.com/OpenClassrooms-Student-Center/JWDP5.git sur votre poste et
            npm doit être installé en local sur votre machine.
            A partir du dossier back-end que vous avez obtenu, exécutez npm install. Une fois node installé, la commande node server permettra de lancer le serveur.
            Le port par défaut du serveur en localhost est 3000 (Listening on port 3000). 
            "Successfully connected to MongoDB Atlas!" indique que la connexion à la base de donnée a réussi. 
            Le serveur et la base de données sont désormais opérationnels.

        -> Il faut également cloner Orinoco-Front-end. Ce dossier représente le travail demandé durant tout le projet. Il constituera toute la face visible de l'iceberg pour un visiteur. 
        Nous nous concentrerons sur l'aspect visuel, les fonctionnalités qui s'exécuteront côté client et nous enverrons des requêtes au serveur afin de recevoir et d'envoyer des informations
        au back-end. Le dossier se trouve à l'adresse URL => https://github.com/Jonathan-admin/Orinoco-Front-end.git.
        => C'est le client.

        Il est constitué:
            - D'un dossier "fonts" comprenant les différentes polices de l'application
            - D'un dossier "templates" comprenant le code source en HTML
            - D'un dossier "images" comprenant toutes les images du site
            - D'un dossier "styles" comprenant les styles CSS pour l'aspect visuel
            - D'un dossier "scripts" comprenant tous le code JS nécessaire pour le dynamisme de l'application
            - D'un fichier HTML index.html, le point d'entrée de l'application.
            - D'un fichier readme indiquant les actions à effectuer pour tester la partie front-end du site Orinoco.
        
        Le site étant dynamique, il est préférable d'utiliser un serveur web local. 
        Nous ouvrirons VSCode depuis le dossier Orinoco-Front-end. Il faut ensuite ouvrir le fichier index.html avec Live Server.
        Ce module est téléchargeable depuis la rubrique extensions (clic droit puis open with Live Server sur index.html). La page index.html s'ouvrira alors sur votre navigateur en localhost 
        (http://127.0.0.1:5500/Orinoco-Front-end/index.html).
    
    Il reste plus qu'à naviguer sur le site.



