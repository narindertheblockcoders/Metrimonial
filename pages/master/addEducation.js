import React from 'react'
import AddEducation from '../../Component/Master/AddEducation'
import {getSession} from "next-auth/react";

const addEducation = () => {
  return (
    <div>
        <AddEducation/>
    </div>
  )
}

export default addEducation

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