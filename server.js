const express = require('express');
const app = express();
const port = 3000;
const budget = require("./budgetData.json");

app.use('/', express.static('public'));
const cors = require('cors');

app.use(cors());

const mongoose = require('mongoose')
let url = 'mongodb://localhost:27017/personal-budgetdata';

const budgetModel = require("./models/data_model");

app.use('/' , express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connected to database");
            budgetModel.find({})
                .then((data) => {
                    // console.log(data);
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
    });
    app.post("/postnewBudget", (req, res) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                // Insert
                console.log("connected to database to insert data");
                let newData = new budgetModel(req.body);
                budgetModel.insertMany(newData)
                    .then((data) => {
                        res.send("Data Inserted into database Successfully")
                        mongoose.connection.close();
                    })
                    .catch((connectionError) => {
                        console.log("1", connectionError)
                        res.send(connectionError.message)
                    })
            })
            .catch((connectionError) => {
                console.log("2", connectionError)
                res.send(connectionError);
            })
    })

app.get('/hello',(req,res)=>{
    res.send('Hello world !');
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});