import Footer from "@/components/templates/Footer/Footer";
import HeaderCart from "@/components/templates/Header/headerCart";
import "@/layouts/styles/layout.cart.scss";

const LayoutCart = ({ Component }: any) => {
    return (
        <div className="layout-main">
            <div className="header">
                <HeaderCart />
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

export default LayoutCart;
