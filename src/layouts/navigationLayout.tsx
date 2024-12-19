import { Button } from "@/components/ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ModalContext } from "@/context/ModalContext";

export default function NavigationLayout() {
  const Navigate = useNavigate();
  const context = useContext(ModalContext);
  const location = useLocation();
  const openModal = () => {
    if (!context)
      throw new Error("useModal must be used within a ModalProvider");
    console.log("openModal");
    context.openModal("PendingPage", "alert");
  };
  return <nav className="bg-white border-b"></nav>;
}

// Path: src/layouts/navigationLayout.tsx
