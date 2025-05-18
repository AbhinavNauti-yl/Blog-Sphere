import axios from "axios";

export const signup = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      "https://blog-sphere-backend.onrender.com/api/users/register",
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://blog-sphere-backend.onrender.com/api/users/login",
      {
        email,
        password,
        Credential: true,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(
      "https://blog-sphere-backend.onrender.com/api/users/logout",
      { withCredentials: true }
    );

    if (response.status) {
      localStorage.setItem("account", null);
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(
      "https://blog-sphere-backend.onrender.com/api/users/profile",
      { withCredentials: true }
    );

    return response.data.data || null;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      "https://blog-sphere-backend.onrender.com/api/users/updateProfile",
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

export const deleteProfileAvatar = async () => {
  try {
    const response = await axios.get(
      "https://blog-sphere-backend.onrender.com/api/users/deleteProfileAvatar",
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

export const updateProfileAvatar = async ( {formData} ) => {
  try {
    const response = await axios.post(
      "https://blog-sphere-backend.onrender.com/api/users/updateProfileAvatar",
      formData,
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

export const getAllUsers = async (search = "", page = 1, limit = 10) => {
  try {
    // http://localhost:5173/api/users/getAllUsers
    const response = await axios.get(
      `https://blog-sphere-backend.onrender.com/api/users/getAllUsers?search=${search}&page=${page}&pageSize=${limit}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

export const deleteUsers = async ({ id }) => {
  try {
    const response = await axios.delete(
      `https://blog-sphere-backend.onrender.com/api/users/deleteUsers/${id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

export const setVarifiedUsers = async () => {
  try {
    const response = await axios.put(
      "https://blog-sphere-backend.onrender.com/api/users/setVarifiedUser",
      {},
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};
