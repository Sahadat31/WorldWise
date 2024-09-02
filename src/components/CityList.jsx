/* eslint-disable react/prop-types */
import CityItem from './CityItem'
import style from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useContext } from 'react'
import { CitiesContext } from '../contexts/CitiesContext'
export default function CityList () {
    const {cities, loading} = useContext(CitiesContext)
    if (loading) {
        return <Spinner/>
    }
    if (!cities.length) {
        return <Message message='Add your first city by clicking on the map'/>
    }
    return <ul className={style.cityList}>
        {cities.map(city=><CityItem key={city.id} city={city}/>)}
    </ul>
}