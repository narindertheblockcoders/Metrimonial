import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    // maxAge: 5500,
  },
  providers: [
    CredentialsProviders({
      name: "Custom Provider",
      async authorize(credentials) {
        let { email, password } = credentials;
        console.log(credentials);
        let data = { email: email, password: password };
        console.log(data, "form email and password");
        let response = await axios.post(
          "http://3.223.152.95:3000/api/v1/auth/adminlogin",
          data
        );
        let user = response.data;
        let token = response.data.data;
        console.log(response);
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
