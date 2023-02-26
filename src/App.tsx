import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Resume } from "./component/resume/Resume";
import { Finance } from "./component/finance/Finance";
import { NavMenu } from "./component/resume";

function App() {
  return (
    <div className="App">
      <NavMenu />
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
      {/* <Resume /> */}
    </div>
  );
}

export default App;
