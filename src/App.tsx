import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAccount } from "wagmi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import MyNFTsPage from "./pages/MyNFTsPage";
import NFTDetailPage from "./pages/NFTDetailPage";

import MintErrorPage from "./pages/MintErrorPage";

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
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/nft/:id" element={<NFTDetailPage />} />
            <Route
              path="/my-nfts"
              element={
                <MyNFTsPage address={addressString} isConnected={isConnected} />
              }
            />
            <Route path="/mint-error" element={<MintErrorPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
