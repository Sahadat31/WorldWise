import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useContext, useEffect } from "react";
import { CitiesContext } from "../contexts/CitiesContext";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
  export default function City() {
    const {loading,currentCity,fetchCity} = useContext(CitiesContext)
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(function(){
      fetchCity(id)
    },[id])
    // TEMP DATA
    // const currentCity = {
    //   cityName: "Lisbon",
    //   emoji: "🇵🇹",
    //   date: "2027-10-31T15:59:59.138Z",
    //   notes: "My favorite city so far!",
    // };

    const { cityName, emoji, date, notes } = currentCity;
    if (loading) {
      return <Spinner/>
    }
    return (
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>{emoji}</span> {cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date || null)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>

        <div>
          <Button type="back" onClick={(e)=> 
          {
          e.preventDefault()
          navigate(-1)
          }}>
          &larr; Back
          </Button>
        </div>
      </div>

    )
}


