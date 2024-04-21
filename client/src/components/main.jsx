import React, { useState } from "react";
import styles from '../styles/main.module.css'

import {Link} from 'react-router-dom'

const FIELDS = {
    Username: "username",
    Room: "room"
}

const Main = () =>{
    
    const { Username, Room } = FIELDS
    
    const [values, setValues] = useState({[Username]: "", [Room]: ""});

    const handleChange = ({target: {value, name}})=>{
        setValues({ ...values, [name]: value})
    }
   
    const handleClick = (e) =>{
        const isDisabled = Object.values(values).some((value) => !value)
       if(isDisabled) e.preventDefault()
    }
    
    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.wxod}>
                <h1>Войдите в комнату</h1>
                <form className={styles.form}>
                    <div className={styles.pro}>
                        <input 
                        type="text" 
                        name="username" 
                        value={values[Username]}
                        className={styles.input} 
                        placeholder="user"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        
                        />
                    </div>
                    <div className={styles.pro}>
                        <input 
                        type="text" 
                        name="room" 
                        value={values[Room]}
                        className={styles.input} 
                        placeholder="room"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        />
                    </div>

                    <Link 
                        onClick={handleClick}
                        to={`/chat?username=${values[Username]}&room=${values[Room]}`}>
                        <button 
                        type="submit"
                        className={styles.button}
                        >
                            Sign in
                        </button>
                    </Link>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Main