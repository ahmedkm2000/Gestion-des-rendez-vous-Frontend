import axios from "axios";
const ROLE_BASE_URL = "http://localhost:8081/api/v1/role/";
class RoleService{

    getAllRoles(){
        return axios.get(ROLE_BASE_URL);
    }
    getRoleById(id){
        return axios.get(ROLE_BASE_URL + id);
    }
    getRoleByName(name){
        return axios.get(ROLE_BASE_URL + 'get?name='+name);
    }
    createRole(role){
        return axios.post(ROLE_BASE_URL,role);
    }
    updateRole(id,role){
        return axios.put(ROLE_BASE_URL + id,role);
    }
    deleteRole(id){
        return axios.delete(ROLE_BASE_URL + id);
    }

}
export default new RoleService()