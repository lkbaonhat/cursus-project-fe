import TableDynamic, { TableColumn } from '@/components/organisms/Table/TableDynamic';
import { useEffect, useState } from 'react'
import './index.scss'
import ModalRejection from '../ModalRejection';
import ModalAccountApprove from '../ModalAccountApprove';
import { useDispatch, useSelector } from 'react-redux';
import { selectPendingUsers } from '@/modules/global/selector';

const AccountApprovalTable = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectPendingUsers);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<MODEL.USER | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        dispatch({ type: 'fetchPendingUsers' });
    }, [dispatch]);
    const columns: TableColumn<MODEL.USER>[] = [
        {
            title: 'Full Name',
            dataIndex: 'fullname',

        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Create Date',
            dataIndex: 'createdAt',
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('en-GB');
            },
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role: string) => {
                return role
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
            }
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            align_col: 'center',
            align_head: 'center',
            render: (text: string) => (
                <span
                    className={`status-text ${text ? 'active' : 'inactive'}`}
                >
                    {text ? "Active" : "Inactive"}
                </span>
            ),
        },
        {
            title: 'Actions',
            align_col: 'center',
            align_head: 'center',
            render: (_: any, course: MODEL.USER) => (
                <div className="actions-container-acc-approve">
                    <button onClick={() => handleOpenModal(course)} className="action-view-button-acc-approve">
                        Approve
                    </button>
                </div>
            ),
        },
    ];
    const handleOpenModal = (users: MODEL.USER) => {
        setShowRejectionModal(false);
        setSelectedUser(users);
        setShowApprovalModal(true);
    };


    return (
        <div className="table-container">
            {data && data.length > 0 ? (
                <TableDynamic data={data} columns={columns} width="100%" />
            ) : (
                <p className="no-data-text">No data</p>
            )}

            {selectedUser && (
                <ModalAccountApprove
                    show={showApprovalModal}
                    onHide={() => setShowApprovalModal(false)}
                    user={selectedUser}
                    onApprove={() => {
                        if (selectedUser) dispatch({ type: 'approveUser', payload: { userId: selectedUser._id } });
                        setShowApprovalModal(false);
                    }}
                    onReject={(reason) => {
                        dispatch({ type: 'rejectUser', payload: { userId: selectedUser._id, rejectionReason: reason } });
                        setShowApprovalModal(false);
                    }}
                />
            )}
            <ModalRejection
                show={showRejectionModal}
                onHide={() => setShowRejectionModal(false)}
                rejectionReason={rejectionReason}
                setRejectionReason={setRejectionReason}
                onSubmit={() => {
                    if (selectedUser) {
                        dispatch({ type: 'rejectUser', payload: { userId: selectedUser._id, rejectionReason } });
                        setRejectionReason('');
                    }
                    setShowRejectionModal(false);
                }}
            />
        </div>
    );
}

export default AccountApprovalTable
