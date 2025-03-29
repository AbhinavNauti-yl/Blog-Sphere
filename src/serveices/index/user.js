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
