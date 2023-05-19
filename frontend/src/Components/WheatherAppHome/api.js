import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather';

const apikey = '97c95d41eafa15cd297e570c7ec9beb1';



export const getData = async(city, country) => {

    return await axios.get(`${URL}?q=${city},${country}&appid=${apikey}&units=metric`)

}