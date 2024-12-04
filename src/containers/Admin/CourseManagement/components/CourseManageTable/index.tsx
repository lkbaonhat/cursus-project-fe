import TableDynamic, { TableColumn } from '@/components/organisms/Table/TableDynamic';
import { useEffect, useMemo, useState} from 'react'
import { GrView } from 'react-icons/gr';
import './index.scss'
import ModalViewCourse from '../ModalViewCourse';
import { useDispatch, useSelector } from 'react-redux';
import { selectStateCoursesManage } from '@/modules/global/selector';

const CourseManageTable = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectStateCoursesManage);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourse.Course | null>(null);
    useEffect(() => {
        dispatch({ type: "fetchCourses" });
    }, [dispatch]);

    const handleView = (course: ICourse.Course) => {
        setSelectedCourse(course);
        setShowViewModal(true);
    };
    // filter 
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredData = useMemo(() => {
        return data.filter(course => {
            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'approved' ? course.status === 'approved' : course.status === 'rejected');
            return matchesStatus;
        });
    }, [data, statusFilter]);
    //--------------end  and filter ----------------------


    const columns: TableColumn<ICourse.Course>[] = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Publish Date',
            dataIndex: 'createdAt',
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('en-GB');
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price: number) => {
                return price.toLocaleString('vi-VN');
            },
        },
        {
            title: 'Category',
            dataIndex: 'subCategory',
            render: (subCategory: { name: string }[]) => {
                return subCategory.length > 0 ? subCategory[0].name : 'N/A';
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: 'approved' | 'rejected') => (
                <span className={`status-text ${status}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            ),
        },

        {
            title: 'Actions',
            width_col: '50px',
            align_col: 'center',
            align_head: 'center',
            render: (_: any, record: ICourse.Course) => (
                <div className="actions-container-course-mana">
                    <GrView className='action-icon' onClick={() => handleView(record)} />
                </div>
            ),
        },
    ];

    return (
        <div className="table-container">
            <div className='filter-table-users'>
                {/* Filter by status */}
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            {filteredData.length === 0 ? (
                <p className="loading-text">No data available.</p>
            ) : (
                <>
                    <TableDynamic data={filteredData} columns={columns} width="100%" />
                    {selectedCourse && (
                        <ModalViewCourse
                            show={showViewModal}
                            course={selectedCourse}
                            onClose={() => setShowViewModal(false)}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default CourseManageTable
