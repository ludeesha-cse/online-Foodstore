import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
  const token = req.headers.access_token as string;
 
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).send("Access denied");
  }

  try {
    const decodeUser = verify(token, process.env.JWT_SECRET!);
    req.user = decodeUser;
    //console.log(decodeUser);
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED).send("Invalid token");
  }

  return next();
};
