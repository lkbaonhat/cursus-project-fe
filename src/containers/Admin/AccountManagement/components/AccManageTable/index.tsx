import { useEffect, useMemo, useState } from 'react';
import TableDynamic, { TableColumn } from '@/components/organisms/Table/TableDynamic';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import './index.scss';
import DeleteConfirmationModal from '../ModalDelete';
import UserDetailModal from '../ModalViewUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectStateUsers } from '@/modules/global/selector';

const AccManageTable = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectStateUsers);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<MODEL.USER | null>(null);


    useEffect(() => {
        dispatch({ type: "fetchUsers" });
    }, [dispatch]);

    const handleDelete = (id: string) => {
        setUserIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (userIdToDelete) {
            dispatch({ type: "deleteUser", payload: { userId: userIdToDelete } });
            setShowModal(false);
            setUserIdToDelete(null);
        }
    };

    const handleView = (user: MODEL.USER) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    // filter 

    const [statusFilter, setStatusFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');
    const filteredData = useMemo(() => {
        return data.filter(user => {
            const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? user.isActive : !user.isActive);
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            return matchesStatus && matchesRole;
        });
    }, [data, statusFilter, roleFilter]);
    //--------------end search and filter ----------------------

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
            key: 'isActive',
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
            render: (_: any, record: MODEL.USER) => (
                <div className="actions-container">

                    <GrView className='action-icon' onClick={() => handleView(record)} />
                    <RiDeleteBin6Line className={`action-icon ${!record.isActive ? 'disabled' : ''}`}
                        onClick={() => record.isActive && handleDelete(record._id)} />
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                {/* Filter by role */}
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                </select>

            </div>

            <TableDynamic data={filteredData} columns={columns} width="100%" />
            <DeleteConfirmationModal
                show={showModal}
                onConfirm={confirmDelete}
                onCancel={() => setShowModal(false)}
            />
            {selectedUser && (
                <UserDetailModal
                    show={showViewModal}
                    user={selectedUser}
                    onClose={() => setShowViewModal(false)}
                />
            )}
        </div>
    );
};

export default AccManageTable;
