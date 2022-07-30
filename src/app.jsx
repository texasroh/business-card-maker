import { BrowserRouter, Routes } from "react-router-dom";
import styles from "./app.module.css";
import Login from "./components/login/login";

function App({ authService }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
      <Login authService={authService} />
    </div>
  );
}

export default App;
