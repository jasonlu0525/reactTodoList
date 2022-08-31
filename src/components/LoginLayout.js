import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      LoginLayout
      <main>
        <Outlet />
      </main>

    </>
  )
}

export default Layout