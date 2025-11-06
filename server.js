//configuraçao do hadlebars
const express = require('express');
const exphbs = require ('express-handlebars');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded ({ extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');


let pessoas = [
    { id: 1, nome: 'pessoa1'},
    { id: 2, nome: 'pessoa2'},
    { id: 3, nome: 'pessoa3'}
];

app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/pessoas', (req,res)=>{
    res.render('listarPessoas', { pessoas});
});


app.get('/pessoas/nova', (req,res)=>{
    res.render('cadastrarPessoas');
});

app.post('/pessoas', (req,res)=>{
    const nome = req.body.nome;
    const novaPessoa = {
        id: pessoas.length +1,
        nome: nome

    };
    pessoas.push(novaPessoa)
 res.render('listarPessoas', { pessoas});
});

app.get('/pessoas/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p =>p.id === id);

    if (pessoa){
        res.render('detalharPessoa', {pessoa});
    }else{
        res.status(404).send('pessoa ñ encontada')
    }
});

app.get('/pessoas/:id/editar', (req,res)=>{
    const id = parseInt (req.params.id);
    const pessoa= pessoas.find(p=> p.id === id);

if (pessoa){
        res.render ('editarPessoa', { pessoa });
    }else{
        res.status(404).send('pessoa ñ encontada')
    }
});

app.post('/pessoas/:id', (req,res)=>{
    const id = parseInt (req.params.id);

    const pessoa= pessoas.find(p=> p.id === id);

if (pessoa){
        pessoa.nome = req.body.nome;
        res.render ('listarPessoas', { pessoas });
}else{
        res.status(404).send('pessoa ñ encontada')
}

});


app.post('/pessoas/:id/excluir', (req,res)=>{
    const id = parseInt (req.params.id);
    const index = pessoas.findIndex(p=> p.id === id);

    if (index !== -1){

        pessoas.splice(index,1);
        res.render('listarPessoas', { pessoas });
    }else{
        return res.status(404).send (' pessoa n encontada');
    }

});

app.listen(port,()=> {

    console.log(`servidor executando..: http://localhost:${port}`)
});