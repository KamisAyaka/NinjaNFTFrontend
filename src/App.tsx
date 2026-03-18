import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import CityZeroPage from "./pages/CityZeroPage";
import NFTDetailPage from "./pages/NFTDetailPage";
import CityZeroStadiumPage from "./pages/CityZeroStadiumPage";
import TaskBoardDetailPage from "./pages/CityZeroTaskDetails/TaskBoardDetailPage";
import JobBoardDetailPage from "./pages/CityZeroTaskDetails/JobBoardDetailPage";
import GrantsHubDetailPage from "./pages/CityZeroTaskDetails/GrantsHubDetailPage";
import AiProjectDetailPage from "./pages/AiProjectDetails/AiProjectDetailPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city-zero" element={<CityZeroPage />} />
            <Route path="/city-zero/stadium" element={<CityZeroStadiumPage />} />
            <Route path="/city-zero/task-board" element={<TaskBoardDetailPage />} />
            <Route path="/city-zero/job-board" element={<JobBoardDetailPage />} />
            <Route path="/city-zero/grants-hub" element={<GrantsHubDetailPage />} />
            <Route path="/ai-project/:owner/:repo" element={<AiProjectDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/nft/:id" element={<NFTDetailPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
