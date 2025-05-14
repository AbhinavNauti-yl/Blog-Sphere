import axios from "axios";

const getAllPost = async (search = "", page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(
      `https://blog-sphere-backend.onrender.com/api/posts?search=${search}&page=${page}&pageSize=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const getParticularPost = async ({ slug }) => {
  try {
    const response = await axios.get(`https://blog-sphere-backend.onrender.com/api/posts/${slug}`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

const deletePost = async ({slug}) => {
  try {
    const response = await axios.delete(`https://blog-sphere-backend.onrender.com/api/posts/${slug}`)
    return response.data.data
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message)
  }
};

const updatePost = async ({slug, updatedPost}) => {
  try {
    const response = await axios.put(`https://blog-sphere-backend.onrender.com/api/posts/${slug}`, updatedPost, )
    return response
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}

const createPost = async () => {
  try {
    const response = await axios.post("https://blog-sphere-backend.onrender.com/api/posts")
    return response.data.data
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error (error.response.data.message)
    }
    throw new Error (error.message)
  }
}

export { getAllPost, getParticularPost, deletePost, updatePost, createPost };
