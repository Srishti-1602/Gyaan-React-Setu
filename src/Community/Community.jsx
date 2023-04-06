import React from "react";
import Navbar from "../Nav/Nav";
import './community.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Community() {
  return (
    <div>
      <Navbar />
     <div className='user-search'>
            <form id='search-user'>
              <input
                type='search'
                className='searchbar-user'
                placeholder=' Search topics from users...'
                name='search'
                id='search-input'
              />
            </form>
        </div>

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
</div>
  );
}

export default Community;