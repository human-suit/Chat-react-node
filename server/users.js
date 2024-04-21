const { trimStr } = require("./utils")

let users = []

const findUser = (user) => {
    const userN = trimStr(user.username)
    const userRoom = trimStr(user.room)

    return users.find(
        (u) => trimStr(u.username) === userN && trimStr(u.room) === userRoom
    )
}


const addUser = (user) => {

    const isExist = findUser(user)

    !isExist && users.push(user)

    const currentUser = isExist || user

    return {
        isExist: !!isExist, 
        user: currentUser
    }
}

const getRoomUsers = (room)=>{
    return users.filter((u) => u.room === room)
}

const removeUser = (user) => {
    const foundUser = findUser(user)
    if(foundUser){
        users = users.filter(
            ({room, username}) => room === foundUser.room && username !== foundUser.username
        )
    }
    return foundUser
}

module.exports = { addUser, findUser, getRoomUsers, removeUser }