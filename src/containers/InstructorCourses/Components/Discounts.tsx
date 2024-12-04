import TableDynamic from "@/components/organisms/Table/TableDynamic";
import { CiEdit } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Button } from "@/containers/Feedback/components/Button";
import { useForm } from "react-hook-form";
import { Col, Row } from "reactstrap";
import "./Discounts.scss";
import { cursusAPI } from "@/services";

interface FormDiscount {
  course: string;
  percent: string;
  startDate: string;
  endDate: string;
}
export default function Discounts() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDiscount>();
  const startDate = watch("startDate");

  const onSubmit = (data: FormDiscount) => {
    console.log(data);
  };

  const handleOpenForm = () => {
    setOpen(!open);
  };

  const [courses, setCourses] = useState<MODEL.COURSE[]>([]);

  useEffect(() => {
    cursusAPI.courseService.getAllNewsestCourse().then((res) => {
      setCourses(res.data.data);
    });
  }, []);

  const data = [
    {
      id: "01",
      course: "Course Title Here",
      start_date: "06 April 2020",
      end_date: "06 April 2021",
      discount: "15",
      status: "false",
    },
    {
      id: "02",
      course: "Course Title Here",
      start_date: "06 April 2024",
      end_date: "06 April 2025",
      discount: "15",
      status: "true",
    },
  ];

  const columns = [
    {
      title: "Item No.",
      dataIndex: "id",
      align_col: "center",
      align_head: "center",
      width_col: "100px",
    },
    {
      title: "Course",
      dataIndex: "course",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (text: number) => <span>{text}%</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span
          style={{
            color: text === "true" ? "red" : "gray",
            fontWeight: "bold",
          }}
        >
          {text === "true" ? "Active" : "Expired"}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: () => (
        <div>
          <span className="icon_actions">
            <CiEdit />
          </span>
          <span className="icon_actions">
            <RiDeleteBin5Line />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="new-discount">
        <div
          className="new-discount__title"
          onClick={handleOpenForm}
          style={{ borderBottom: open ? "1px solid #cac9c9" : "none" }}
        >
          <span>New Discount</span>
          {open ? <FaMinus /> : <FaPlus />}
        </div>

        <div className={`discount-form ${open ? "open" : ""}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xl={6} xs={12}>
                <div>
                  <p className="title-discount-input">Course</p>
                  <select
                    className="input-discount-group"
                    {...register("course", { required: true })}
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course.title} value={course.title}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  {errors.course && (
                    <p className="invalid">This field is required</p>
                  )}
                </div>
              </Col>

              <Col xl={6} xs={12}>
                <div>
                  <p className="title-discount-input">Discount Amount</p>
                  <input
                    placeholder="Percent (eg. 20 for 20%)"
                    className="input-discount-group"
                    {...register("percent", {
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                      pattern: {
                        value: /^[0-9]+$/, //^\d+$
                        message: "Please enter a number only!",
                      },
                      min: {
                        value: 1,
                        message: "Discount amount cannot be less than 1!",
                      },
                      max: {
                        value: 100,
                        message: "Discount amount can't be more than 100!",
                      },
                    })}
                  />
                  {errors.percent && (
                    <p className="invalid">{errors.percent.message}</p>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col xl={6} xs={12}>
                <div>
                  <p className="title-discount-input">Start Date</p>
                  <input
                    className="input-discount-group"
                    type="date"
                    {...register("startDate", { required: true })}
                  />
                  {errors.startDate && (
                    <p className="invalid">This field is required</p>
                  )}
                </div>
              </Col>

              <Col xl={6} xs={12}>
                <div>
                  <p className="title-discount-input">End Date</p>
                  <input
                    className="input-discount-group"
                    type="date"
                    {...register("endDate", {
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                      validate: {
                        value: (value) =>
                          new Date(value) >= new Date(startDate) ||
                          "End date cannot be before start date!",
                      },
                    })}
                  />
                  {errors.endDate && (
                    <p className="invalid">{errors.endDate.message}</p>
                  )}
                </div>
              </Col>
            </Row>

            <Button margin="30px 0" width="280px" border_radius="50px">
              Save Changes
            </Button>
          </form>
        </div>
      </div>

      <div>
        <TableDynamic columns={columns} data={data} />
      </div>
    </>
  );
}
