import AppRoutes from "./routes";
import styles from "./app.module.scss";
import Spinner from "./components/Spinner";

function App() {
    return (
        <div className={styles.app}>
            <Spinner />
            <AppRoutes />
        </div>
    );
}

export default App;
