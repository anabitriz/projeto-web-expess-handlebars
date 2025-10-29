//configuraçao do hadlebars
const express = require('express');
const exphbs = require ('express-handlebars');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded ({ extended: true}));

app.enginw('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view wngine', 'handlebars');


let pessoas = [
    { id: 1, nome: 'pessoa1'},
    { id: 2, nome: 'pessoa2'},
     { id: 3, nome: 'pessoa3'}
];


app.listen(port,()=> {

    console.log(`servidor executando..: http://localhost:${port}`)
});