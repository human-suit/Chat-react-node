import React from "react";

import styles from '../styles/chat.module.css'



const Message = ({messages, name}) =>{
    return (
        <div className={styles.mes}>
           
           { messages.map(({user, message}, index) => {
        
                const itsMe = user.username === name
                const className = itsMe ? styles.me : styles.messagebox
            
            return(
                <div key={index} className={`${styles.messagebox} ${className}`}>
                    <span className={styles.userstext}>
                        {user.username}
                    </span>
                    <div className={styles.text}>
                        {message}
                    </div>
                </div>
            )    
           }
           )
        }
        
           
        </div>
    )
}

export default Message