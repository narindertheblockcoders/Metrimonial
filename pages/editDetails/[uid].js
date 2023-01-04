import React from 'react'
import UserDetailsEdit from '../../Component/Users/UserDetailsEdit'
import {getSession} from "next-auth/react"

const userDetails = (props) => {
  return (
    <div>
        <UserDetailsEdit props={props}/>
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


    console.log(session?.user,"to see the token value")
    let token = session?.user

    return {
        props :{
            id,token
        }
    }

}