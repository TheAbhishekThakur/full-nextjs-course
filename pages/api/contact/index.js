import dbConnect from "../../../util/mongo";
import Contact from "../../../models/Contact";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    try {
      const data = await Contact.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
