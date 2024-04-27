import { Navigate, useLocation } from "react-router-dom";
import { auth } from "@/firebase";

function NonPrivateRoute({ children }: { children: React.ReactNode }) {
  const user = auth.currentUser;
  const location = useLocation();
  console.log("user", user);
  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}

export default NonPrivateRoute;
