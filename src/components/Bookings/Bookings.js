import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings , setBookings]= useState([]);
    const[loggedinUser,setLoggedinUser]= useContext(UserContext);
    useEffect(()=>{
       fetch('http://localhost:5000/bookings?email='+loggedinUser.email,{
           method: 'GET',  
             headers: {'Content-Type':'Application/json',
           Authorization : `Bearer ${sessionStorage.getItem('token')} `
        } 
        } )
       .then(res=>res.json())
       .then(data => setBookings(data));
    },[])
    return (
        <div>
            <h3>You have {bookings.length} Bookings</h3>
            {
                bookings.map(book=> <li key={book._id}>{book.name} from:{new Date(book.checkIn).toDateString('DD/MM/YYYY')} To:{new Date(book.checkOut).toDateString('DD/MM/YYYY')} </li> )
            }
        </div>
    );
};

export default Bookings;