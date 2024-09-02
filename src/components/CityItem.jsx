/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import style from './CityItem.module.css'
import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';
const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
export default function CityItem ({city}) {
    const {currentCity, deleteCity} = useContext(CitiesContext)
    const {cityName, date, emoji, position, id} = city
    const handleClick = (e) => {
        e.preventDefault()
        deleteCity(id)
    }
    return <li><NavLink 
        to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${style.cityItem} ${id === currentCity.id ? style['cityItem--active'] : '' }`}
        >
        <span className={style.emoji}>{emoji}</span>
        <h3 className={style.name}>{cityName}</h3>
        <time className={style.date}>{formatDate(date)}</time>
        <button className={style.deleteBtn} onClick={handleClick}>&times;</button>
        </NavLink>
    </li>
}