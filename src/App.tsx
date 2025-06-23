import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import AddBookPage from "./pages/AddBookPage/AddBookPage";
import UpdateBookPage from "./pages/UpdateBookPage/UpdateBookPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route path="/library" element={<LibraryPage/>}/>
                <Route path="/addbook" element={<AddBookPage/>}/>
                <Route path="/updatebook/:bookId" element={<UpdateBookPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
