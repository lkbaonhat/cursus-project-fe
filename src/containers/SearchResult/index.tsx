import { useEffect, useState } from "react";
import CardSearch from "./components/CardSearch";
import CISearch from "./components/CISearch";
import Filters from "./components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { selectStateCourses } from "@/modules/global/selector";

const SearchResult = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");  
  const listCourses = useSelector(selectStateCourses);

  useEffect(() => {
    dispatch({ type: 'setCourses', payload: 'approved' });
  }, []);

  const filteredCourses = (listCourses || []).filter(course =>
    (course.title?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
    

  return (
    <div>
      <CISearch onSearch={setSearchTerm} />
      <div className="container">
        <div className="row g-3">
          <div className="col-md-5">
            <Filters />
          </div>
          <div className="col-md-7">
          <CardSearch courses={filteredCourses} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
