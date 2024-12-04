import { JwtPayload } from "jwt-decode";

interface JWTPayload extends JwtPayload {
    fullname: string;
    email: string;
    role: string;
    image: string;
}