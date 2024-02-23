const express = require("express")

const app = express()

app.use(express.json())

let movies = [
    {
        id : 1,
        title : "le seigneur des anneaux : la communauté de l'anneau",
    },
    {
        id : 2,
        title : "le seigneur des anneaux : les deux tours"
    },
    {
        id : 3,
        title : "le seigneur des anneaux : le retour du roi"
    },
  
]
 
app.get("/projetcrud", (request, response)=>{
    response.send("hello le monde")
})
app.get("/api/movies", (request, response)=>{
    response.json({ 
        data : movies
    })
})

app.post("/api/movies",(request, response)=> {
    const newMovie = {
        id : Date.now(),
        title : request.body.title
    }
    movies.push(newMovie)
    response.json({
        message : "le film a bien été ajouté", newMovie, error : false
    })
})

app.put("/api/movies/:id", (request, response)=>{
    movies = movies.map((movie)=>{
        if(movie.id === Number(request.params.id)){
            return {
                id : Number(request.params.id),
                title : request.body.title
            }
        }else{
            return movie;
        }
    })
    response.json({
        message : "le titre a bien été modifié",
        error : false,   
    })
})
app.listen(3000, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("tout va bien")
    }
})