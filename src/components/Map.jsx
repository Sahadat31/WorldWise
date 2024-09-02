/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import style from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useContext, useEffect, useState } from 'react'
import { CitiesContext } from '../contexts/CitiesContext'
import Button from './Button'
import useGeoLocation from '../hooks/useGeoLocation'
import useUrlPosition from '../hooks/useUrlPosition'
export default function Map () {
    const [position, setPosition] = useState([44.89,18.515])
    
    const {isLoading: positionLoading, position: geoLocationPosition , getPosition} = useGeoLocation()
    const {lat: mapLat,lng: mapLng} = useUrlPosition()
    useEffect(function() {
        console.log(mapLat,mapLng)
        if (mapLat && mapLng) {
            setPosition([mapLat,mapLng])
        }
    },[mapLat, mapLng])
    // use effect hook for retrieve current position
    useEffect(function(){
        if(geoLocationPosition) {
            setPosition([geoLocationPosition.lat,geoLocationPosition.lng])
        }
    },[geoLocationPosition])
    const {cities} = useContext(CitiesContext)
    
    return <div className={style.mapContainer}>
        
        {!geoLocationPosition && <Button type="position" onClick={getPosition}>
            {positionLoading? 'Loading' : 'Use your position'}
        </Button>}
        <MapContainer center={position} zoom={8} scrollWheelZoom={true} className={style.map}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map(city=> 
            <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
                <Popup>
                    <span>{city.cityName}</span>
                </Popup>
            </Marker>
            )}
            <ChangeCenter position={position}/>
            <DetectClick/>
        </MapContainer>
    </div>
}

function ChangeCenter ({position}) {
    const map =useMap()
    map.setView(position)
    return null
}

function DetectClick () {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => {
            // console.log(e)
            
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}