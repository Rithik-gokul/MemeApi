import {createRoot} from "react-dom/client";
import React from 'react'
import App from "./App.js";
import "./index.css";

function Page() {
  return (
    <div>
        <App />
    </div>
  )
}


const root = createRoot(document.getElementById("root"));
root.render(<Page />);