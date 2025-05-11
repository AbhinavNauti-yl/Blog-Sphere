import axios from "axios";

const getAllPostCategories = async (search = "", page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(
      `/api/postCategory?search=${search}&page=${page}&pageSize=${limit}`
    );
    return {data, headers};
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

const createPostCategory = async (category) => {
  try {
    const response = await axios.post("/api/postCategory", {
      title: category,
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

const deletedPostCategory = async ({ _id }) => {
  try {
    const response = await axios.delete(`/api/postCategory/${_id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

const getPostCategory = async ({id}) => {
  try {
    const response = await axios.get(`/api/postCategory/${id}`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

const updatedPostCategory = async (newTitle, {id}) => {
  try {
    const response = await axios.put(`/api/postCategory/${id}`, {title: newTitle});
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export { getAllPostCategories, createPostCategory, deletedPostCategory, getPostCategory, updatedPostCategory };
