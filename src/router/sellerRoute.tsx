import { Navigate, useLocation } from "react-router-dom";
import { checkUserSeller } from "@/util/firebaseFunctions";
import { useEffect, useState } from "react";

function SellerRoute({ children }: { children: React.ReactNode }) {
  const [seller, setSeller] = useState<boolean>(false);
  useEffect(() => {
    checkUserSeller().then((data) => {
      setSeller(data);
    });
  }, []);
  const location = useLocation();
  if (seller) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}

export default SellerRoute;
