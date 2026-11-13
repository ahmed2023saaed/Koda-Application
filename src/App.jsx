
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Login from '../src/features/auth/pages/LoginPage'
// import Dashboard from '../src/features/dashboard/pages/DashboardPage'
// import ProtectedRoute from '../src/features/auth/components/ProtectedRoute'
// import UsersPage from '../src/features/users/pages/UsersPage'
// import UserForm from "../src/features/users/components/UserForm"

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route
//   path="/users"
//   element={
//     <ProtectedRoute>
//       <UsersPage />
//     </ProtectedRoute>
//   }
// />
//       <Route path="/users" element={<UsersPage />} />
//        <Route path="/UserForm" element={<UserForm />} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   )
// }



// import { Router } from "@/routes";
// import "./App.css";

// function App() {
//   return <Router />;
// }

// export default App;


import { Router } from "@/routes";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <Router />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

