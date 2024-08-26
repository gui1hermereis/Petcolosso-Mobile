import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getUser } from "../utils";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  return next();
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    //request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}

export default function ensureHasAcess(...permittedRoles) {
  // return a middleware
  return (request, response, next) => {
    const user = getUser(request.headers.authorization);
    if (user.isDev) return next();
    if (permittedRoles.includes(user.role)) return next();
    else return response.status(403).json({ message: "Forbidden" });
  };
}
