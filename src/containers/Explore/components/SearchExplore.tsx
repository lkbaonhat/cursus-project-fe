import React from "react";
import SearchComponent from "@/components/organisms/TextField/Search";

interface SearchExploreProps {
  setSearchQuery: (query: string) => void;
}

const SearchExplore: React.FC<SearchExploreProps> = ({ setSearchQuery }) => {
  return (
    <div>
      <SearchComponent
        height="50px"
        width="100%"
        hasFocusBorder={true}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
};

export default SearchExplore;