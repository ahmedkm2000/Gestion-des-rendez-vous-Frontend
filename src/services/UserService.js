import axios from "axios";
const USER_BASE_URL = "http://localhost:8081/api/v1/user/";
class UserService{

    register(user){
        return axios.post(USER_BASE_URL+"register",user);
    }
    login(user){
        return axios.post(USER_BASE_URL+"login",user);
    }
    getAllUsers(){
        return axios.get(USER_BASE_URL);
    }
    getUserById(id){
        return axios.get(USER_BASE_URL + id);
    }
    getUserEmail(email){
        return axios.get(USER_BASE_URL + "email/"+email);
    }
    createUser(user){
        return axios.post(USER_BASE_URL,user);
    }
    updateUser(id,user){
        return axios.put(USER_BASE_URL + id,user);
    }
    deleteUser(id){
        return axios.delete(USER_BASE_URL + id);
    }
    addOrganizationToUser(id,body){
        return axios.post(USER_BASE_URL+"organizations/add/"+id,body)
    }

}
export default new UserService()