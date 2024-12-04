import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useSelector } from "react-redux";
import { selectIntructerProfile } from "@/modules/global/selector";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useState, useEffect } from "react";

export type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const location = useLocation();
  const decodeUser = decodeJWT();
  const roleFromToken = decodeUser?.role;
  const user = useSelector(selectIntructerProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return "";
  }

  const effectiveRole = user?.role || roleFromToken;

  return allowedRoles.includes(effectiveRole ?? "") ? (
    <Outlet />
  ) : effectiveRole ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

export default RequireAuth;
