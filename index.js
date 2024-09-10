import axios from "axios";
import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));


// Get present day
const date = new Date();
const month = date.getMonth() +1;
const day = date.getDate();

// Get the list of events for the present day
app.get('/', async (req,res)=>{
    try{
        const response = await axios.get(`https://byabbe.se/on-this-day/${month}/${day}/events.json`);
        const result = response.data;
        res.render("index.ejs", {data: result});
    }catch(error){
        console.log("failed to make request: ",error.message);
        res.render("index.ejs",{error: error.message});
    }
});

//Get the list of event for the inputed day
app.get('/submit', async (req,res)=>{
    //get the values user had inputed
    const month = req.query.month;
    const day = req.query.day;
    try{
        const response = await axios.get(`https://byabbe.se/on-this-day/${month}/${day}/events.json`);
        const result = response.data;
        res.render("index.ejs", {data: result});
    }catch(error){
        console.log("failed to make request: ",error.message);
        res.render("index.ejs",{error: error.message});
    }
});


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
