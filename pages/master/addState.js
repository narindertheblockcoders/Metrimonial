import React from 'react'
import State from '../../Component/Master/AddState'
import {getSession} from "next-auth/react";

const state = () => {
  return (
    <div>
        <State/>
    </div>
  )
}

export default state

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }
  return {
    props:{
      session
    }
  }
}