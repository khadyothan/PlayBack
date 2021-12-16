import {useParams} from 'react-router-dom'
import axios from 'axios'
import "./PostReview.css"
import { useStateValue } from "./StateProvider";

export default function PostReview() {
    const [{ favourites, user }, dispatch] = useStateValue();
    const {movieId} = useParams();
    function addReview(e) {
        e.preventDefault()
        
        axios.post('http://localhost:4000/movie/' + movieId, {
            username: user?.email || 'anonymous',
            review: e.target.review.value,
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        window.location = '/movie/' + movieId;
    }
      return (
    <div className="postReview">
        <form method="POST" onSubmit={addReview}>
            <label className="Review">Write Review: </label><br />
            <textarea name="review" rows={20} cols={100}> </textarea><br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
    )
}