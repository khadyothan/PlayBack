const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use((require('cors'))());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/fsdproject", {useNewUrlParser: true});
const reviewSchema = new mongoose.Schema({
    review: String,
    movieId: String,
    username: String
});
const Review = mongoose.model('Review', reviewSchema);

app.post('/movie/:id', async (req, res) => {
    const movieId = req.params.id
    const { username, review } = req.body
    console.log(username, review)
    let newReview = new Review({username, review, movieId})
    console.log(newReview)
    newReview = await newReview.save()
    res.send(req.body) 
})

app.get('/movie/:id', async (req, res) => {
    const reviews = await Review.find()
    const filteredReviews = reviews.filter((r) => r?.movieId === req.params.id)
    return res.json(filteredReviews)
})

app.get("/", (req, res) => {
    res.send("10");
})

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})