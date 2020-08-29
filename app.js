const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');

// Database Config
const {Client} = require('pg');
const client = new Client({
    user:'postgres',
    host:'localhost',
    database: 'thoughtsdb',
    password: 'root',
    port: 5432
})
client.connect();

//Middlewares
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname+'/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

// Routes
app.get('/', (req, res)=>{
   client.query('SELECT * FROM goaltable', (err, result)=>{
       if(err){
           console.log(err);
           return;
       }
       else{
           res.render('index', {goals:result.rows});
       }
   })
})

app.post('/add', (req, res)=>{
    client.query('INSERT INTO goaltable(goal, deadline, thoughts) VALUES($1, $2, $3)', [req.body.goal, req.body.deadline, req.body.thoughts])
    .then(res=>{
        console.log('Inserted the data into the table successfully');
    })
    .catch(err =>{
        console.error(err);
    })
    .finally(()=>{
        res.redirect('/');
    })
})

app.post('/edit', (req, res)=>{
    client.query('UPDATE goaltable SET goal=$1, deadline=$2, thoughts=$3 WHERE id=$4', [req.body.goal, req.body.deadline, req.body.thoughts, req.body.id])
    .then(result=>{
        console.log('Updation done successfully');
    })
    .catch(err=>{
        console.error(err);
    })
    .finally(()=>{
        res.redirect('/');
    })
})

app.delete('/delete/:id', (req, res)=>{
    client.query('DELETE from goaltable WHERE id=$1',[req.params.id])
    .then(result=>{
        console.log('Deletion Success');
    })
    .catch(err=>{
        console.error(err);
    })
    .finally(()=>{
        res.sendStatus(200);
    });
})


PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})