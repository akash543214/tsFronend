import Button from "./Button";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  title?: string;
  onClick: () => void;
};

 export default function(modalProps: ModalProps) {

  const { children, title, onClick } = modalProps;

  return createPortal(
    <div
      tabIndex={-1} // Allows the modal to receive focus
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="text-gray-600 mt-2">{children}</div>

        <Button
          onClick={onClick}
          className="absolute top-4 right-4 text-gray-500 border-white hover:text-gray-700 text-2xl"
          variant="outline"
        >
          &times;
        </Button>
      </div>
    </div>,
    document.body
  );
};

