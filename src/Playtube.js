import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "./SearchBar"
import VideoList from "./VideoList"
import VideoDetail from "./VideoDetail"
import axios from "axios";
import { useParams } from "react-router-dom";

const Playtube = () => {
    const { movieTitle } = useParams();
    // console.log(movieTitle,"yr")
    const youtube = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
    });

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState({ id: {}, snippet: {} });
    
    useEffect(() => {
        async function handleSubmit() {
            const { data: { items: videos } } = await youtube.get("search", {
                params: {
                    part: "snippet",
                    maxResults: 5,
                    key: "AIzaSyAlQg7NeWOj9OKWDXrFdC2Fg_w4L7RQ0Jg",
                    q: movieTitle,
                }
            });

            setVideos(videos);
            setSelectedVideo(videos[0]);
        }
        handleSubmit();
    }, []);

    return (
        <Grid style={{ justifyContent: "center" }} container spacing={10}>
            <Grid item xs={11}>
                <Grid container spacing={10}>
                    {/* <Grid item xs={12}>
                        <SearchBar onSubmit={handleSubmit} />
                    </Grid> */}
                    <Grid item xs={8}>
                        <VideoDetail video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );


}

export default Playtube;