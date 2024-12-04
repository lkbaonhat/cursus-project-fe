
import { setLengthCart } from "@/modules/global/slice";
import { ROUTES } from "@/routes";
import { CookiesService } from "@/services/cookies.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Get cart items
     * @returns Cart items
     */
    const getCartItems = () => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    //----------------------End---------------------//


    /**
     * Add course to cart
     * @param course 
     * @returns 
     */
    const addToCart = (course: MODEL.CART) => {
        const token = CookiesService.get();
        if (!token) {
            toast.error('Please login to add course to cart');
            navigate(`${ROUTES.LOGIN}`);
            return;
        }

        const cartItems = getCartItems();

        const existingItem = cartItems.find((item: any) => item._id === course._id);
        if (existingItem) {
            toast.error('This course is already in your cart');

        } else {
            cartItems.push(course);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            dispatch(setLengthCart(cartItems.length));
            toast.success('Course added to cart');
        }
    }
    //----------------------End---------------------//


    /**
     * Remove a course from cart
     * @param courseId 
     */
    const removeFromCart = (courseId: string) => {
        const storedCartItems = localStorage.getItem('cartItems');
        let cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

        const updatedCartItems = cartItems.filter((item: any) => item._id !== courseId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
    //----------------------End---------------------//


    /**
     * Remove all courses from cart
     */
    const removeAllFromCart = () => {
        localStorage.removeItem('cartItems');
    }
    //----------------------End---------------------//

    return { addToCart, removeFromCart, getCartItems, removeAllFromCart };
}
