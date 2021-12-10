const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

const app = express();

app.use((require('cors'))());

app.use(bodyParser.urlencoded({extended:true}));

// mongoose.connect("mongodb://localhost:27017/fsdproject", {useNewUrlParser: true});

app.get("/", (req, res) => {
    res.send("10");
})

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})