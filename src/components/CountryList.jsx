/* eslint-disable react/prop-types */
import style from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import { useContext } from 'react'
import { CitiesContext } from '../contexts/CitiesContext'
export default function CountryList () {
    const {cities, loading} = useContext(CitiesContext)
    if (loading) {
        return <Spinner/>
    }
    const countries = cities.reduce((arr,city)=>{
        if(!arr.map(el=>el.country).includes(city.country)){
            return [...arr,{country:city.country, emoji:city.emoji}]
        } else {
            return arr
        }
    },[]) 
    return <ul className={style.countryList}>
        {countries.map(country=><CountryItem country={country} key={country.country}/>)}
    </ul>

}