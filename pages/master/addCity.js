import React from 'react'
import AddCity from '../../Component/Master/AddCity'
import {getSession} from "next-auth/react";

const addCity = () => {
  return (
    <div>
        <AddCity/>
    </div>
  )
}

export default addCity

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