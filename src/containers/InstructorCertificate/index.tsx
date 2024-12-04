import TableDynamic, {
  TableColumn,
} from "@/components/organisms/Table/TableDynamic";
import { Button } from "@/containers/Feedback/components/Button";
import { INSTRUCTOR, ROLE } from "@/routes";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbAward } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "./InstructorCertificate.scss";

function InstructorCertificate() {
  const navigate = useNavigate();

  const data: IINSTRUCTOR.CERTIFICATE[] = [
    {
      _id: "1",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "2",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "3",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "4",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "5",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "6",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "7",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "8",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "9",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "10",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "11",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "12",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "13",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",

    },
    {
      _id: "14",
      title: "Wordpress Certificate",
      mark: 12,
      outOf: 20,
      uploadDate: "6 April 2019",
    },
  ];

  const columns: TableColumn<IINSTRUCTOR.CERTIFICATE>[] = [
    {
      title: "Title",
      dataIndex: "title",
      width_col: "300px",
    },
    {
      title: "Mark",
      dataIndex: "mark",
      align_col: "center",
      align_head: "center",
    },
    {
      title: "Out of",
      dataIndex: "outOf",
      align_col: "center",
      align_head: "center",
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      align_col: "center",
      align_head: "center",
    },
  ];

  return (
    <>
      <div className="instructor_certificate col-lg-12">
        <div className="instructor_certificate_title">
          <div className="instructor_certificate_icon">
            <TbAward className="icon_award" />
          </div>
          <h2 className="instructor_certificate_content">My Certificates</h2>
        </div>

        <div className="instructor_certificate_header">
          <div className="instructor_certificate_header_title">
            <div className="instructor_certificate_header_icon">
              <TbAward className="icon_award_header" />
            </div>
            <h2 className="instructor_certificate_header_content">
              Jumb Into New Certificate
            </h2>
          </div>
          <Button
            width="140px"
            border_radius="3px"
            onClick={() =>
              navigate(`/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CERTIFICATE_CENTER}`)
            }
          >
            New Certificate
          </Button>
        </div>

        <div className="instructor_certificate_table">
          <TableDynamic columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default InstructorCertificate;
