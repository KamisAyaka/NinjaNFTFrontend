import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLanguage } from "../context/useLanguage";
import type { Language } from "../context/LanguageContext";
import "./Header.css";

function Header() {
  const location = useLocation();
  const {
    language,
    setLanguage,
    supportedLanguages,
    translations,
  } = useLanguage();
  const navItems = translations.header.navItems;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setIsDropdownOpen(false);
  };

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
          <div className="language-switcher" ref={dropdownRef}>
            <button
              type="button"
              className="language-toggle"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <span className="language-toggle-label">
                {translations.header.languageSwitcherLabel}
              </span>
              <span className="language-toggle-icon">
                {isDropdownOpen ? "▲" : "▼"}
              </span>
            </button>
            {isDropdownOpen && (
              <div className="language-dropdown">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`language-option ${
                      language === lang.code ? "active" : ""
                    }`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
