import { useEffect } from "react";
import "./App.css";
import MainRoutes from "./Routes";

function App() {
  useEffect(() => {
    window.localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  return (
    <div className="App">
      <MainRoutes />
    </div>
  );
}

export default App;
