// import React, { useState, useEffect } from 'react';
// import Rankhl from './Ranking.highest.lowest';
// import axios from 'axios';


// function BasicExample() {

//   const [userDetails, setUserDetails] = useState([])
 

//   useEffect(() => {
//     async function getData() {
//       const response = await axios.get(`http://localhost:8080/user/toplast`);
//       setUserDetails(response.data);
//     }
//     getData();
//   }, []);
   
//   console.log('userdetails123', userDetails);

  
//   return (
//     <>
//       <div
//         className="Cardreport"
//         style={{ display: "flex", padding: "20px", marginLeft: "300px" }}
//       >
//         <div className="card col-md-6">
//           <div className="card-body">

//             <Rankhl userDetails={userDetails} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BasicExample;