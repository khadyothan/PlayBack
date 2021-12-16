import React from 'react'
import {useParams} from 'react-router-dom'
import "./ViewReview.css"
import {useEffect,useState} from 'react'

function ViewReview() {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        window.fetch("http://localhost:4000/movie/" + movieId)
        .then(response => response.json())
        .then(data => setReviews(data))
    })
    
        
    return (
        <div className="ViewReview">
            <ul>
                {reviews.map(r => 
                    <div className="review">
                        <h2>{r.username || 'guest'}</h2>
                        <br />
                        <p>{r.review}</p>
                        <br />
                    </div>)}
            </ul>   
        </div>
    )
}

export default ViewReview
