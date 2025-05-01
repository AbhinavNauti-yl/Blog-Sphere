import axios from "axios"

const getAllPostCategories = async () => {
    try {
        const response = await axios.get('/api/postCategory')
        return response.data.data
    } catch (error) {
        if(error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
        }
    }
}


export { getAllPostCategories }