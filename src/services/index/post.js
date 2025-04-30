import axios from "axios";

const getAllPost = async (search = "", page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(
      `/api/posts?search=${search}&page=${page}&pageSize=${limit}`
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
    const response = await axios.get(`/api/posts/${slug}`);
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
    const response = await axios.delete(`/api/posts/${slug}`)
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
    const response = await axios.put(`/api/posts/${slug}`, updatedPost, )
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
    const response = await axios.post("/api/posts")
    return response.data.data
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error (error.response.data.message)
    }
    throw new Error (error.message)
  }
}

export { getAllPost, getParticularPost, deletePost, updatePost, createPost };
