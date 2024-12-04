import CardContact from "@/components/molecules/Card/CardContact"
import PaginationComp from "@/components/molecules/Pagination/Pagination";
import { https } from "@/services/config";
import { useEffect, useState } from "react";

export const Instructor = () => {

    const [card, setCard] = useState<IINSTRUCTOR.INSTRUCTOR[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const fetchCard = async () => {
       const res = await https.get(`/user/all-instructors`);

        // Parse the JSON response
        const data: IINSTRUCTOR.INSTRUCTOR[] = await res.data.data;

        // Update the state with the fetched courses
        setCard(data);
    };

    useEffect(() => {
        fetchCard();
    }, []);

    const totalItems = card.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCourses = card.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>

            <div className="container-fluid mt-4">
                <div className="row">
                    {paginatedCourses.map((item) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={item.id}>
                            <CardContact
                                width={"100%"}
                                item={item}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <PaginationComp
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                maxPageNumbersToShow={3}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
