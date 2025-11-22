import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./Header.css";

function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/gallery", label: "Gallery" },
    { path: "/my-nfts", label: "My NFTs" },
  ];

  const getActiveClass = (item: { path: string }) => {
    return location.pathname === item.path ? "active" : "";
  };

  return (
    <header className="header">
      <div className="header-glow" />
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/NINJ4-Logo-2.svg" alt="N1NJ4" className="logo-symbol" />
        </Link>

        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${getActiveClass(item)}`}
            >
              <span className="nav-link-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-right">
          <div className="header-divider" />
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus="address"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
