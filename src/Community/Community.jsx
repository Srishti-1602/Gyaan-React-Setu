import React from "react";
import './community.css';

function Pricing() {
  return (
    <div className="row row-cols-1 row-cols-md-2 mb-3 text-center">
      <div className="col-clg col-md-8">
        <div className="card-clg mb-4 rounded-3 shadow-sm">
          <div className="card-body-clg">
            <h1 className="card-title-clg pricing-card-title">Community</h1>
            <div id="Community-data" className="CommunityData">
              
            </div>
          </div>
        </div>
      </div>
      <div className="col-user col-md-4">
        <div className="card-user mb-2 rounded-2 shadow-sm">
          <div className="card-body-user">
            <h1 className="card-title-user pricing-card-title">Users</h1>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;