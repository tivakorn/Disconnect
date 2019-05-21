const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require('path');
let port = 2000;

const db = require("./db");
const collection = "todo";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, docments) => {
        if (err)
            console.log(err);
        else {
            console.log(docments);
            res.json(docments);
        }
    });
});


app.put('/:id',(req, res)=>{
    const todoID = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate({_id : todoID},{$set : {todo : userInput.todo}},{returnOriginal : false},(err,result)=>{

    });
});


app.post('/',(req,res)=>{
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput,(req,result)=>{
        if(err)
            console.log(err);
        else
            res.json({result : result, docment : result.ops[0]});
    });
});


app.delete('/:id',(req,res)=>{
    const todoID = params.id;

    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(todoID)},(req,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});


db.connect((err) => {
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    }
    else {
        app.listen(port, () => {
            console.log(`connected to database, app listening on port ${port}`);
        });
    }
});