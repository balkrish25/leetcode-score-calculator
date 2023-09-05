import React, { useState } from "react";
import styles from "./login.module.css"
import Image from '../assests/image/wissen.png'
import { Link, useNavigate } from 'react-router-dom'


export const Login = (e) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { empId: email, password: password }


    fetch(`http://localhost:8080/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    })
      .then(async (res) => {
        if (res.status === 200) {
          const res1 = await res.json();
          localStorage.setItem('user', JSON.stringify(res1.empId));
          localStorage.setItem('username', res1.userName);

          console.log(res1);
          // console.log(localStorage.getItem('user'));

         const username = localStorage.getItem("username").replace(/"/g, "");
   console.log(username);
          navigate('/home')
          // console.log(data)
          // alert('success')
        }
        else if (res.status === 400) {
          setError("The username and/or password you specified are not correct");
        }

      })
      .catch(error => {
        //alert('service error')
        console.log(error)
      })
  }






  return (
    <>
      <div className={styles.Login}>
        {/* <img className={styles.img1} alt="Wissen logo" src={Image} /> */}
        <div className={styles.formContainer}>
          <div>
          <img className={styles.img2} alt="Wissen logo" src={Image} />
          <div className={styles.FormSubContainer}> 
              <h2 className={styles.heading} >USER LOGIN</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label htmlFor="email">User Id:</label>
                <input className={styles.inputLogin} value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" placeholder="Enter your credential"/>
            <label htmlFor="password">Password:</label>
            <input className={styles.inputLogin} value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.navLink}>LOGIN</button>
              </form>
            </div>
          </div>
            <div className={styles.linkBtn1} >
          <Link className={styles.linkBtn} to='/signup'>Dont have an account? Register Here</Link>
            </div>
         </div>
      </div>
     
      
    </>
  )

}
     // const user = localStorage.getItem('user');