import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
const userList = useSelector((state) => state.users.user)
const dispatch = useDispatch()
const user = userList
  return (
    <div>Home</div>
  )
}

export default Home