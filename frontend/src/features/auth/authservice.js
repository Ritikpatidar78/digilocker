import axios from "axios";

const API_URL = "/api/auth"

const loginservice = async (formdata)=>{
        const response = await axios.post(API_URL + "/login", formdata)
      
        localStorage.setItem("users", JSON.stringify(response.data))
        return response.data
}

const registerservice = async (formdata) => {
        const response = await axios.post(API_URL + "/register", formdata)
    
        localStorage.setItem("users", JSON.stringify(response.data))
        return response.data
        
}
const authService = {
    loginservice,
    registerservice
}

export default authService