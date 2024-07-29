import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import { RecoilRoot } from "recoil";


function App() {
    return (
        <div >
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/signup" element={<SignupPage />}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route
                            path="/dashboard"
                            element={<DashboardPage />}
                        ></Route>
                        <Route path="/error" element={<ErrorPage />}></Route>
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
}
export default App;
