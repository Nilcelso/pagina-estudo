const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://scontent.fudi4-1.fna.fbcdn.net/v/t1.0-9/14522950_1098231773605819_4204133660514978861_n.jpg?_nc_cat=105&_nc_ohc=j4P1be-HbhwAX-AeTE0&_nc_ht=scontent.fudi4-1.fna&oh=8d65a80ee6d64376385cb2221cd7c629&oe=5EBF10AC",
        name: "Nilcelso Sobrinho",
        role: "Bonito",
        description: "Aprendendo a programar e se tornar um programador full-stack, porém no momento é so bonito mesmo.",
        links: [
            {name: "facebook", url: "https://www.facebook.com/nilcelso.sobrinho?ref=bookmarks"},
            {name: "instagran", url: "https://www.instagram.com/n.sobrinho/?hl=pt-br"}
        ]
    }


    return res.render("about", { about: about })
})

server.get("/portfolio", function(req, res){

    return res.render("portfolio", {itens: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video) {
      return video.id==id
    })

    if (!video) {
        return res.send("Video not found!")
    }
    
    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("server is running")
})