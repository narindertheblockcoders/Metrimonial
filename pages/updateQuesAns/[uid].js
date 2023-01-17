import React from 'react'
import {getSession} from "next-auth/react"
import UpdateQuesAns from '../../Component/FAQ/UpdateQuesAns';


const updateQuesAns = (props) => {
  return (
    <div>
     <UpdateQuesAns props={props} />
    </div>
  )
}

export default updateQuesAns;

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