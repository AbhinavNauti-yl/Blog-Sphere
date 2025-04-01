import axios from "axios";
import { useDispatch } from "react-redux";
import { resetUserInfo } from "../../store/slices/user.slice";

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
    
    return response.data.data

  } catch (error) {
    if(error.response && error.response.data.message){
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}