import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Language = "en" | "zh";

type HeaderTranslations = {
  navItems: Array<{ path: string; label: string }>;
  languageSwitcherLabel: string;
};

type TranslationDictionary = {
  header: HeaderTranslations;
};

type SupportedLanguage = {
  code: Language;
  label: string;
};

const supportedLanguages: SupportedLanguage[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

const translationMap: Record<Language, TranslationDictionary> = {
  en: {
    header: {
      navItems: [
        { path: "/", label: "Home" },
        { path: "/gallery", label: "Gallery" },
        { path: "/my-nfts", label: "My NFTs" },
      ],
      languageSwitcherLabel: "Language",
    },
  },
  zh: {
    header: {
      navItems: [
        { path: "/", label: "首页" },
        { path: "/gallery", label: "画廊" },
        { path: "/my-nfts", label: "我的 NFT" },
      ],
      languageSwitcherLabel: "语言切换",
    },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  translations: TranslationDictionary;
  supportedLanguages: SupportedLanguage[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      translations: translationMap[language],
      supportedLanguages,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};

export type { Language, TranslationDictionary, SupportedLanguage };
