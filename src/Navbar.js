import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar(){
  return(
    <div>
      <ul>
        <li>
            <i class='bx bx-user'></i>
            <Link to='/'>Library register</Link>
        </li>
        <li>
            <i class='bx bx-book-reader'></i>
            <Link to='/book'>Book</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;