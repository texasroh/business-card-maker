import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Login from "./components/login/login";

function App({ authService }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login authService={authService} />} />
          <Route exact path="/maker" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
