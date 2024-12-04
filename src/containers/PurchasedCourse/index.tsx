import { FiBook } from "react-icons/fi";
import TableDynamic, {
  TableColumn,
} from "@/components/organisms/Table/TableDynamic";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorPurchase } from "@/modules/global/selector";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useEffect } from "react";
import { formatDate } from "@/utils/helpers/date";
import "@/containers/PurchasedCourse/PurchasedCourse.scss";

const PurchasedCourse = () => {
  const dispatch = useDispatch();
  const purchaseCourse: IStudent.PURCHASES[] = useSelector(
    selectInstructorPurchase
  );

  const user = decodeJWT();

  useEffect(() => {
    if (user) {
      dispatch({
        type: "instructorPurchase",
        payload: { userId: user.sub },
      });
    }
  }, [dispatch]);

  const column: TableColumn<IStudent.PURCHASES>[] = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Vendor",
      dataIndex: "userId",
      render: (userId) => <span className="vendor">{userId.fullname}</span>,
    },
    {
      title: "Category",
      dataIndex: "subCategoryId",
      render: (subCategory: ICourse.subCategory) => (
        <span className="categoryPurchased">
          {subCategory && subCategory.name}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text: number) => <span>{text.toLocaleString()} VND</span>,
    },
    {
      title: "Purchase Date",
      dataIndex: "purchasedDate",
      render: (text: string) => <span>{formatDate(text)}</span>,
    },
  ];

  return (
    <div className="col-lg-12 background">
      <h2 className="title">
        <i className="title__icon">
          <FiBook className="iconCmt" />
        </i>
        Purchased Courses
      </h2>
      <div className="table">
        {purchaseCourse && purchaseCourse.length > 0 ? (
          <TableDynamic columns={column} data={purchaseCourse} width="100%" />
        ) : (
          <div>You don't purchase any course yet.</div>
        )}
      </div>
    </div>
  );
};

export default PurchasedCourse;
