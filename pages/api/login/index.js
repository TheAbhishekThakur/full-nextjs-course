import cookie from "cookie";
import dbConnect from "../../../util/mongo";
import User from "../../../models/User";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    const { email, password } = req.body;
    try {
      const data = await User.find({ email: email });
      const user = data[0];
      if (!user) {
        res.status(404).json({ success: false, message: "User not found!" });
      }
      if (email === user.email && password === user.password) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", user.token, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json(user);
      } else {
        res
          .status(500)
          .json({ success: false, message: "Invalid username and password" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
