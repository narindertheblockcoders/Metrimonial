import React from 'react'
import Login from '../Component/Login/Login'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const login = () => {
  return (
    <div>
      <Head>
      <title>Login</title>
      </Head>
      
        <Login/>
    </div>
  )
}
export default login