import { useState, useEffect, React } from 'react'
import { flightService } from '../../Service/FlightService'
import Flight from './Flight'

export default function FlightsBoard() {
  const [flights, setFlights] = useState(null)
  const [filterByDepartureCity, setDepartureCity] = useState("")
  const [filterByStops, setStop] = useState("")
  const [filterByflightNumber, setFlightNum] = useState("")
  const [filterByLandingCity, setLandingCity] = useState("")
  const [filterBy, setFilterBy] = useState({})


  useEffect(() => {
    getFlights()
  })
  const getFlights = async () => {
    const data = await flightService.query(filterBy)
    setFlights(data)
  }

  const filterChange = (event) => {
    if (event.target.name === "departure_city") {
      setDepartureCity(event.target.value)
    }
    if (event.target.name === "landing_city") {
      setLandingCity(event.target.value)
    }
    if (event.target.name === "stops") {
      setStop(event.target.value)
    }
    if (event.target.name === "flight_number") {
      setFlightNum(event.target.value)
    }
    const filterObject = {
      departure_city: event.target.name === "departure_city" ? event.target.value : filterByDepartureCity,
      landing_city: event.target.name === "landing_city" ? event.target.value : filterByLandingCity,
      stops: event.target.name === "stops" ? event.target.value : filterByStops,
      flight_number: event.target.name === "flight_number" ? event.target.value : filterByflightNumber
    }
    setFilterBy(filterObject)
  }



  if (!flights) return <div>Loading...</div>
  else {
    return (
      <div className='flightList'>
        <div className="main" >
          {(flights || flights.length === 0) && <div className="buttons">
            <input className="inputFlights" onChange={filterChange} type="text" name="departure_city" placeholder="Departure City"></input>
            <input className="inputFlights" onChange={filterChange} type="text" name="landing_city" placeholder="Landing City"></input>
            <input className="inputFlights" onChange={filterChange} type="number" min="0" max="5" name="stops" placeholder="Stops"></input>
            <input className="inputFlights" onChange={filterChange} type="text" name="flight_number" placeholder="Flight Number"></input>
          </div>}
          <table className='table'>
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Departure Date</th>
                <th>Time</th>
                <th>Departure City</th>
                <th>Landing City</th>
                <th>Company Name</th>
                <th>Stops</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(flight => <Flight flight={flight} key={flight.flight_number} />)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


