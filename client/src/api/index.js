import axios from "axios";

const url = "https://memory-diary.herokuapp.com/posts" || "http://localhost:5555/posts" ;

export const fetchPosts = () => axios.get(url)

export const createNewPost = (newPost) => axios.post(url,newPost)

export const updatingPost = (id,post) => axios.patch(`${url}/${id}`,post)

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const deletingPost = (id) => axios.delete(`${url}/${id}`);

export const likingPost = (id) => axios.patch(`${url}/${id}/likePost`)
