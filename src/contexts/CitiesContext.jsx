/* eslint-disable react/prop-types */
import { useEffect, createContext, useReducer, useCallback } from "react"


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

  useEffect(function(){
    async function fetchCities () {
      dispatch({type: 'loading'})
      try{
        const res = await fetch(`${URL}/cities`)
        const data = await res.json()
        dispatch({type: 'cities/loaded', payload: data})
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There is an error fetching the cities'
        })
      }
    }
    fetchCities()
  },[])

  // function to fetch city details
  const fetchCity = useCallback(async (id) => {
    if (Number(id)===currentCity.id) {
      return
    }
    dispatch({type: 'loading'})
        try{
          const res = await fetch(`${URL}/cities/${id}`)
          const data = await res.json()
          dispatch({type: 'city/loaded', payload: data})
        } catch {
          dispatch({
            type: 'rejected',
            payload: 'There is an error fetching the current city details'
          })
        }
  },[currentCity.id])

  // function to create new city
  const createCity = async (newCity) => {
    dispatch({type: 'loading'})
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
        } catch {
          dispatch({
            type: 'rejected',
            payload: 'There is an error adding a new city.'
          })
        }
  }

  // function to delete  city
  const deleteCity = async (cityId) => {
    dispatch({type: 'loading'})
        try{
          await fetch(`${URL}/cities/${cityId}`, {
            method: 'DELETE'
          })
          dispatch({type:'city/deleted', payload: cityId})
        } catch {
          dispatch({
            type: 'rejected',
            payload: 'There is an error deleting the city'
          })
        }
  }
  return <CitiesContext.Provider value={{cities,loading,currentCity,fetchCity,createCity,deleteCity}}>
    {children}
  </CitiesContext.Provider>
}
export {CitiesContext, CitiesProvider}