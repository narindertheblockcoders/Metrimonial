import React from 'react'
import AddSocialMedia from '../../Component/Master/AddSocialMedia'
import {getSession} from "next-auth/react";

const addSocialMedia = () => {
  return (
    <div>
        <AddSocialMedia/>
    </div>
  )
}

export default addSocialMedia

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