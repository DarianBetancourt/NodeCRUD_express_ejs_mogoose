const express = require('express')
const routes = express.Router()
const Repositorio = require("../models/repository")

////////////////////////Consultar Repositorios////////////////////////////////
routes.get("/", async (req,res) =>{
    console.log("Mis repositorios")
    const repositories = await Repositorio.find().sort({createdAt : 'desc'})
    //res.send({ repositories : repositories })
   res.render("index",{ repositories : repositories })
})

routes.get("/edit/:id", async (req , res) => {
    const repository = await Repositorio.findById(req.params.id);
    res.render("editRepository",{ repository : repository })
})
////////////////////////Add Repository/////////////////////////////////
routes
.route("/add")
    .get((req , res) => {
        res.render("newRepository",{ repository : new Repositorio() }) 
    })
    .post((req,res,next) =>{
        req.repository = new Repositorio()
        next()
    },save_edit("save"))
////////////////////////Rotas pelo ID do Repositorio/////////////////////////
routes
.route("/:id")
    .get( async (req , res) => {//Get repository
        const repository = await Repositorio.findById(req.params.id)
        console.log(`Repositorio Obtido pelo ID: ${req.params.id}`)
        //res.send({ repository : repository })
        res.render("showRepository",{ repository : repository })
    })
    .put( async (req , res , next) => {//Update(funciona pesquisar algun error )
        req.repository = await Repositorio.findById(req.params.id)
        console.log(`Atualizando Repositorio de ID: ${req.params.id}`)
        next()
    },save_edit("edit"))
    .delete(async (req , res) => {//Delete
        await Repositorio.findByIdAndDelete(req.params.id);
        res.redirect(`/api/repositories`)
        //res.send(`Excluindo Repositorio de ID ${req.params.id}`)
    }) 
////////////////////////////////////////////////////////////////////////////
//funcion para insertar repositorio
function save_edit(path) {
    return async (req, res) => {
        let repository          = req.repository
        repository.title        = req.body.title
        repository.description  = req.body.description
        repository.url          = req.body.url
        try { 
            repository = await repository.save();
            //res.status("200").send(`Repositorio: "${repository.title}" Guardado com sucesso`)
            res.redirect(`/api/repositories/${repository.id}`)
        } catch(error){
            console.log(error)
            res.redirect("/")
        }
      }
}



module.exports = routes