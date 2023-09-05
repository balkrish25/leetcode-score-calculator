import React, { useState } from "react";
//import { Toast } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import Image from '../assests/image/wissen.png'
import styles from "./login.module.css"


export const Register = (props) => {
    const [isError, setIsError] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [user, setUser] = useState('')

    const checkValidation = () => {

        // console.log("Password",pass);
        // console.log("Confirm",confirm);

        if (pass !== confirm) {
            setIsError("Confirm Password should be match with password")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkValidation()
        let regobj = { name, email, pass, confirm }
        console.log(regobj);

        //     fetch("url", {
        //         method: "POST",
        //         headers: {'content-type': 'application/json'},
        //        body:JSON.stringify(regobj)
        //     }).then((res)=> {
        //          toast.success('Registered successfull.')
        //     }).catch((err) => {
        //         toast.error('Failed:' + err.message);
        //     })
        fetch(`http://localhost:8080/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(regobj)

        })
            .then(async (res) => {
                if (res.status === 200) {
                    const res1 = await res.json();
                    localStorage.setItem('name', JSON.stringify(res1.name));
                    localStorage.setItem('email', JSON.stringify(res1.email));
                    localStorage.setItem('pass', JSON.stringify(res1.pass));
                    localStorage.setItem('confirm', JSON.stringify(res1.confirm));
                    


                    console.log(res1);
                    console.log(localStorage.getItem('pass'));
                    console.log(localStorage.getItem('name'));
                    console.log(localStorage.getItem('confirm'));
                    console.log(localStorage.getItem('email'));

                    const User = localStorage.getItem('user');
                    setUser(User);
                    console.log(User)
                    navigate('/')
                    // console.log(data)
                    // alert('success')
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
                    <h2 className={styles.heading} >REGISTER</h2>
                    <form className={styles.registerForm} onSubmit={handleSubmit}>
                        <label htmlFor="name">Full name:</label>
                        <input className={styles.inputLogin} value={name} onChange={(e) => setName(e.target.value)} type="name" id="name" name="name"  />
                        <label htmlFor="email">Email:</label>
                        <input className={styles.inputLogin} value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                        <label htmlFor="password">Password:</label>
                        <input className={styles.inputLogin} value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />

                        <label htmlFor="confirm">ConfirmPassword:</label>
                        <span>{isError}</span>
                        <input value={confirm} className={styles.inputLogin} onChange={(e) => setConfirm(e.target.value)} type="password" id="confirm" name="confirm" />

                            <button type="submit" className={styles.navLink}>SIGN UP</button>
                            </form>
                        </div>
                        <div className={styles.linkBtn1} >
                        <Link className={styles.linkBtn} to='/'>Already have an account? Login Here</Link>
                        </div>
                        </div>
                    </div>
            </div>
        </>

    )
}

