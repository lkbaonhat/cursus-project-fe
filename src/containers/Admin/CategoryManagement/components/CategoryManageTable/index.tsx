import TableDynamic, { TableColumn } from "@/components/organisms/Table/TableDynamic";
import './index.scss'
import ModalEditCategory from "../ModalEditCategory";
import { useState } from "react";
interface CategoryManageTableProps {
    categories: MODEL.CATEGORY[];
}
const CategoryManageTable: React.FC<CategoryManageTableProps> = ({ categories }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<MODEL.CATEGORY | null>(null);
    const handleEditCategory = (category: MODEL.CATEGORY) => {
        setCurrentCategory(category);
        setIsEditModalOpen(true);
    };

    const handleSave =() => {
        // Dispatch action to update category (integrate with Redux later)
        setIsEditModalOpen(false);
    };

    const columns: TableColumn<MODEL.CATEGORY>[] = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sub Category Names',
            dataIndex: 'subcategories',
            key: 'subcategories',
            render: (subcategories: { name: string }[]) => {
                return subcategories && subcategories.length > 0 ? (
                    <div className="subcategory-list">
                        {subcategories.map((subcategories) => (
                            <div key={subcategories.name} className="subcategory-tag">
                                {subcategories.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    'N/A'
                );
            },
        },
        {
            title: 'Actions',
            align_head: 'center',
            align_col: 'center',
            render: (_, category: MODEL.CATEGORY) => (
                <div className="actions-container">
                    <button className="btn-action-edit" onClick={() => handleEditCategory(category)}>Edit</button>
                </div>
            ),
        },
    ];

    return (
        <div className="table-container">
            <TableDynamic data={categories} columns={columns} width="100%" />

            {isEditModalOpen && currentCategory && (
                <ModalEditCategory
                    category={currentCategory}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    )

}

export default CategoryManageTable
