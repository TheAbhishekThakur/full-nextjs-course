import dbConnect from "../../../util/mongo";
import Pizza from "../../../models/Pizza";

export default async function handler(req, res) {
  const { method, cookies } = req;
  dbConnect();
  const token = cookies.token;

  if (method === "GET") {
    try {
      const list = await Pizza.find();
      console.log("list", list);
      if (!list) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      res.status(200).json({ success: true, data: list });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
    try {
      const pizza = await Pizza.create(req.body);
      if (pizza) {
        res.status(201).json({ success: true, data: pizza });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
