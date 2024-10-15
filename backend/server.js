const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')

const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bookpoint"
})

app.get('/',(req,res)=>{
    console.log("i am frombackend")
    res.send("from backend")
})

app.get('/book', (req, res) => {
<<<<<<< HEAD
    
    // console.log("i am here ")

=======
    console.log("i am here ")
>>>>>>> 2585cc5 (Initial commit)
    const filePath = path.join(__dirname, 'book.json'); 

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }

        try {
            const jsonData = JSON.parse(data); 
            res.json(jsonData); 
        } catch (err) {
            console.error("Error parsing JSON file:", err);
            res.status(500).json({ error: 'Error parsing JSON file' });
        }
    });
});
  


app.get('/books',(req, res)=>{
    db.query('SELECT * FROM books',(err,result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})
app.post('/books',(req,res)=>{
    console.log("i am here ")
    const data=req.body
    db.query("INSERT INTO books set ? ",data,(err, result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})

app.put('/books/:id',(req, res)=>{
    const data=[req.body.btype, req.body.quantity, req.body.oprice,req.body.pprice, req.params.id]
    db.query('UPDATE books set btype=?,quantity=?,oprice=?, pprice=? where id=?',data,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/books/:id',(req,res)=>{
    let data=req.params.id;
    db.query('DELETE  FROM books  WHERE id=?',data,(err, result)=>{
        if(err){
            throw err;
        }
        else {
            res.send(result)
        }
    })
})

app.get('/notebook', (req, res) => {
    console.log("Fetching notebooks...");
    const filePath = path.join(__dirname, 'notebook.json'); 

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }

        try {
            const jsonData = JSON.parse(data); 
            res.json(jsonData); 
        } catch (err) {
            console.error("Error parsing JSON file:", err);
            res.status(500).json({ error: 'Error parsing JSON file' });
        }
    });
});


app.get('/nbook',(req, res)=>{
    db.query("SELECT * FROM nbook ",(err , result)=>{
        if(err){
            throw  err;

        }
        else{
            res.send(result);
        }
    })
})
app.post('/nbook',(req,res)=>{
    const data=req.body
    db.query("INSERT INTO nbook set ?", data, (err , result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})



app.put('/nbook/:id',(req, res)=>{
    const data=[req.body.ntype, req.body.quantity, req.body.oprice,req.body.pprice, req.params.id]
    db.query('UPDATE nbook set ntype=?,quantity= ?,oprice= ?, pprice= ? where id=?',data,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/nbook/:id',(req,res)=>{
    const data=req.params.id
    db.query('DELETE FROM nbook WHERE id=?', data,(err, result)=>{
        if(err){
            throw err;
        }else{
            res.send(result)
        }
    })
})

app.get('/stata', (req, res) => {
    // console.log("Fetching statinary...");
    const filePath = path.join(__dirname, 'stata.json'); 

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }

        try {
            const jsonData = JSON.parse(data); 
            res.json(jsonData); 
        } catch (err) {
            console.error("Error parsing JSON file:", err);
            res.status(500).json({ error: 'Error parsing JSON file' });
        }
    });
});

app.get('/stat',(req,res)=>{
    db.query('SELECT * FROM stat',(err, result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})

app.post('/stat',(req, res)=>{
    const data=req.body
    db.query("INSERT INTO stat  set ?", data, (err , result)=>{
        if(err){
            throw err;
        }
        else {
            res.send(result)
        }
    })
})


app.put('/stat/:id',(req, res)=>{
    const data=[req.body.type, req.body.quantity, req.body.oprice,req.body.pprice, req.params.id]
    db.query('UPDATE stat set type=?,quantity= ?,oprice= ?, pprice= ? where id=?',data,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/stat/:id',(req,res)=>{
    const data=req.params.id
    db.query('DELETE FROM stat where id=?',data,(err, result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})

app.listen(3009, () => {
    console.log("server is listening on port 3009");
});
