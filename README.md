# allocine_project

## Format des données

Titres et types des données
    [
        TMDBId: Number,
        title: String,
        date: String,
        poster: String,
        description: String,
        rating: Number,
    ]


## POST

les objets a ajouter/modifier sont à gérer dans le corps de la requête

- Modifier un film 
    "/api/users/lists/movies/update"

- Ajout
    "/api/users/lists/movies/add"

- Authentication
    "/api/users/login"

## GET

les termes de recherche (&lt;recherche>) sont à passer dans l'URL

- Recherche par nom
    "/api/movies/search_by_name?&lt;recherche>"

- Recherche par critère
    "/api/films/search_by_criterias?&lt;recherche>"