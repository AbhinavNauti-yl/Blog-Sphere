import axios from "axios"

const getAllPost = async () => {
    try {
        const response = await axios.get("/api/posts")
        return response.data.data
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}

const getParticularPost = async ({slug}) => {
    try {
        const response = await axios.get(`/api/posts/${slug}`)
        return response.data.data
    } catch (error) {
        if(error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
        }

        throw new Error(error.message)
    }
}

export {getAllPost, getParticularPost}