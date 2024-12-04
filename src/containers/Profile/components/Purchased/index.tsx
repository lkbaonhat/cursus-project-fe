import { useSelector } from "react-redux";
import ListComponent from "../ListComponent/ListComponent";
import CardCourse from "@/components/molecules/Card/CardCourse/CardCourse";
import { selectCourseOfPurchase } from "@/modules/global/selector";

export default function Purchased() {

  const courses = useSelector(selectCourseOfPurchase);

  return (
    <div>
      <h3 className="my-4 fs-4">Purchased Courses</h3>
      <ListComponent
        data={courses}
        renderItem={(item) => (
          <div className="col-md-12 mb-2">
            <CardCourse
              _id={item._id}
              slug={item.slug}
              title={item.title}
              image={item.image}
              rating={item.rating}
              totalView={item.totalView}
              duration={item.duration}
              dateCreated={item.dateCreated}
              price={item.price}
              instructor={item.userId.fullname}
              subCategory={item.subCategoryId.name}
              bestseller={item.bestseller}
              purchased={item.purchased}
              width="80%"
              height="none"
              className={true}
            />
          </div>
        )}
      />
    </div>
  );
}
