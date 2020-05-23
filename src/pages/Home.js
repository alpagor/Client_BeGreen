import React from "react";

import HomeNavbar from "../components/HomeNavbar";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <HomeNavbar />
      <div>
        <div>
          <h2>Healthy life,<br/>healthy heart</h2>
          <p>Even if you are a pro-vegan or a<br/>newbie, in Be Green we want to<br/>take care of you.</p>
          <Link className='signup' to={"/signup"}>SIGN UP</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
