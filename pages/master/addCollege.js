import React from 'react'
import AddCollege from '../../Component/Master/AddCollege'
import {getSession} from "next-auth/react";

const addCollege = () => {
  return (
    <div>
        <AddCollege/>
    </div>
  )
}

export default addCollege

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