import { Navigate, useLocation } from "react-router-dom";
import { auth } from "@/firebase";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = auth.currentUser;
  const location = useLocation();

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;
