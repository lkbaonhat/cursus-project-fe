import Title from "@/components/atoms/Title/ShoppingCart";
import Bill from "@/components/atoms/Bill/Bill";
import CourseCards from "@/components/atoms/CardItem/CardItem";
import { useEffect, useState } from "react";
import "./ShoppingCartPage.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";

const ShoppingCartPage = () => {


  /**
   * Get cart items from local storage
  */
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    setCartItems(storedCartItems);
  }, []);
  //-------------------------------------End--------------------------------------------//

  window.scrollTo(0, 0);
  return (
    <div className="shopping-cart container mt-4" style={{}}>
      <Title />
      <div className="d-flex">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="no-cart">
              <img src="https://www.buy.airoxi.com/img/empty-cart-1.png" alt="" />
              <Link to={ROUTES.HOME}>Continue shopping</Link>
            </div>
          ) : (
            <div className="row my-4">
              <div className="col-lg-8 col-md-6">
                {cartItems.map((item: any, index: number) => (
                  <CourseCards
                    key={index}
                    _id={item._id}
                    title={item.title}
                    subCategory={item.subCategory}
                    author={item.author}
                    price={item.price.toLocaleString()}
                    imageUrl={item.image}
                    slug={item.slug}
                    setCartItems={setCartItems}
                  />
                ))}
              </div>
              <div className="col-lg-4 col-md-6">
                <Bill />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* )} */}
    </div >
  );
};
export default ShoppingCartPage;
