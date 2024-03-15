import axios from "axios"

const API_URL = "https://digilocker.onrender.com/api/document"

const createdocservice = async(formdata,token) => {
    const response = await axios.post(API_URL, formdata,{
        headers: {
          'Authorization': 'Bearer ' + token ,
          "content-type": "multipart/form-data",
        }
      })
    const data = response.data
return data

}

const getalldocservice = async(token) => {
    const response = await axios.get(API_URL,{
        headers: {
          'Authorization': 'Bearer ' + token 
        }
      })

    const data = response.data
return data
}
const getsingledocservice = async(id,token) => {
    const response = await axios.get(API_URL+`/${id}`,{
        headers: {
          'Authorization': 'Bearer ' + token 
        }
      })

    const data = response.data
return data
}

const updatedocservice = async(id, formdata,token) => {
    const response = await axios.put(API_URL+`/${id}`, formdata,{
        headers: {
          'Authorization': 'Bearer ' + token 
        }
      })
    const data = response.data
return data
}
const deletedocservice = async(id,token) => {
    console.log(id)
    const response = await axios.delete(API_URL+`/${id}`,{
        headers: {
          'Authorization': 'Bearer ' + token 
        }
      })
      console.log(response)
    const data = response.data
return data
}


const docservice = {
    createdocservice, getalldocservice, getsingledocservice,updatedocservice,deletedocservice
}

export default docservice;