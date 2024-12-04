import { Button } from "@/containers/Feedback/components/Button";
import "./Promotion.scss";

export default function Promotion() {
  return (
    <>
      <div className="promotion">
        <img src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1730196814/promotion_hyy0ke.svg"  className="image_promotion"/>
        <h4 className="title_promotion">Baby promotion plan is activated!</h4>
        <p className="content_promotion">By activating promotion plans you can improve course views and sales.</p>
        <Button 
          width="180px" 
          border_radius="50px" 
          fontSize="14px" 
          height="40px" 
          padding="0 30px"
          margin="20px 0 0"
        >
          Change New Plan
        </Button>
      </div>
    </>
  )
}
