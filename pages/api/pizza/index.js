import dbConnect from "../../../util/mongo";
import Pizza from "../../../models/Pizza";

export default async function handler(req, res) {
  const { method, cookies } = req;
  dbConnect();
  const token = cookies.token;

  if (req.query && req.query.search) {
    const searchQuery = req.query.search;
    let regex = new RegExp(searchQuery, "i");
    try {
      const list = await Pizza.find({ title: regex });
      if (!list) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      res.status(200).json({ success: true, data: list });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    if (method === "GET") {
      try {
        const list = await Pizza.find();
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
