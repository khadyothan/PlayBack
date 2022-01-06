import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./PostReview.css"
import { useStateValue } from "./StateProvider";

export default function PostReview() {
    const [{ favourites, user }, dispatch] = useStateValue();
    const { movieId } = useParams();
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
                    <label for="subject" style={{ color: "#fff", fontSize: "30px" }}>Write Review</label>
                    <br />
                    <textarea id="subject" name="review" placeholder="Write your review.." cols={60} style={{ height: "560px", backgroundColor: "whitesmoke" }}></textarea>
                    <br />
                    <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}