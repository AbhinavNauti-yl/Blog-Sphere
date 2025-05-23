import axios from "axios";

export const signup = async ({name, email, password}) => {
  try {
    const response = await axios.post("/api/users/register", {
        name,
        email,
        password
    });
    
    return response
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
};

export const login = async ({email, password}) => {
  try {
    const response = await axios.post("api/users/login", 
      {
        email,
        password,
        Credential: true
      },
    )
    return response
  } catch (error) {
    if( error.response && error.response.data.message ){
      throw new Error(error.response.data.message)
    }

    throw new Error(error.message)
  }
}

export const logout = async () => {
  try {
    const response = await axios.get("api/users/logout",{
      Credential: true,
    })
    
    if(response.status) {
      localStorage.setItem("account", null)
    }

  } catch (error) {
    if(error.response && error.response.data.message){
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}

export const getProfile = async () => {
  try {
    const response = await axios.get("api/users/profile",{
      Credential: true,
    })
    
    return response.data.data || null

  } catch (error) {
    if(error.response && error.response.data.message){
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}

export const updateProfile = async ({name, email, password}) => {
  try {
    const response = await axios.post("api/users/updateProfile", {
      name, email, password
    })
    return response
  } catch (error) {
    if(error.response && error.response.data.message){
      throw new Error(error.response.data.message)
    }

    throw new Error(error.message)
  }
}

export const deleteProfileAvatar = async () => {
  try {
    const response = await axios.get("api/users/deleteProfileAvatar", {
      Credential: true
    })
    
    return response
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error (error.response.data.message)
    }

    throw new Error(error.message)
  }
}

export const updateProfileAvatar = async ({formData}) => {
  try {
    const response = await axios.post("api/users/updateProfileAvatar", formData, {
      Credential: true,
    })
    
    return response
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error(error.message)
  }
}

export const getAllUsers = async (search = "", page = 1, limit = 10) => {
  try {
    // http://localhost:5173/api/users/getAllUsers
    const response = await axios.get(`/api/users/getAllUsers?search=${search}&page=${page}&pageSize=${limit}`)
    return response
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error(error.message)
  }
}

export const deleteUsers = async ({id}) => {
  try {
    const response = await axios.delete(`/api/users/deleteUsers/${id}`)
    return response.data.data
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error(error.message)
  }
}

export const setVarifiedUsers = async () => {
  try {
    const response = await axios.put(`/api/users/setVarifiedUser`)
    return response.data.data
  } catch (error) {
    if(error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error(error.message)
  }
}