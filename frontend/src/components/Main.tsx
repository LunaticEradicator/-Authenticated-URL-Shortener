import "../sass/components/main.scss";
import { Outlet } from "react-router-dom";

// Where Corresponding Screen of the page are viewed [React-Router]
export default function Main() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
