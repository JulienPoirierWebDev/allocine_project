const express = require("express")
const app = express()

app.get("/test", (request, response)=>{
    response.end("c'est un test")
})

app.listen(3000, (error)=>{
    if(error){
        console.log("erreur")
    }else{
        console.log("tout va bien !")
    }
    
    
})
