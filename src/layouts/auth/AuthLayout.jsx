import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
      <div style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", minWidth: 320 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;