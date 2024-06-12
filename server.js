import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express()
const port = 9292;

dotenv.config();
const connectionString = process.env.DB;
const client = new MongoClient(connectionString);
let conn;

try {
    conn = await client.connect();
    console.log("Connected successfully to server");
} catch (error) {
    console.error(error);

}

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

async function fetchObjects() {
    try {
        await client.connect();
        const database = client.db("review");
        const collection = database.collection('reviewcollect');
        const cheeses = await collection.find().toArray();
        return cheeses;
    } finally {
        await client.close();
    }
}

async function insertMessage(name) {
    try {
        await client.connect();
        const database = client.db("review");
        const collection = database.collection("reviewcollect");
        await collection.insertOne({ message: name });
        console.log("succesfully inserted cheese");
    } finally {
        await client.close();
    }
}

app.post('/add-message', (req, res) => {
    const name = req.body.name;
    insertMessage(name).
        then(res.send({ cheeseAdded: true }));
});

app.get('/objects', (req, res) => {
    fetchObjects().then(cheeses => {
        res.json(cheeses);
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
