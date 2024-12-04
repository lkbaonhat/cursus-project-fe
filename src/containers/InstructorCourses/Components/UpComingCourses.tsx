import TableDynamic, {
  TableColumn,
} from "@/components/organisms/Table/TableDynamic";
// import { CiEdit } from "react-icons/ci";
// import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useEffect } from "react";
import { selectPendingCourse } from "@/modules/global/selector";
import { formatDate } from "@/utils/helpers/date";
import "./UpComingCourses.scss";

export default function UpComingCourses() {
  const dispatch = useDispatch();
  const pendingCourses = useSelector(selectPendingCourse);

  const user = decodeJWT();

  useEffect(() => {
    if (user) {
      dispatch({
        type: "instructorPendingCourse",
        payload: { instructorId: user.sub },
      });
    }
  }, [dispatch]);

  const columns: TableColumn<IINSTRUCTOR.PENDING_COURSES>[] = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "subCategoryId",
      render: (text: ICourse.subCategory) => (
        <span className="categoryUpcoming">{text?.name}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text: number) => <span>{text.toLocaleString()} VND</span>,
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      render: (text: string) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => <span className="status-text">{text}</span>,
    },
    // {
    //   title: 'Action',
    //   render: () => (
    //       <div>
    //         <span className="icon_actions"><CiEdit /></span>
    //         <span className="icon_actions"><RiDeleteBin5Line /></span>
    //       </div>
    //   )
    // },
  ];
  return (
    <>
      {pendingCourses && pendingCourses.length > 0 ? (
        <TableDynamic columns={columns} data={pendingCourses} />
      ) : (
        <div>You don't have any course yet.</div>
      )}
    </>
  );
}
