import ListComponent from "../ListComponent/ListComponent";
import CardCourse from "@/components/molecules/Card/CardCourse/CardCourse";
import { useSelector } from "react-redux";
import { selectCourseOfInstructor } from "@/modules/global/selector";
import "./Course.scss"

export default function Course() {

  const listCourses = useSelector(selectCourseOfInstructor);

  return (
    <div>
      <h3>My Courses ({listCourses.length})</h3>
      <div className="row">
        {listCourses && listCourses.length > 0 ? (
          <ListComponent
            data={listCourses}
            renderItem={(item) => (
              <div className="col-md-4 mb-3">
                <CardCourse
                  _id={item._id}
                  slug={item.slug}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  totalView={item?.totalView}
                  duration={item.duration}
                  dateCreated={item.dateCreated}
                  price={item.price}
                  instructor={item.userId.fullname}
                  subCategory={item.subCategoryId}
                  bestseller={item.bestseller}
                />
              </div>
            )}
          />
        ) : (
          <p className="noti-text">This user don't have any courses</p>
        )}
      </div>
    </div>
  );
}
