import React from 'react'
import AddCoupleDescription from '../../Component/Master/AddCoupleDescription'
import {getSession} from "next-auth/react";

const addCoupleDescription = (props) => {
  return (
    <div>
        <AddCoupleDescription props={props}/>
    </div>
  )
}

export default addCoupleDescription

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

    console.log(session.user)
    let token = session.user;

    return {
      props:{
        token
      }
    }
  }