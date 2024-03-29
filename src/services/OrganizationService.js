import axios from "axios";
const ORGANIZATION_BASE_URL = "http://localhost:8081/api/v1/organization/";
class OrganizationService{

    getAllOrganizations(){
        return axios.get(ORGANIZATION_BASE_URL);
    }
    getOrganizationById(id){
        return axios.get(ORGANIZATION_BASE_URL + id);
    }
    getOrganizationByName(name){
        return axios.get(ORGANIZATION_BASE_URL+'/name/' + name);
    }
    createOrganization(organization){
        return axios.post(ORGANIZATION_BASE_URL,organization);
    }
    updateOrganization(id,organization){
        return axios.put(ORGANIZATION_BASE_URL + id,organization);
    }
    deleteOrganization(id){
        return axios.delete(ORGANIZATION_BASE_URL + id);
    }
    addAdminToOrganizations(id,idsOrg){
        return axios.post(ORGANIZATION_BASE_URL+"add/"+id,idsOrg);
    }
    addUsersToOrganizations(id,idsOrg){
        return axios.post(ORGANIZATION_BASE_URL+"add/users/"+id,idsOrg);
    }

}
export default new OrganizationService()