# NsPortal




## Features


## Installation


### Requirements

 - [Node.js](https://nodejs.org/) (for [npm](https://www.npmjs.com/))
 - [bower](http://bower.io/) `npm install -g bower` (restart console after install, if it's not working add the path in environment variables by hand)
 - [python3.4](https://www.python.org/download/releases/3.4.0/) (for Windows you can install [miniconda3.4](http://conda.pydata.org/miniconda.html))


*Verify that node is in your PATH*

### Installation Process

#### Front
- `npm install`
- `bower install`
- `npm install grunt`
- `npm install -g grunt-cli`

optional but recommended :

- `grunt build` (each time you modify config.js)

#### Back

Install those packages with `pip` or `conda` :

- pyodbc (for SQL Server database) or psycopg2 (for PostrgreSQL database)
- [sqlalchemy](http://www.sqlalchemy.org/)
- pyjwt

#####Config File

Run the setup install : 
- `python setup.py install`


## Technolgies && Usage

### Front

> npm
> bower

* Grunt :
 `grunt build` build the code : 
  1. compile less files to app/styles/main.css (+ map file in dev mode)
  2. build html files with JST (app/build/templates.js)
  3. build js files : requirejs optimisation, minify and uglify (app/buil/prod.js)

- `grunt release` : launch `grunt build` then change entry file in the index for production mode (prod.js)

- `grunt dev` : launch `grunt build` then change entry file in the index for development mode

 RequireJS
 Backbone Underscore
 MarionetteJs

- Rename the config.js.default to config.js then add your specifications (url of the REST server)
- If you setted a reverse proxy, don't forget to include "/portal-core/" in your URL-Rewrite part (example: http://127.0.0.1:6544/portal-core/{R:1})
- Don't forget to remove "bin" folders from hidden segments on IIS (Filtering demands -> Hidden sengments)

### Back

 >[Pyramid](http://docs.pylonsproject.org/projects/pyramid/en/latest/)
 >[SQLAlchemy](http://www.sqlalchemy.org/)


You have to configure the [development.ini](https://github.com/NaturalSolutions/NsPortal/tree/master/Back/development.ini.default) which can be found in the [Back folder](https://github.com/NaturalSolutions/NsPortal/tree/master/Back/).
You have to enter the siteName parameter which the site name of the local site (### Site name).

### New Feature (Multi server)
Server configuration example : track.int, ecology.track.int, breeding.track.int  
Install the portal on the top domain server : track.int  
Then, in the development.ini file, uncomment the "parent_domain" parameter and fill it in with the address of the top domain server: track.int.  
The application will generate a cookie available for the domain .track.int. The other servers (ecology.track.int & breeding.track.int) will now access the cookie and you will be authenticated on their application.  
    
If the parent_domain variable remains commented, you will only be authenticated on the current domain. (single server architecture as before).

Run `pserve development.ini` command in order to launch a Pyramid server.

If pserve fails because it doesn't find the development.ini file, try a `python setup.py develop` to avoid targeting the wrong egg.

If you want to avoid Numpy errors fired when launching the server, make sure you have no lib referencing it then restart the whole installation thing. 

#### Database configuaration

## Quality && Test

### Style Guide

### Test

## Workflow && Contribution

Natural Solutions (NS) is based upon the collaborative development process of Git/GitHub.

![gitWorkflow](http://img11.hostingpics.net/pics/424731gitflow.png)

If you want to contribute on this project, please create a new pull request :
1. Fork the repository into your own GitHub repository in order to work on this one,
2. Then create a new branch first,
3. Finally, send a pull request to the [main repository](https://github.com/NaturalSolutions/NsPortal/) when the task is ready for review.
4. When the pull request received at least one validation comment from an owner member of the repository, it will be merge to this one.

Thank you!


## Demo


## Commercial Support

We have programs for companies that require additional level of assistance through training or commercial support, need special licensing or want additional levels of capabilities. Please visit the [Natural Solutions](http://www.natural-solutions.eu/) Website for more information about the portal or contact us by email at contact@natural-solutions.com.

## Tutoriel

### Créer un nouveau thème

1. Se rendre dans l'application sécurité depuis le portail

2. Lors du choix du thème pour l'instance, si le thème n'a jamais été créé, alors l'écrire dans le champ text à côté de la sélection de thème.

3. Une fois le thème créé et associé à l’instance, se rendre dans dossier du projet NsPortal, trouver le fichier Front/app/base/home/lyt-tile.js et rajouter la case qui correspond à votre thème créé précédemment. Exemple si le thème se prénomme « CentralMonitoring » alors :
```js
case 'CentralMonitoring':
 this.model.set({'icon' : 'reneco-CentralMonitoring'});
break;
```
Ceci a pour but de définir l’icône créée au préalable dans la rénéco-font

4. Se rendre dans le fichier  Front/app/styles/ui/_tile.less et ajouter une class avec une variable, ceci représente la couleur de fond qu’aura l’icône, dans notre exemple :
```css
.CentralMonitoring{
 background : @CentralMonitoring;
}
```
5. Pour finir, créer la variable et lui associer une couleur dans le fichier Front/app/styles/_theme.less toujours dans notre exemple :
```css
@CentralMonitoring : #4B6099;
```

6. Se diriger à la racine du front du projet, c'est à dire dans le dossier Front et exécuter la commande
```cmd
grunt release
```
Cette commande permet de mettre à jour le dossier "build" donc le dossier de prod, celui qui sera lu par le navigateur web

7. Vous voilà avec un nouveau thème de créé et vous n'avez pas perdu 1 journée à chercher quelqu'un qui saurait le faire :)

## License

Copyright (c) 2015 Natural Solutions
Licensed under the MIT license.
