import React from 'react'
import AddProfession from '../../Component/Master/AddProfession'
import {getSession} from "next-auth/react";

const addProfession = () => {
  return (
    <div>
        <AddProfession/>
    </div>
  )
}

export default addProfession

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