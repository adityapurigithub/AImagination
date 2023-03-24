import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Nav, Loader } from "./components";
function App() {
  return (
    <div className="App min-w-screen min-h-screen">
      <Nav />
      {/* imp...min-h-[calc(100vh-73px)]...here i am subtarcting the 73 px ie height of navbar from
      100vh */}
      <main className="w-full min-h-[calc(100vh-73px)] bg-[#f9fafe] sm:p-8 px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
