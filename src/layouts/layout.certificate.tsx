import Footer from "@/components/templates/Footer/Footer";
import HeaderQuiz from "@/components/templates/Header/headerQuiz";
import "@/layouts/styles/layout.main.scss";

const LayoutCertificate = ({ Component }: any) => {
  return (
    <div className="layout-main">
      <div className="header">
        <HeaderQuiz />
      </div>

      <div className="main-content" >
        <div className="content" style={{ width: `100%` }}>
          <div className="component">
            <Component />
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutCertificate;
