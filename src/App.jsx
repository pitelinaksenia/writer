import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route path="/library" element={<LibraryPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
