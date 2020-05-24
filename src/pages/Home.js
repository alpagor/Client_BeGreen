import React from "react";

import HomeNavbar from "../components/HomeNavbar";
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'

function Home() {
  return (
    <div>
      <HomeNavbar />
      <div className='big-container'>
        <div className='text-container'>
          <h2>Healthy life,<br/>healthy heart</h2>
          <br/>
          <p>Even if you are a pro-vegan or a<br/>newbie, in Be Green we want to<br/>take care of you.</p>
          <br/>
          <Link className='signup' to={"/signup"}>SIGN UP</Link>
        </div>
        <Image className='happy-cooking' src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590217883/BeGreen/3838063_hoqgca.jpg" 
        alt="HappyCooking"
        fluid />
      </div>
      <div className='comparative-container'>
          <h2>But wait, there's more!</h2>
          <p>If you become a premium user we can make you a<br/>personaliced plan</p>
          <div className='comparative'>
            <div className='user-type'>
              <div className='img-container'>
                <img src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218187/BeGreen/pollito_lrnv9v.jpg" 
                alt="Free User"/>
              </div>
              <h4>FREE USER</h4>
              <ul>
                <li>&#10003; Create daily menu</li>
                <li>&#10003; Save your menus</li>
                <li>&#10799; Personaliced service</li>
                <li>&#10799; Live-chat with nutritionist</li>
              </ul>
              <h4>- FREE -</h4>
            </div>
            <div className='user-type'>
              <div className='img-container'>
                <img src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218186/BeGreen/gallo_gseejo.jpg" 
                alt="Premium User"/>
              </div>
                <h4>PREMIUM USER</h4>
                <ul>
                  <li>&#10003; Create daily menu</li>
                  <li>&#10003; Save your menus</li>
                  <li>&#10003; Personaliced service</li>
                  <li>&#10003; Live-chat with nutritionist</li>
                </ul>
                <h4>- 100€/YEAR -</h4>
            </div>
          </div>
      </div>
      <footer>
       <p>- Be Green 2020 - By alpagor & arimagic </p>
      </footer>
    </div>
  );
}

export default Home;
