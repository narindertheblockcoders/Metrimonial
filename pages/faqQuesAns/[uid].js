import React from 'react'
import {getSession} from "next-auth/react"
import FaqQuesAns from '../../Component/FAQ/FaqQuesAns';

const userDetails = (props) => {
  return (
    <div>
    <FaqQuesAns props={props}/>
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
            id,session
        }
    }

}