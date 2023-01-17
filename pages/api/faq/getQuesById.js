import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const id = req.body;
      console.log(id,"data to get ques and ans")
      var config = {
        method: "post",
        url: "https://api.orthomatri.com/api/v1/admin/getfaqQuestionbyid",
        headers: {
          Authorization: `Bearer ${session?.user?.name} `,
        },data:id
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
