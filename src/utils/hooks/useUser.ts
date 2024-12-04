import { selectAuthStateUsername } from "@/modules/auth/selector";
import { ROUTES } from "@/routes";
import { CookiesService } from "@/services/cookies.service";
import { JWTPayload } from "@/types/IJWT";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Decode JWT
 * @returns JWTPayload | null
 */
export const decodeJWT = (): JWTPayload | null => {
  const token = CookiesService.get();
  try {
    if (!token) {
      return null;
    }

    const decodeToken = jwtDecode<JWTPayload>(token);
    return decodeToken;
  } catch (error) {
    console.error(error);
  }
  return null;
};
//---------------End------------------//

/**
 * Verify user in redux
 * Redirect to login page if username is not found in redux
 */
export const useVerifyUserInRedux = () => {
  const username = useSelector(selectAuthStateUsername);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === null) {
      navigate(`${ROUTES.LOGIN}`);
    }
  }, [username, navigate]);
};
//---------------End------------------//

/**
 * Verify user in cookies
 * Redirect to login page if user is not logged in
 */
export const useVerifyUserInCookies = () => {
  const navigate = useNavigate();
  const token = CookiesService.get();
  const jwtStudent = decodeJWT()?.role === "student";
  const jwtInstructor = decodeJWT()?.role === "instructor";
  const localPathInstructorSignUp =
    location.pathname === "/student/instructor-signup";

  useEffect(() => {
    if (token) {
      if ((localPathInstructorSignUp && jwtStudent) || jwtInstructor) {
        return;
      }
      navigate("/");
    } else {
      if (localPathInstructorSignUp) {
        navigate(`${ROUTES.LOGIN}`);
      }
    }
  }, [navigate]);
};
//---------------End------------------//

/**
 * Verify role of instructor
 */
export const useVerifyRoleInstructor = () => {
  const user = decodeJWT();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "instructor") {
      navigate("/");
    }
  }, [navigate]);
};
//---------------End------------------//

/**
 * Verify role of admin
 */
export const useVerifyRoleAdmin = () => {
  const user = decodeJWT();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);
};
//---------------End------------------//

/**
 * Verify user in cookies
 * Redirect to login page if user is not logged in
 * exmple: logout profile
 */
export const useVerifyUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = CookiesService.get();
    if (!token) {
      navigate(`${ROUTES.LOGIN}`);
    }
  }, []);
}
//---------------End------------------//