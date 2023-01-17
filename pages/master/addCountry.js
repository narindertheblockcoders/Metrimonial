import React from 'react'
import AddCountry from '../../Component/Master/AddCountry'
import {getSession} from "next-auth/react";

const addCountry = () => {
  return (
    <div>
        <AddCountry/>
    </div>
  )
}

export default addCountry

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }