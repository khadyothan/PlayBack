const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use((require('cors'))());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true});
const reviewSchema = new mongoose.Schema({
    review: String,
    movieId: String,
    username: String
});
const Review = mongoose.model('Review', reviewSchema);

const favouriteSchema = new mongoose.Schema({
    movieId: String,
    username: String
});
const Favourite = mongoose.model('Favourite', favouriteSchema);

const watchlaterSchema = new mongoose.Schema({
    movieId: String,
    username: String
});
const WatchLater = mongoose.model('WatchLater', watchlaterSchema);

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

app.get('/favourites/:id', async (req, res) => {
    // console.log(req.params,req.query)
    const reviews = await Favourite.find({
        movieId: req.params.id,
        username: req.query.username
    })
    return res.json(reviews)
})

app.post('/favourites/:id', async (req, res) => {
    const movieId = req.params.id
    const username = req.body.username
    // console.log(username,movieId)
    let fav = new Favourite({username, movieId})
    // console.log(fav)
    fav = await fav.save()  
    res.send(req.body) 
})

app.delete('/favourites/:id', async (req, res) => {
    const movieId = req.params.id
    // console.log(req)
    const username = req.query.username
    console.log(username,movieId,"del")
    let fav = await Favourite.findOneAndDelete({username, movieId})
    // console.log(fav)
    res.send(req.body)
})

app.get('/favourites', async (req, res) => {
    const reviews = await Favourite.find({
        username: req.query.username
    })
    const ids = reviews.map((r) => r?.movieId)
    console.log(ids)
    return res.json(ids)
})


app.get('/watchlater/:id', async (req, res) => {
    // console.log(req.params,req.query)
    const reviews = await WatchLater.find({
        movieId: req.params.id,
        username: req.query.username
    })
    return res.json(reviews)
})

app.post('/watchlater/:id', async (req, res) => {
    const movieId = req.params.id
    const username = req.body.username
    // console.log(username,movieId)
    let fav = new WatchLater({username, movieId})
    // console.log(fav)
    fav = await fav.save()  
    res.send(req.body) 
})

app.delete('/watchlater/:id', async (req, res) => {
    const movieId = req.params.id
    // console.log(req)
    const username = req.query.username
    console.log(username,movieId,"del")
    let fav = await WatchLater.findOneAndDelete({username, movieId})
    // console.log(fav)
    res.send(req.body)
})

app.get('/watchlater', async (req, res) => {
    const reviews = await WatchLater.find({
        username: req.query.username
    })
    const ids = reviews.map((r) => r?.movieId)
    console.log(ids)
    return res.json(ids)
})



app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server is running on port 4000");
})