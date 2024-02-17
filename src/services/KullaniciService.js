import axios from 'axios';
const Kullanici_API_BASE_URL1 ="http://localhost:8080/api/v2/kullanici";

class KullaniciService{
 

    getById(email , pass){
        console.log('etkinlik => '+ Kullanici_API_BASE_URL1+'/'+email+"?pass={pass}")

        return axios.get(Kullanici_API_BASE_URL1+'/'+email+"?pass="+pass );
    }


}

export default new KullaniciService()