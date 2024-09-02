/* eslint-disable react/prop-types */
import { useEffect, createContext, useReducer } from "react"


const URL = 'http://localhost:8000'
const CitiesContext = createContext()

const initialState = {
  cities:[],
  loading: false,
  currentCity: {},
  error: ''
}

const reducer = (state,action) => {
  switch(action.type) {
    case 'loading':
      return {...state, loading: true}
    case 'cities/loaded':
      return {...state,loading: false, cities: action.payload}
    case 'city/loaded':
      return {...state, loading: false, currentCity: action.payload}
    case 'city/created':
      return {...state, 
        loading : false, 
        cities: [...state.cities,action.payload], 
        currentCity: action.payload
      }
    case 'city/deleted':
      return {...state,
        loading: false,
        cities: state.cities.filter(city=> city.id!==action.payload), 
        currentCity: {}
      }
    case 'rejected':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      throw new Error('Unknown payload type in reducer dispatch')
  }
}
function CitiesProvider ({children}) {
  const [{cities,loading,currentCity},dispatch] = useReducer(reducer,initialState)
  // const [cities, setCities] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(function(){
    async function fetchCities () {
      dispatch({type: 'loading'})
      // setLoading(true)
      try{
        const res = await fetch(`${URL}/cities`)
        const data = await res.json()
        dispatch({type: 'cities/loaded', payload: data})
        // setCities(data)
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There is an error fetching the cities'
        })
        // console.log('Error')
      } finally {
        // setLoading(false)
      }
    }
    fetchCities()
  },[])

  // function to fetch city details
  const fetchCity = async (id) => {
    if (Number(id)===currentCity.id) {
      return
    }
    dispatch({type: 'loading'})
    // setLoading(true)
        try{
          const res = await fetch(`${URL}/cities/${id}`)
          const data = await res.json()
          // setCurrentCity(data)
          dispatch({type: 'city/loaded', payload: data})
        } catch {
          dispatch({
            type: 'rejected',
            payload: 'There is an error fetching the current city details'
          })
          // console.log('Error in fetching city details')
        } finally {
          // setLoading(false)
        }
  }

  // function to create new city
  const createCity = async (newCity) => {
    dispatch({type: 'loading'})
    // setLoading(true)
        try{
          const res = await fetch(`${URL}/cities`, {
            method: 'POST',
            body: JSON.stringify(newCity),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          const data = await res.json()
          dispatch({type: 'city/created', payload: data})
          // setCities(cities=> [...cities,data])
        } catch {
          dispatch({
            type: 'rejected',
            payload: 'There is an error adding a new city.'
          })
          // console.log('Error in adding new city')
        } finally {
          // setLoading(false)
        }
  }

  // function to delete  city
  const deleteCity = async (cityId) => {
    dispatch({type: 'loading'})
    // setLoading(true)
        try{
          await fetch(`${URL}/cities/${cityId}`, {
            method: 'DELETE'
          })
          dispatch({type:'city/deleted', payload: cityId})
          // setCities(cities=> cities.filter(city=> city.id !== cityId))
        } catch {
          dispatch({
            type: 'rejected',
            payload: 'There is an error deleting the city'
          })
          // console.log('Error in deleting city')
        } finally {
          // setLoading(false)
        }
  }
  return <CitiesContext.Provider value={{cities,loading,currentCity,fetchCity,createCity,deleteCity}}>
    {children}
  </CitiesContext.Provider>
}
export {CitiesContext, CitiesProvider}