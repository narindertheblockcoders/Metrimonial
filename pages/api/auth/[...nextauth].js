import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default NextAuth({
  session: {
    strategy: "jwt",
    // maxAge: 1000,
  },
  providers: [
    CredentialsProviders({
      name: "Custom Provider",
      async authorize(credentials) {
        let { email, password, fa } = credentials;
        console.log(credentials, "hyy ehguyqd")
        let data = { email: email, password: password };
        console.log(data, "form email and password");
        let response;
        console.log(fa)
        if (fa == "false") {
         
          response = await axios.post(
            "http://52.45.20.15:4000/api/v1/auth/login",
            data
          );
           } else {
          console.log("first", { email, otp: password })
          response = await axios.post(
            "http://52.45.20.15:4000/api/v1/auth/verifyLoginFa", { email, otp: password }
          )
          console.log(response)

          // console.log(err.data.error)
        }

        console.log(response.data, "to get the response from api")
        let user = response.data;
        console.log(user, "to get ther value of the user")
        let token = response.data.data;
        console.log(token, "to get the token")


        if (!token) {
          throw new Error("Invalid token");

        }
        if (!(response.status == 200)) {

          throw new Error("Invalid Credentials" + email);
          
        }
        if (response.status == 200) {
          return (user = {
            name: token,
            email: email,
          });
        }
      },
    }),
  ],
});
