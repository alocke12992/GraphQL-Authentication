const jwt = require("jsonwebtoken");
const APP_SECRET = "My_super_duper_secret";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "")
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error("Not Authenticated")
}

module.exports = {
  APP_SECRET,
  getUserId,
}