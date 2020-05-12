import React, { useEffect, useState} from 'react'
import axios from 'axios';
import Post from './Post';


const PostList = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:6969/api/posts')
        .then(res => {
            setPosts(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    console.log("posts", posts)

    if (posts) {return (
        <div>
            Here Be The Posts:
            {posts.map((data, index) => {
                return <Post data={data} key={index} />
            })}
        </div>
    )}
}

export default PostList
