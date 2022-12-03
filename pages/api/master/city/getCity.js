import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  //const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const stateId = req.body;
      console.log(stateId,"country Id to send to get states api")
      const { token } = req.body;
      console.log(token, "to send token to get state data");
      var config = {
        method: "post",
        url: "http://3.223.152.95:3000/api/v1/admin/getcity",
        headers: {
          Authorization: `Bearer ${token} `,
        },data:stateId
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
