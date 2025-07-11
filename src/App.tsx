import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import AddBookPage from "./pages/AddBookPage/AddBookPage";
import UpdateBookPage from "./pages/UpdateBookPage/UpdateBookPage";
import BookInfoPage from "./pages/BookInfoPage/BookInfoPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route path="/library" element={<LibraryPage/>}/>
                <Route path="/addbook" element={<AddBookPage/>}/>
                <Route path="/updatebook/:bookId" element={<UpdateBookPage/>}/>
                <Route path="/book/:bookId" element={<BookInfoPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
