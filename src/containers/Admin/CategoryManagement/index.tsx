import { BiCategoryAlt } from "react-icons/bi";
import CategoryManageTable from "./components/CategoryManageTable";
import './index.scss'
import AddCategory from "./components/AddCategory";
import { useEffect } from "react";
import AddSubcategory from "./components/AddSubcategory";
import { useDispatch, useSelector } from "react-redux";
import { selectStateCategory } from "@/modules/global/selector";
const CategoryManagement = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectStateCategory) || [];
    useEffect(() => {
        dispatch({ type: "fetchCategories" });
    }, [dispatch]);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='am-title-category'>
                        <i className='icon-management-category'>
                            <BiCategoryAlt className='icon-category' />
                        </i>
                        Catagory Management
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="add-category">
                        <AddCategory />
                        <AddSubcategory categories={categories} />
                    </div>
                    <div className='am-table-category'>
                        <CategoryManageTable categories={categories} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryManagement
