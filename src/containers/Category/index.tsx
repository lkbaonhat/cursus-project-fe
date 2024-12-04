import CardCourse from "@/components/molecules/Card/CardCourse/CardCourse";
import { selectedCategories, selectedMyCourse } from "@/modules/course/selector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Category = () => {
    const { slug } = useParams();
    const listCategories = useSelector(selectedCategories);
    const listCourse = useSelector(selectedMyCourse);
    const dispatch = useDispatch();
    const category = listCategories.find((item) => item.slug === slug);


    useEffect(() => {
        dispatch({ type: 'getCourseByCategoryId', payload: category?._id });
    }, [slug])

    return (
        <div className="row mx-3">
            <h3 className="my-4 d-flex align-items-center">Category:  <strong>{category?.name}</strong></h3>
            {listCourse.length !== 0 ?
                (
                    listCourse.map((item: MODEL.COURSE, index) => (
                        console.log(item),

                        <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
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
                                userId={item.userId?._id}
                                role={item?.userId?.role}
                                instructor={item?.userId}
                                subCategory={item?.subCategoryId}
                                bestseller={item.bestseller}
                            />
                        </div>
                    ))
                )
                :
                (
                    <h3 className="d-flex align-items-center justify-content-center"><strong>No Course</strong></h3>
                )
            }
        </div>
    )
}

export default Category