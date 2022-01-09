import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlogData } from "./userSlice";
import { useParams } from "react-router-dom";

import "./blogs.css";

const News = () => {
    const { movieTitle } = useParams();
    const filter = movieTitle.split(":").join("").split("-").join(" ").split("'").join();
    // console.log(filter);
    
    const blog_url = `https://gnews.io/api/v4/search?q=${filter}&token=74da443369bd202a1f3146a275d761fc`;
    const [blogs, setBlogs] = useState();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(blog_url);
            // console.log(request)
            setBlogs(request.data.articles);
            setLoading(false);
            return request;
        }
        fetchData();
    }, [])

    console.log(blogs,filter);

    // useEffect(() => {
    //     axios
    //         .get(blog_url)
    //         .then((response) => {
    //             dispatch(setBlogData(response.data));
    //             setBlogs(response.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [searchInput]);

    return (
        <div className="blog__page">
            <h1 className="blog__page__header" style={{color: "whitesmoke"}}>{`${movieTitle} Latest Updates`}</h1>
            {loading ? <h1 className="loading" style={{color: "whitesmoke"}}>Loading...</h1> : ""}
            <div className="blogs">
                {blogs?.map((blog) => (
                    <a className="blog" target="_blank" href={blog.url}>
                        <img src={blog.image} />
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}

                {blogs?.length == 0 && (
                    <h1 className="no__blogs">
                        No News available 😞. Search something else to read blogs on the
                        greatest platform.
                    </h1>
                )}
            </div>
        </div>
    );
};

export default News;
