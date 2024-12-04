import TableDynamic, { TableColumn } from '@/components/organisms/Table/TableDynamic';
import { useEffect, useState } from 'react'
import './index.scss'
import ModalCourseApprove from '../ModalCourseApprove';
import ModalRejection from '../ModalRejection';
import { useDispatch, useSelector } from 'react-redux';
import { selectPendingCourses } from '@/modules/global/selector';


const CourseApprovalTable = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectPendingCourses);
    const [loading, setLoading] = useState(true);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourse.Course | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    useEffect(() => {
        dispatch({ type: "fetchPendingCourses" });
        setLoading(false);
    }, [dispatch]);

    const handleApprove = () => {
        if (selectedCourse) {
            dispatch({ type: "approveCourse", payload: { courseId: selectedCourse._id } });
            setShowApprovalModal(false);
        }
    };

    const handleReject = (reason: string) => {
        if (selectedCourse) {
            dispatch({ type: "rejectCourse", payload: { courseId: selectedCourse._id, rejectionReason: reason } });
            setShowApprovalModal(false);
        }
    };

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
            render: (status: 'pending') => (
                <span className={`status-text ${status}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            ),
        },
        {
            title: 'Actions',
            align_col: 'center',
            align_head: 'center',
            render: (_: any, course: ICourse.Course) => (
                <div className="actions-container-course-approve">
                    <button onClick={() => handleOpenModal(course)} className="action-view-button-course-approve">
                        Approve
                    </button>
                </div>
            ),
        },
    ];
    const handleOpenModal = (course: ICourse.Course) => {
        setShowRejectionModal(false);
        setSelectedCourse(course);
        setShowApprovalModal(true);
    };


    return (
        <div className="table-container">
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : data && data.length > 0 ? (
                <TableDynamic data={data} columns={columns} width="100%" />
            ) : (
                <p className="no-data-text">No data</p>
            )}
            {selectedCourse && (
                <ModalCourseApprove
                    show={showApprovalModal}
                    onHide={() => setShowApprovalModal(false)}
                    course={selectedCourse}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
            <ModalRejection
                show={showRejectionModal}
                onHide={() => setShowRejectionModal(false)}
                rejectionReason={rejectionReason}
                setRejectionReason={setRejectionReason}
                onSubmit={() => handleReject(rejectionReason)}
            />
        </div>
    );
}

export default CourseApprovalTable
