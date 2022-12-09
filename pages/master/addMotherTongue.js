import React from 'react'
import AddMotherTongue from '../../Component/Master/AddMotherTongue'
import {getSession} from "next-auth/react";

const addCountry = () => {
  return (
    <div>
        <AddMotherTongue/>
    </div>
  )
}

export default addCountry

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