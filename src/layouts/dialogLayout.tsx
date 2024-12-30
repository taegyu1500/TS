import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/context/ModalContext";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function DialogLayout({
  children,
  Header,
  type,
}: {
  children: React.ReactNode;
  Header: string;
  type: "confirm" | "alert";
}) {
  const dialog = useContext(ModalContext);

  if (!dialog) {
    throw new Error("DialogLayout must be used within a ModalContext");
  }

  const { isOpen, closeModal } = dialog;

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent>
        <DialogHeader />
        <DialogTitle>{Header}</DialogTitle>
        {children}

        {type === "confirm" ? (
          <DialogFooter>
            <Button onClick={() => closeModal()}>Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        ) : (
          <DialogFooter>
            <Button onClick={() => closeModal()}>OK</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
