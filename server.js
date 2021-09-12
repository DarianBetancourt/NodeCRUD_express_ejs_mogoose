const express = require('express');
const app = express();
//const Repositorio = require('./models/repository')//modelo de la bd
const repositoriesRouter = require('./routes/repositories')
const methodOverride = require('method-override')

const port = 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/portofolio',{//conectando a la bd
    useNewUrlParser:true, 
    useUnifiedTopology: true
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'))

app.get('/',(req, res) => {
    res.send("hola mundo")
});

app.use('/api/repositories', repositoriesRouter)

app.listen(port, () => {
    console.log('Rodando o servidor na porta 3000')
});