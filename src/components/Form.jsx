/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from './Message'
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CitiesContext } from "../contexts/CitiesContext";
const URL ='https://api.bigdatacloud.net/data/reverse-geocode-client'
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const { isLoading, createCity } = useContext(CitiesContext)
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
  const [geoCodingError, setGeoCodingError] = useState('')
  const [emoji, setEmoji] = useState('')
  const {lat,lng} = useUrlPosition()
  useEffect(function(){
    async function reverseGeoLocation(lat,lng) {
      try {
        setIsLoadingGeoCoding(true)
        setGeoCodingError('')
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        if (!data.countryCode) {
          throw new Error("That doesn't seem  to be a city. Please click somewhere else.")
        }
        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(data.countryCode)
      } catch (err) {
        setGeoCodingError(err.message)
        console.log('Error in reverse geo location')
      } finally {
        setIsLoadingGeoCoding(false)
      }
    }
    if (lat && lng) {
      reverseGeoLocation(lat,lng)
    }
  },[lat,lng])
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cityName || !date) return
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat,lng}
    }
    await createCity(newCity)
    navigate('/app/cities')
  }
  if (!lat && !lng) {
    return <Message message="Please start by clicking on the map!!!"/>
  }
   if (isLoadingGeoCoding) {
    return <Spinner/>
   }
  if (geoCodingError) {
    return <Message message={geoCodingError}/>
  }
  return (
    <form className={`${styles.form} ${isLoading? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" selected={date} dateFormat="dd/MM/YYYY" onChange={(d) => setDate(d)}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e)=>{
          e.preventDefault()
          navigate(-1)
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

