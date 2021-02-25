import { weatherService } from '../../Service/WeatherService'
import { useState, useEffect, React } from 'react'
import { flightService } from '../../Service/FlightService';
import moment from 'moment';
import Flight from '../Flights/Flight'


const Weather = () => {
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [today, setToday] = useState('');
  const [flights, setFlights] = useState(null)
  const [filterBy, setFilterBy] = useState({})

  useEffect(() => {
    getFlights()
  })

  const getFlights = async () => {

    const dateToday = moment().format('L');
    const filterObj = {
      departure_date: dateToday
    }
    const flightsData = await flightService.query(filterObj);
    setFlights(flightsData)
    setToday(dateToday);
  }


  const getWeather = async () => {

    const data = await weatherService.getByCity(city)
    setWeather(data);
    setTemp(data.main.temp)
    setDescription(data.weather[0].description)
    setIcon(data.weather[0].icon)
  }
  const onInputCityChange = (ev) => {
    setCity(ev.target.value);
  }


  if (!flights) return <div>Loading..</div>

  return (
    <div>
      <h3 className="center">Last Minute Flights </h3>
      <div className="weatherCard">
        <input className="inputFlights" onChange={onInputCityChange} id="outlined-basic" label="City Name" name="CityName" placeholder="City Name" variant="outlined" />
        <button style={{ backgroundColor: '#440047', border: '0', color: 'White', borderRadius: '5px', width: '150px', height: '25px', fontSize: '1rem', marginTop: '5px' }} onClick={getWeather}>Check Weather</button>
        <h3>{temp}</h3>
        <h3>{description}</h3>
        {temp >= 10 && temp < 20 && <i className="fas fa-cloud-rain"></i>}
        {temp >= 20 && <i className="fas fa-sun"></i>}
        {temp < 10 && <i className="fas fa-snowman"></i>}

      </div>
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
  )
}

export default Weather
