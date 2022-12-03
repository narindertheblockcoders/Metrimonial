import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data, "data to send to api");

      let response = await axios.post(
        "http://3.223.152.95:3000/api/v1/auth/adminlogin",
        data
      );
      const reference = response.data;
      console.log(reference, "string");
      res.status(200).json({ data: reference });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
