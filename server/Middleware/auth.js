const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    // ดึง token จาก header "Authorization"
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("No Token");
    }

    // แยก Bearer ออก
    const tokenWithoutBearer = token.split(" ")[1];

    if (!tokenWithoutBearer) {
      return res.status(401).send("Token format is incorrect");
    }

    // ยืนยัน token
    const decoded = jwt.verify(tokenWithoutBearer, "jwtsecret");
    req.user = decoded.user; // บันทึกข้อมูลผู้ใช้ที่ยืนยันแล้ว
    next(); // ให้ไปยัง middleware ถัดไป
  } catch (err) {
    console.log(err);
    res.status(500).send("Invalid Token!!!"); // ส่งข้อความข้อผิดพลาดกรณี token ไม่ถูกต้อง
  }
};
