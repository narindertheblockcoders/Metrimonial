import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const Quesdata = req.body;
      console.log(Quesdata,"data to update ques and ans")
      var config = {
        method: "post",
        url: "https://api.orthomatri.com/api/v1/admin/addquestion",
        headers: {
          Authorization: `Bearer ${session?.user?.name} `,
        },data:Quesdata
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data});
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
