import { Outlet } from "react-router-dom";

export default function OutletLayout() {
  return (
    <div className="flex-grow bg-slate-50 p-5 border-2">
      <Outlet />
    </div>
  );
}
