import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ShowProduct from "./ShowProduct";

export default function PublicMain() {
  const Navigate = useNavigate();

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to the public main page!</h1>
        <button
          onClick={() => {
            Navigate("/login");
          }}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
        >
          Go to login page
        </button>
        <ShowProduct />
      </div>
    </Fragment>
  );
}
