import { createContext, useReducer } from "react";
import {postReducer} from '../reducers/postReducer'
import { apiUrl,POSTS_LOADED_FAIL,POSTS_LOADED_SUCCESS, ADD_POST,DELETE_POST,UPDATE_POST, FIND_POST } from "./constants";
import axios from "axios";
import { useState } from "react";

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    //state
    const [postState, dispath] = useReducer(postReducer,{
        post:null,
        posts: [],
        postsLoading: true
    })
    //

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setUpdatePostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: true,
        message:'',
        type:null
    })


    //get all posts

    const getPosts = async() => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success){
                dispath({type: POSTS_LOADED_SUCCESS, payload: response.data.posts})
            }
        } catch (error) {
            dispath({type: POSTS_LOADED_FAIL })
        }
    }

    //add post

    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if(response.data.success){
                dispath({type: ADD_POST, payload: response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data: {success:false, message:'server error'}
        }
    }
    //delete post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(response.data.success)
            dispath({type: DELETE_POST, payload:postId})
            
        } catch (error) {
            console.log(error)
            
        }
    }
    //find post click
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispath({type: FIND_POST, payload: post})
    }
    //update post
    const updatePost = async updatePost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
            if(response.data.success){
                dispath({type: UPDATE_POST,payload: response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data: {success:false, message:'server error'}
        }
    }

    //post context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        findPost,
        setUpdatePostModal,
        showUpdatePostModal,
        updatePost
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider