import TableDynamic, {
  TableColumn,
} from "@/components/organisms/Table/TableDynamic";
import { Button } from "@/containers/Feedback/components/Button";
import { ROLE, STUDENT } from "@/routes";
// import { RiDeleteBin5Line } from "react-icons/ri";
import { TbAward } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "./StudentCertificates.scss";

function StudentCertificate() {
  const navigate = useNavigate();

  const data: IStudent.Certificate[] = [
    {
      _id: "1",
      title: "WordPress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",
    },
  ];

  const columns: TableColumn<IStudent.Certificate>[] = [
    {
      title: "Title",
      dataIndex: "title",
      width_col: "300px",
    },
    {
      title: "Mark",
      dataIndex: "mark",
      align_col: "center",
    },
    {
      title: "Out of",
      dataIndex: "outOf",
      align_col: "center",
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      align_col: "center",
    },
  ];

  return (
    <>
      <div className="student_certificate col-lg-12">
        <div className="student_certificate_title">
          <div className="student_certificate_title_icon">
            <TbAward className="icon_awardStudent" />
          </div>
          <h2 className="student_certificate_text">My Certificates</h2>
        </div>

        <div className="student_certificate_header">
          <div className="student_certificate_header_title">
            <div className="student_certificate_header_icon">
              <TbAward className="icon_awardHeader" />
            </div>
            <h2 className="student_certificate_header_text">
              Jump Into New Certificate
            </h2>
          </div>
          <Button
            width="140px"
            border_radius="3px"
            onClick={() =>
              navigate(`/${ROLE.STUDENT}/${STUDENT.CERTIFICATE_CENTER}`)
            }
          >
            New Certificate
          </Button>
        </div>

        <div className="student_certificate_table">
          <TableDynamic columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default StudentCertificate;
