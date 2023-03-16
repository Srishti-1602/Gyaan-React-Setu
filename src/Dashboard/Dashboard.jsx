import React from "react";
import './dashboard.css';
import logo from '../Images/Gyaan setu.png';

function Dash() {
  return (
    <div className="row row-cols-1 row-cols-md-4 mb-3 text-center">
  <div className="col">
    <div className="card mb-4 rounded-3 shadow-sm" style={{ backgroundColor: "#162238" }}>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          <img alt="information" className="infophoto" src={logo} />
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          <li className="username" id="username">username</li>
          <li className="username" id="course">course</li>
          <li className="username" id="Department">department</li>
          <li className="username" id="school">school</li>
        </ul>
        {/* <button type="button" class="w-100 btn btn-lg btn-dark">Get started</button> */}
      </div>
    </div>
  </div>
</div>

  );
}

export default Dash;