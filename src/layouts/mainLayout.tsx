import { Toaster } from "@/components/ui/toaster";

import HeaderLayout from "./headerLayout";
// import NavigationLayout from "./navigationLayout";
import OutletLayout from "./OutletLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { ModalProvider } from "@/context/ModalContext";
import QueryContext from "@/context/QueryContext";
export default function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // You can retrieve the user object here if needed
      }
      // User is signed out
      // Update state here if needed
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // replace with your loading component
  }
  return (
    <div className="w-full mx-auto box-border">
      <Toaster />
      <div className="flex flex-col min-h-screen w-full bg-muted/40 mx-auto">
        {/* <NavigationLayout /> */}
        <QueryContext>
          <ModalProvider>
            <div className="flex flex-col min-h-screen min-w-screen">
              <HeaderLayout />
              <OutletLayout />
            </div>
          </ModalProvider>
        </QueryContext>
      </div>
    </div>
  );
}
