import styled from 'styled-components';
import CardSearchResult from "@/components/atoms/CardItem/CardSearchResult";

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  margin-top: 30px;
`;

const CardSearch = ({ courses, searchTerm }: { courses: any[]; searchTerm: string }) => {
  const renderHighlightedTitle = (title: string) => {
    if (!searchTerm) return title;
  
    const regex = new RegExp(`(${searchTerm})`, 'ig');
    const parts = title.split(regex);
  
    return (
      <span style={{ display: "inline" }}>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span
              key={index}
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
                color: "#ed2a26",
              }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  return (
    <div>
      <Heading>{courses.length} Results</Heading>
      {courses.map((item: any, index: number) => (
        <CardSearchResult
          key={index}
          _id={item._id}
          title={item.title}
          subCategory={Array.isArray(item.subCategory)
            ? item.subCategory.map((sub: { name: string; }) => sub.name).join(", ")
            : item.subCategory?.name || "No Subcategory"}
          author={item.author?.[0]?.name || "Unknown Author"}
          price={item.price.toLocaleString()}
          imageUrl={item.image}
          slug={item.slug} highlightedTitle={''}      >
        {renderHighlightedTitle(item.title)}
      </CardSearchResult>
      
      ))}
    </div>
  );
};

export default CardSearch;

