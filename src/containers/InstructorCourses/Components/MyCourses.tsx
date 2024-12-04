import TableDynamic, {
  TableColumn,
} from "@/components/organisms/Table/TableDynamic";
// import DeleteConfirmationModal from "@/containers/InstructorCourses/Components/Model/ModelDelete";
import { selectInstructorCourse } from "@/modules/global/selector";
import { formatDate } from "@/utils/helpers/date";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useEffect } from "react";
// import { CiEdit } from "react-icons/ci";
// import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function MyCourses() {
  // const [openModal, setOpenModal] = useState(false);
  // const [courseIdToDelete, setCourseIdToDelete] = useState<string | null>(null);

  const instructorCourse: IINSTRUCTOR.COURSES[] = useSelector(
    selectInstructorCourse
  );
  const dispatch = useDispatch();

  const user = decodeJWT();

  useEffect(() => {
    if (user) {
      dispatch({
        type: "instructorCourse",
        payload: { instructorId: user.sub },
      });
    }
  }, [dispatch]);

  // const handleDelete = (id: string) => {
  //   setCourseIdToDelete(id);
  //   setOpenModal(true);
  // };

  // const confirmDelete = () => {
  //   console.log("da xoa");
  // };

  // const handleUpdate = () => {};

  const columns: TableColumn<IINSTRUCTOR.COURSES>[] = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Publish Date",
      dataIndex: "approvedAt",
      render: (text: string) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Sales",
      dataIndex: "totalSold",
    },
    {
      title: "Price",
      dataIndex: "price",
      align_head: "center",
      render: (price: number) => <span>{price.toLocaleString()} VND</span>,
    },
    {
      title: "Category",
      dataIndex: "subCategoryId",
      render: (subCategory: ICourse.subCategory) => (
        <span style={{ color: "#4183c4" }}>
          {subCategory && subCategory.name}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span
          style={{
            color: text === "approved" ? "green" : "red",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Active",
      dataIndex: "isDeleted",
      render: (text: boolean) => (
        <span
          style={{
            color: text === false ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {text === false ? "Active" : "Inactive"}
        </span>
      ),
    },
    // {
    //   title: "Action",
    //   render: () => (
    //     <div>
    //       {/* <span className="icon_actions">
    //         <CiEdit onClick={handleUpdate} />
    //       </span> */}
    //       <span className="icon_actions">
    //         <RiDeleteBin5Line onClick={() => handleDelete} />
    //       </span>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      {instructorCourse && instructorCourse.length > 0 ? (
        <TableDynamic
          data={instructorCourse}
          columns={columns}
          margin="0 0 30px 0"
        />
      ) : (
        <div>You don't have any course yet.</div>
      )}
      {/* <DeleteConfirmationModal
        show={openModal}
        onConfirm={confirmDelete}
        onCancel={() => setOpenModal(false)}
      /> */}
    </>
  );
}
