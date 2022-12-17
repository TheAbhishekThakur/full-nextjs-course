import dbConnect from "../../../util/mongo";
import Pizza from "../../../models/Pizza";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  dbConnect();
  if (method === "GET") {
    try {
      const pizza = await Pizza.findById(id);
      console.log("list", pizza);
      if (!pizza) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      res.status(200).json({ success: true, data: pizza });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
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
  if (method === "DELETE") {
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
