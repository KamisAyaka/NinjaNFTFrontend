import { Link } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";

function MintErrorPage() {
    const { language } = useLanguage();
    const translate = (zh: string, en: string) =>
        language === "zh" ? zh : en;

    return (
        <div className="page-wrapper section">
            <div className="container text-center">
                <h1 className="title title-xl mb-md">
                    {translate("铸造错误", "Mint Error")}
                </h1>
                <p className="text-secondary mb-lg">
                    {translate(
                        "当前无法在此页面进行铸造，请稍后再试。",
                        "Minting is currently unavailable. Please try again later."
                    )}
                </p>
                <Link to="/" className="btn btn-primary">
                    {translate("返回首页", "Back to Home")}
                </Link>
            </div>
        </div>
    );
}

export default MintErrorPage;
