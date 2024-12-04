import { useState } from 'react';
import './index.scss'
import { IoAddSharp } from "react-icons/io5";
import ModalAddCategory from '../ModalAddCategory';
import { useDispatch } from 'react-redux';

const AddCategory: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleCategoryCreated = (categoryName: string) => {
        dispatch({ type: "createCategory", payload: { categoryName } });
        closeModal();
      };
    return (
        <>  
            <button className='btn-add-category' onClick={openModal}>
                <label className='icon-add-label'>
                    {<IoAddSharp className='icon-add' />}
                </label>
                Add Category
            </button>
            <ModalAddCategory show={isModalOpen} onClose={closeModal} onCategoryCreated={handleCategoryCreated} />
        </>
    )
}

export default AddCategory
