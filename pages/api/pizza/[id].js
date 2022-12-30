import dbConnect from "../../../util/mongo";
import Pizza from "../../../models/Pizza";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  dbConnect();
  const token = cookies.token;

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
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
    try {
      const pizza = await Pizza.findByIdAndUpdate(id, req.body, {
        new: true,
      });
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
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
    try {
      const data = await Pizza.findByIdAndDelete(id);
      if (data) {
        res.status(200).json({ success: true, data });
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
