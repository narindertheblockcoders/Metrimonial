import React from 'react'
import Dashboard from '../../Component/Dashboard/Dashboard'
import {getSession} from 'next-auth/react'

const dashboard = () => {
  return (
    <div>

        <Dashboard/>
    </div>
  )
}

export default dashboard

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