import { createContext, useState, ReactNode } from "react";
import PendingPage from "@/view/fragmentPages/pendingPage";
import DialogLayout from "@/layouts/dialogLayout";

export const ModalContext = createContext<{
  modal: string;
  setModal: (modal: string) => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (modal: string) => {
    setModal(modal);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModal("");
    setIsOpen(false);
  };

  let ModalComponent;
  switch (modal) {
    case "PendingPage":
      console.log("PendingPage");
      ModalComponent = <PendingPage />;
      break;
    // Add more cases as needed
    default:
      ModalComponent = null;
  }

  return (
    <ModalContext.Provider
      value={{ modal, setModal, openModal, closeModal, isOpen, setIsOpen }}
    >
      {children}
      {isOpen && (
        <DialogLayout Header="다이얼로그" type="confirm">
          {ModalComponent}
        </DialogLayout>
      )}
    </ModalContext.Provider>
  );
};
