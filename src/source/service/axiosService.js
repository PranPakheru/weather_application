import axiosConfig from '../utils/axiosConfig'

export class AxiosService{

    constructor(){
        this.apiKey = import.meta.env.VITE_API_KEY ?  import.meta.env.VITE_API_KEY : "";
        this.days = 7;
    }

    async fetch(cityName){
        const result = await axiosConfig.get(`forecast.json?q=${cityName}&days=${this.days}&key=${this.apiKey}`);
        return result;
    }
}