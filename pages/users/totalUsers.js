import React from 'react'
import TotalUsers from '../../Component/Users/TotalUsers'
import {getSession} from "next-auth/react";

const totalusers = () => {
  return (
    <div>
        <TotalUsers/>
    </div>
  )
}

export default totalusers;

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