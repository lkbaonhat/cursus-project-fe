import React, { useEffect, useState } from "react";
import CardCourse from "@/components/molecules/Card/CardCourse/CardCourse";
import PaginationComp from "@/components/molecules/Pagination/Pagination";
import "@/containers/Explore/index.scss";
import { useLocation } from "react-router-dom";
import { configHeaders } from "@/services/config";
import { useDispatch, useSelector } from "react-redux";
import { selectStateCourses } from "@/modules/global/selector";
import { formatTime } from "@/utils/helpers/date";



const Explore = () => {
  const [courses, setCourses] = useState<MODEL.COURSE[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();
  const dispatch = useDispatch();
  const listCourse = useSelector(selectStateCourses);

  const itemsPerPage = 8; // Số item mỗi trang

  // Fetch dữ liệu khi component mount hoặc query search thay đổi
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const courseName = query.get("search");

    if (courseName && courseName.length > 0) {
      setSearchQuery(courseName);
      fetchSearchedCourses(courseName);
    } else {
      setSearchQuery(""); // Clear search query nếu không có
      dispatch({ type: "setCourses", payload: "approved" });
    }
  }, [location.search]);

  const fetchSearchedCourses = async (courseName: string) => {
    try {
      const response = await fetch(
        `http://14.225.212.121:8080/api/v1/course/search=${courseName}`,
        {
          method: "GET",
          headers: {
            ...configHeaders(),
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBodW9jaG1zZTE3MTgzMEBmcHQuZWR1LnZuIiwic3ViIjoiNjcwY2UyZmUwOGEzYTlkMjU2NWMyY2MwIiwiZnVsbG5hbWUiOiJIdeG7s25oIE1pbmggUGjGsOG7m2MiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyOTIxNDg3OCwiZXhwIjoxNzYwNzUwODc4fQ.6kclDXdX3vzVgtqbqlx4sXCtNTBOnOhU_POPuBPACuk`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (Array.isArray(result.data)) {
        const fetchedCourses: MODEL.COURSE[] = result.data.map((item: any) => ({
          id: item._id,
          name: item.title,
          image: item.image || "",
          rating: item.rating || 0,
          views: item.views || 0,
          time: item.time || "",
          price: item.price || 0,
          author: item.author[0],
          category: item.category || "",
          bestseller: item.bestseller || false,
          createdAt: item.createdAt || "",
        }));
        setCourses(fetchedCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Tính toán danh sách courses cho trang hiện tại
  const paginatedCourses = React.useMemo(() => {
    const filteredCourses =
      listCourse &&
      listCourse.filter(
        (course) =>
          course.title &&
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses
      ? filteredCourses.slice(startIndex, startIndex + itemsPerPage)
      : [];

  }, [listCourse, searchQuery, currentPage]);

  window.scrollTo(0, 0);// scroll to top

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="explore-page">
      <div className="container-fluid">
        <div className="courses-wrap row">
        {paginatedCourses.length > 0 ? (
          paginatedCourses.map((item: any, index) => (
            <div className="col-lg-3 mb-3" key={index}>
              <CardCourse
                _id={item._id}
                width={"100%"}
                heightImg="200px"
                title={item.title}
                image={item.image}
                rating={item.rating}
                totalView={item?.totalView}
                duration={item.duration}
                slug={item.slug}
                price={item.price}
                instructor={item.author[0]}
                bestseller={item.bestseller}
                userId={item.author[0]._id}
                subCategory={item.subCategory[0]}
                createdAt={formatTime(item.createdAt)}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">Your search did not match any documents</p>
          </div>
        )}
      </div>

      {paginatedCourses.length > 0 && (
        <PaginationComp
          totalItems={listCourse ? listCourse.length : 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          maxPageNumbersToShow={5}
          onPageChange={handlePageChange}
        />
      )}
      </div>
    </div>
  );
};

export default Explore;
