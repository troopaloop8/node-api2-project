import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Comments from './Comments';

const Post = (props) => {

    const [comments, setComments] = useState([])
    const {id} = props.data;
    useEffect(() => {
        axios.get(`http://localhost:6969/api/posts/${id}/comments`)
        .then(res => {
            setComments(res.data);
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    console.log("comments", comments)



    return (
        <div>
            <h1>Quote: {props.data.title}</h1>
            <h2>{props.data.contents}</h2>
            <h3>{comments.map((comment, index) => {
                return <Comments comment={comment} key={index}/>
            })}</h3>
        </div>
    )
}

export default Post
