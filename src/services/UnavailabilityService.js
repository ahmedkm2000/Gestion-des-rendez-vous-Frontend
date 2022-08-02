import axios from "axios";
const UNAVAILABILITY_BASE_URL = "http://localhost:8081/api/v1/unavailability/";
class UnavailabilityService{

    getAllPeriods(){
        return axios.get(UNAVAILABILITY_BASE_URL);
    }
    getPeriodById(id){
        return axios.get(UNAVAILABILITY_BASE_URL + id);
    }
    createPeriod(role){
        return axios.post(UNAVAILABILITY_BASE_URL,role);
    }
    updatePeriod(id,role){
        return axios.put(UNAVAILABILITY_BASE_URL + id,role);
    }
    deletePeriod(id){
        return axios.delete(UNAVAILABILITY_BASE_URL + id);
    }

}
export default new UnavailabilityService()