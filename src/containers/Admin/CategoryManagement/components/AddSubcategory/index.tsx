import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import ModalAddSubcategory from "../ModalAddSubcategory";
import './index.scss'
import { useDispatch } from "react-redux";
interface AddSubcategoryProps {
    categories: MODEL.CATEGORY[];
}
const AddSubcategory: React.FC<AddSubcategoryProps> = ({ categories }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubcategoryCreated = (categoryId: string, subcategories: string[]) => {
        dispatch({ type: "createSubcategory", payload: { categoryId, subcategories } });
        closeModal();
    };
    return (
        <>
            <button className='btn-add-subcategory' onClick={openModal}>
                <label className='icon-add-label'>
                    <IoAddSharp className='icon-add' />
                </label>
                Add Subcategory
            </button>
            <ModalAddSubcategory
                show={isModalOpen}
                onClose={closeModal}
                categories={categories}
                onSubcategoryCreated={handleSubcategoryCreated}
            />
        </>
    )
}

export default AddSubcategory
