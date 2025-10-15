import React, { useState } from "react";
import Quotation from "./pages/Quotation";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login onLogin={(t) => setToken(t)} />;
  }

  return <Quotation onLogout={() => { localStorage.removeItem("token"); setToken(null); }} />;
}

export default App;
