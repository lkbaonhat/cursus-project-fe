import TableDynamic, {
  TableColumn,
} from "@/components/organisms/Table/TableDynamic";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorPurchase } from "@/modules/global/selector";
import { useEffect } from "react";
import { decodeJWT } from "@/utils/hooks/useUser";
import { formatDate } from "@/utils/helpers/date";
import "./MyPurchases.scss";

export default function MyPurchases() {
  const dispatch = useDispatch();
  const instructorPurchase: IINSTRUCTOR.PURCHASES[] = useSelector(
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

  const column: TableColumn<IINSTRUCTOR.PURCHASES>[] = [
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
        <span className="categoryPurchased">{subCategory && subCategory.name}</span>
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
    <>
      {instructorPurchase && instructorPurchase.length > 0 ? (
        <TableDynamic columns={column} data={instructorPurchase} />
      ) : (
        <div>You don't purchase any course yet.</div>
      )}
    </>
  );
}
