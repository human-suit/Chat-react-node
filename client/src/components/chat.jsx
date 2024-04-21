import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from 'socket.io-client'

import styles from '../styles/chat.module.css'

import Messages from './messages'


const socket = io.connect('http://localhost:5000')

const Chat = () => {
    
    const { search } = useLocation()
    const [params, setParams] = useState({ room: "", user: ""}) 
    const [state, setState] = useState([])
    const [message, setMessage] = useState("")
    const [users, setUsers] = useState(0)
    const navigate = useNavigate()


    useEffect(()=> {
        
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams)
        socket.emit('join', searchParams)
        
    }, [search])

    useEffect(()=> {
        socket.on('message', ({data})=>{
            
            setState((_state) => [..._state, data])
            
        })
    }, [])

    useEffect(()=> {
        socket.on('joinRoom', ({data: {users}})=>{
            
            setUsers(users.length)
            
        })
    }, [])


    console.log({state})

    const leftRoom = () =>{
        socket.emit('leftRoom', { params })
        navigate("/")
    
    }
    const handleChange = ({target: {value}}) => setMessage(value)
    const handleSubmit = (e) =>{
        e.preventDefault()

        if(!message) return

        socket.emit('sendMessage', {message, params})

        setMessage("")
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
            <div className={styles.left}>
                <div className={styles.roomNom}>
                Название комнаты - {params.room}
                </div>
                <div className={styles.users}>
                Количество users - {users}
                </div>
                <div >
                <button className={styles.button} onClick={leftRoom}>
                    left the rooom
                </button>
                </div>
            </div>
            <Messages messages={state} name={params.username}>


            </Messages>
            <form  className={styles.sendMes} onSubmit={handleSubmit}>
                <div className={styles.pro}>
                    <input 
                    type="text" 
                    name="message" 
                    value={message}
                    className={styles.input} 
                    placeholder="message"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    />
                </div>
                <div className={styles.button}>
                    <input type="submit" onSubmit={handleSubmit} value="Send a message" />
                </div>
            </form>
        </div>
        </div>
    )
}

export default Chat