import { Link } from 'react-router-dom'

const ButtonsHome = () => {
   return (
      <div>
         <Link to='/flightsBoard'>
            <button className='btn' type="button">Flights</button>
         </Link>
         <Link to='/feedbacksBoard'>
            <button className='btn' type="button">Feedbacks</button>
         </Link>
         <Link to='/weather'>
            <button className='btn' type="button">Weather</button>
         </Link>
      </div>
   )
}

export default ButtonsHome