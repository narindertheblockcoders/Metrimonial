import React from 'react'
import {getSession} from "next-auth/react"
import AddQuesAns from '../../Component/FAQ/AddQuesAns'

const addQuesAns = (props) => {
  return (
    <div>
    <AddQuesAns/>
    </div>
  )
}

export default addQuesAns;

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