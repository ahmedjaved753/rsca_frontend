import React, { useEffect, useState } from 'react'
import { List, Typography, Divider, message } from 'antd';
import axios from 'axios'
import { GET_POSTS, DELETE_POST_BY_ID } from '../../helpers/routes'
import { getAccessAuthHeader } from '../../helpers/localStorage'
import { AiFillDelete } from 'react-icons/ai'
import Navbar from '../Navbar/Navbar'
import './all-posts.css'

function Posts() {

    const [posts, setPosts] = useState([])
    const [fetchAgain, setFetchAgain] = useState(0)

    useEffect(() => {
        axios.get(GET_POSTS, { headers: getAccessAuthHeader() })
            .then(res => {
                console.log(res.data, "ye han posts");
                setPosts(res.data);
            })
            .catch(error => console.log)

    }, [fetchAgain])

    function deletePost(id) {
        axios.delete(DELETE_POST_BY_ID(id), { headers: getAccessAuthHeader() })
            .then(res => {
                message.success("Post deleted successfully!");
                setFetchAgain(preValue => preValue + 1)
            })
            .catch(error => console.log)

    }

    return (
        <div className="all-posts-container">
            <Navbar />
            <Divider orientation="left"><h1>All Posts</h1></Divider>
            <List
                // bordered
                dataSource={posts}
                renderItem={post => (
                    <List.Item>
                        <Typography.Text mark><AiFillDelete onClick={() => deletePost(post.id)} style={{ color: "red", height: "1.3rem", width: "1.3rem", cursor: "pointer" }} /></Typography.Text> {post.title}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Posts
