import styled from 'styled-components';
import { CiSearch } from "react-icons/ci";

const Header = styled.header`
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  display: flex; 
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  max-width: 960px;
  margin-left: 12%;

  a {
    color: inherit;
    text-decoration: none;
    font-size: 16px;
  }

  p {
    font-size: 26px;
    font-weight: bold;
    margin-top: 10px;
  }
`;

const SearchBar = styled.div`
  position: relative;
  margin-right: 150px;
`;

const SearchIcon = styled(CiSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #888;
  }
`;
interface CISearchProps {
  onSearch: (value: string) => void;  
}

const CISearch: React.FC<CISearchProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); 
  };

  return (
    <Header>
      <Container>
        <a href="/">Home</a> / Search Results
        <p>Search Results</p>
      </Container>
      <SearchBar>
        <SearchIcon size={20} />
        <SearchInput 
          type="text" 
          placeholder="Search..." 
          onChange={handleInputChange} 
        />
      </SearchBar>
    </Header>
  );
};

export default CISearch;
