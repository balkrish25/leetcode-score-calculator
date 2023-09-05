import React from 'react';
import Ranking from '../Ranking';
import Complexity from '../Complexity';

function Cards() {
  return (
    <div className='wissen' style={{display:'flex', justifyContent:'space-evenly', padding:'20px'}}>
      <div classname="card col-md-5" style={{border: "2px solid black", width: "fit-content",height:"fit-content",}}>
        <div classname="card-body">
          <Ranking/>
        </div>
      </div>
    <div classname="card col-md-5"style={{border: "2px solid black", width: "fit-content",height:"fit-content",}}>
      <div classname="card-body">
       <Complexity/>
        </div>
      </div>
     </div>
  )
}
export default Cards;
