import { FlightForm } from './FlightForm'
import { useState, useEffect, React } from 'react'
import { flightService } from '../../Service/FlightService'
import { EventBus } from '../../Service/EventBus'
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Icon } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from "react-redux";
import { userService } from "../../Service/UserService";

export default function Flight({ flight }) {
    const [flightUpdate, setFlightUpdate] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(state => state.userReducer.user)// from redux
    const [isBuy, setIsBuy] = useState(false)
    const [isTemp, setTemp] = useState(false) //flightNumber in user array - likedFlights

    useEffect(() => {
        EventBus.on('updated', () => {
            setFlightUpdate(false)
        });
        checkIfLiked()
    })

    const checkIfLiked = () => {
        user.like_flights.forEach(likeFlight => {
            if (likeFlight === flight.flight_number) {
                setTemp(true)
            }
        })
    }
    const updateFlight = () => {
        setFlightUpdate(true)
    }

    const deleteFlight = async (flightNum) => {
        await flightService.remove(flightNum)
    }

    const onBuy = (flight) => {
        if (window.confirm("Do you want to but this flight?")) {//change boolean
            user.buy_flights = user.buy_flights.filter(flightNumber => flightNumber !== flight.flight_number)
            user.buy_flights.unshift(flight.flight_number,);

            userService.save(user);
            alert(`Flight Number: ${flight.flight_number}\nCompany Name: ${flight.company_name}\nDeparture Date: ${flight.departure_date}\nDeparture City: ${flight.departure_city}\nLanding City: ${flight.landing_city}\nStops: ${flight.stops}\nPrice: ${flight.price}`
            )
        }
    }

    const onIsLiked = (flightNum) => {
        let flag = !isLiked
        setIsLiked(flag);
        if (flag) {
            user.like_flights = user.like_flights.filter(flightNumber => flightNumber !== flightNum)
            user.like_flights.unshift(flightNum);
            userService.save(user);
        }
        else {
            setTemp(false)
            setIsLiked(false);
            user.like_flights = user.like_flights.filter(flightNumber => flightNumber !== flightNum)
            userService.save(user);

        }
    }



    return (
        <tr style={{ marginBottom: "14px" }}>
            <td>
                {flight.flight_number}
            </td>
            <td>
                {flight.departure_date}
            </td>
            <td>
                {flight.time}
            </td>
            <td>
                {flight.departure_city}
            </td>
            <td>
                {flight.landing_city}
            </td>
            <td>
                {flight.company_name}
            </td>
            <td>
                {flight.stops}
            </td>
            <td>
                {flight.price}
            </td>
            <td><i onClick={() => {
                onIsLiked(flight.flight_number)
            }} className={`far fa-heart ${(isLiked || isTemp) ? "isLiked" : "notLiked"}`}></i></td>
            <td><Icon onClick={() => {
                onBuy(flight)
            }}><ShoppingCartIcon /></Icon></td>
            <td>{user.admin && <IconButton aria-label="edit" className="btn btn-primary" style={{ color: '#440047' }} onClick={updateFlight}><EditIcon /></IconButton>}</td>
            <td>{user.admin && <IconButton aria-label="delete" className="btn btn-primary" style={{ color: '#440047' }} onClick={() => { deleteFlight(flight.flight_number) }}><DeleteIcon /></IconButton>}</td>
            {flightUpdate && <FlightForm flightNum={flight.flight_number} />}
        </tr>
    )
}
