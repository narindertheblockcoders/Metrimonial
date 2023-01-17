import React from 'react'
import {getSession} from "next-auth/react";
import FAQ from '../../Component/FAQ/Faq';

const faq = () => {
  return (
    <div>
        <FAQ/>
    </div>
  )
}

export default faq;

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