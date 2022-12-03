import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  //const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const { token } = req.body;
      console.log(token, "to send token to get state data");
      var config = {
        method: "post",
        url: "http://3.223.152.95:3000/api/v1/member/getalluser",
        headers: {
          Authorization: `Bearer ${token} `,
        },
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
