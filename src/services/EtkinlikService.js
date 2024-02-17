import axios from 'axios';
const ETKINLIK_API_BASE_URL1 ="http://localhost:8080/api/v1/etkinlik";
const PostURL="http://localhost:8080/api/v1/etkinlikEkle";
const ETKINLIK_API_BASE_URL2 ="http://localhost:8080/api/v1/etkinlikUpdate";
const ETKINLIK_API_BASE_URL3 ="http://localhost:8080/api/v1/etkinlikDelete";

class EtkinlikService{
      getEtkinlikler(){
          return axios.get(ETKINLIK_API_BASE_URL1);
      }

      creatEtkinlik(etkinlik){
        return axios.post(PostURL,etkinlik);
    }
    getById(etkinlikId){
        return axios.get(ETKINLIK_API_BASE_URL1+"/"+etkinlikId);
    }
    updateEtkinlik(etkinlikId ,etkinlik){
        return axios.put(ETKINLIK_API_BASE_URL2+"/"+etkinlikId, etkinlik);
    }
    deleteEtkinlik(etkinlikId){
        return axios.delete(ETKINLIK_API_BASE_URL3+'/'+etkinlikId);
    }
     

}

export default new EtkinlikService()