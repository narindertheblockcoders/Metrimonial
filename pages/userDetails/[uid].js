import React from 'react'
import UserDetails from '../../Component/Users/UserDetails'
import {getSession} from "next-auth/react"

const userDetails = (props) => {
  return (
    <div>
        <UserDetails props={props}/>
    </div>
  )
}

export default userDetails;

export async function getServerSideProps(context){
  const session = await getSession(context)
    const {params} = await context;
    console.log(context);
    console.log(params);
    const id = await params.uid;
    console.log("first")
    console.log(id,"to check whether the id is coming or not")

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
        props :{
            id:id
        }
    }

}