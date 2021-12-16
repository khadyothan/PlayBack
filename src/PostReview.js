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
        <div className="container">
            <form method="POST" onSubmit={addReview}>
                <div class="row">
                    <div class="col-25">
                        <label for="subject" style={{color : "#fff"}}>Write Review</label>
                    </div>
                    <div class="col-75">
                        <textarea id="subject" name="review" placeholder="Write something.." cols={100} style={{height:"560px", backgroundColor: "whitesmoke"}}></textarea>
                    </div>
                </div>
                <br />
                <div class="row">
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        </div>
    )
}