import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAccount } from "wagmi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import CityZeroPage from "./pages/CityZeroPage";
import NFTDetailPage from "./pages/NFTDetailPage";


import CityZeroStadiumPage from "./pages/CityZeroStadiumPage";
import CityZeroTaskDetailPage from "./pages/CityZeroTaskDetails/CityZeroTaskDetailPage";

function App() {
  const { address, isConnected } = useAccount();
  const addressString = address || "";

  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isConnected={isConnected}
                  address={addressString}
                />
              }
            />
            <Route path="/city-zero" element={<CityZeroPage />} />
            <Route path="/city-zero/stadium" element={<CityZeroStadiumPage />} />
            <Route path="/city-zero/task-detail" element={<CityZeroTaskDetailPage />} />
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
