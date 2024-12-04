import "./index.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonAuth } from "@/containers/Auth/components";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectStateCategory } from "@/modules/global/selector";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useNavigate } from "react-router-dom";

// Define the form data structure
interface FormData {
  userId: string;
  categoryId: string;
  description: string;
}

const InstructorSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * React hook form
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch({ type: 'becomeInstructor', payload: data, navigate });
  };
  //---------------------End---------------------//


  /**
   * Get category from redux
   */
  const categories = useSelector(selectStateCategory);
  useEffect(() => {
    dispatch({ type: 'setCategory' });
  }, []);
  //---------------------End---------------------//


  /**
   * Get userId from token
   */
  const userId = decodeJWT()?.sub;
  //---------------------End---------------------//

  return (
    <div className="signup-page">
      <form className="form-signup container" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">
          <p>Instructor Sign Up</p>
          <p>Sign up and create course!</p>
        </div>

        <div className="form-signup__input">
          <div className="group-select">
            <div className="group-input-select">
              <div className="select-container">
                <input type="hidden" {...register("userId", { required: "UserId is not empsty" })} value={userId} />

                <select
                  className="form-control"
                  {...register("categoryId", {
                    required: "Please select a category",
                  })}
                >
                  <option value="">-----------------------------------------Select Category-----------------------------------------</option>
                  {categories?.map((category: any, index: number) => (
                    <option value={category._id} key={index}>{category.name}</option>
                  ))}
                </select>
                <IoMdArrowDropdown size={20} className="icon" />
              </div>
            </div>
            {errors.categoryId && (
              <span className="error">{errors.categoryId.message}</span>
            )}
          </div>

          <div className="group">
            <div
              className={`group-input input__description ${errors.description ? "input-error" : ""
                }`}
            >
              <textarea
                placeholder="Write a little description about you..."
                {...register("description", {
                  required: "Please provide a description"
                })}
              />
            </div>
            {errors.description && (
              <span className="error-d">{errors.description.message}</span>
            )}
          </div>
        </div>

        <div className="para">
          <p>Your biography should have at least 12000 characters</p>
        </div>

        <div className="action-button">
          <ButtonAuth onClick={handleSubmit(onSubmit)}>
            Instructor Sign Up Now
          </ButtonAuth>
        </div>
      </form>
    </div>
  );
};

export default InstructorSignUp;
