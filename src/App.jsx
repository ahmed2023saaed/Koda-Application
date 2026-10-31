import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { Router } from "@/routes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;