import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "fallback-secret-change-in-production";
const encodedSecret = new TextEncoder().encode(secretKey);

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getUserFromRequest(request: Request): Promise<JWTPayload | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.substring(7);
  return await verifyToken(token);
}
