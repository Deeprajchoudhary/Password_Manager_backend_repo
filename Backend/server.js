const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
require('dotenv').config()

const { MongoClient } = require('mongodb');
const url = process.env.Mongo_URI;
const client = new MongoClient(url);

const bodyParser = require('body-parser'); 

const dbName = 'PassOP';

console.log(`Hello ${process.env.Mongo_URI}`)

app.use(cors());


app.use(bodyParser.json());

// to get password 
app.get('/', async (req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.send(findResult);
});

// to save password 
app.post('/', async (req, res) => {
    await client.connect();
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success : true, result: findResult});
});

// to delete password 
app.delete('/', async (req, res) => {
    await client.connect();
    const {id} = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne({id: id});
    res.send({success : true, result: findResult});
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});