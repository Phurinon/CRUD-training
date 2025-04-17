const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send("No Token");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).send("Token format is incorrect");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded จะมี user ข้อมูลที่คุณ sign ไว้
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Invalid Token!!!");
  }
};

const adminCheck = async (req, res, next) => {
  try {
    const email = req.user.email;
    const adminUser = await User.findOne({
      where: { email: email },
    });
    if (!adminUser || adminUser.isAdmin !== 1) {
      return res.status(403).json({ message: "Acess Denied: Admin Only" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking admin role" });
  }
};

module.exports = { auth, adminCheck };
