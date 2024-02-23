const express = require("express")

const app = express()

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
    }
]

app.get("/projetcrud", (request, response)=>{
    response.send("hello le monde")
})
app.get("/api/movies", (request, response)=>{
    response.json({ 
        data : movies
    })
})
app.listen(3000, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("tout va bien")
    }
})