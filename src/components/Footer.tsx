import { useMemo } from "react";
import { useLanguage } from "../context/useLanguage";
import "./Footer.css";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Ninja-Labs-CN",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.39 7.866 10.914.575.105.785-.25.785-.554 0-.273-.01-1.154-.015-2.096-3.2.696-3.878-1.372-3.878-1.372-.524-1.332-1.279-1.688-1.279-1.688-1.046-.716.079-.701.079-.701 1.157.082 1.767 1.188 1.767 1.188 1.03 1.765 2.703 1.255 3.361.96.105-.747.404-1.255.735-1.543-2.554-.291-5.238-1.277-5.238-5.682 0-1.255.449-2.281 1.185-3.086-.118-.291-.513-1.462.112-3.05 0 0 .965-.309 3.165 1.179.917-.255 1.901-.383 2.879-.388.978.005 1.962.133 2.88.388 2.199-1.488 3.163-1.179 3.163-1.179.627 1.588.232 2.759.114 3.05.737.805 1.184 1.831 1.184 3.086 0 4.415-2.69 5.387-5.254 5.673.416.358.786 1.068.786 2.153 0 1.555-.014 2.809-.014 3.191 0 .307.207.664.792.552C20.213 21.386 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/ninjalabscn",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M16.54 3.5h4.07l-8.9 10.2 10.47 13.3H17.2l-6.52-8.46-7.45 8.46H-.84l9.53-10.83L-.33 3.5H6.9l6 7.92L16.54 3.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const footerColumnsMap: Record<"zh" | "en", FooterColumn[]> = {
  zh: [
    {
      title: "协议",
      links: [
        { label: "Injective", href: "https://injective.com" },
        { label: "GitHub", href: "https://github.com/Ninja-Labs-CN" },
        { label: "Twitter", href: "https://x.com/ninjalabscn" },
      ],
    },
  ],
  en: [
    {
      title: "Protocols",
      links: [
        { label: "Injective", href: "https://injective.com" },
        { label: "GitHub", href: "https://github.com/Ninja-Labs-CN" },
        { label: "Twitter", href: "https://x.com/ninjalabscn" },
      ],
    },
  ],
};

function Footer() {
  const { language } = useLanguage();
  const footerColumns = useMemo(() => footerColumnsMap[language], [language]);
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-social">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="footer-columns">
          {footerColumns.map((column) => (
            <div key={column.title} className="footer-column">
              <p className="footer-column-title">{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
