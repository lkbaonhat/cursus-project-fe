import React, { useEffect, useState } from "react";
import { GoSearch, GoHistory } from "react-icons/go";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { configHeaders } from "@/services/config";
import { style } from "@/theme";

interface SearchProps {
  width?: string;
  height?: string;
  hasFocusBorder?: boolean;
  onSearchChange?: (query: string) => void;
}

export const SearchContainer = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin: ${style.size.margin.m_0} ${style.size.margin.m_2};
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${style.size.borderRadius.small};
`;

export const SearchInput = styled.input<{
  isFocused: boolean;
  hasFocusBorder: boolean;
  inputWidth?: string;
  inputHeight?: string;
}>`
  padding: 8.82143px 13px 8.82143px 41.6px;
  font-size: ${style.fonts.size.medium};
  font-weight: ${style.fonts.weight.regular};
  font-family: ${style.fonts.family.tertiary};
  width: ${(props) => props.inputWidth || "450px"};
  height: ${(props) => props.inputHeight || "34.41px"};
  border: 1px solid #e2e2e2;
  outline: 0;
  border-radius: ${style.size.borderRadius.small};
  background: #fff;
  color: ${(props) =>
    props.isFocused ? `${style.colors.black.title}` : "#999"};
  &::placeholder {
    color: ${(props) =>
      props.isFocused ? `${style.colors.black.secondary}` : "#999"};
  }

  &:focus {
    border-color: ${(props) =>
      props.hasFocusBorder ? `${style.colors.gray.border_focus}` : "#e2e2e2"};
  }
`;

export const GoSearchIcon = styled(GoSearch)<{ isFocused: boolean }>`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${style.fonts.size.xlarge};
  color: ${(props) =>
    props.isFocused ? `${style.colors.black.secondary}` : "#999"};
`;

const Popup = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 450px;
  background-color: ${style.colors.white.bg};
  border: 1px solid #ccc;
  border-radius: ${style.size.borderRadius.small};
  padding: ${style.size.padding.p10};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${style.size.padding.p_1} ${style.size.padding.p_0};
  cursor: pointer;

  &:hover {
    background-color: ${style.colors.gray.bg};
  }
`;

const HistoryText = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled(FaTimes)`
  color: #999;
  cursor: pointer;

  &:hover {
    color: ${style.colors.black.secondary};
  }
`;

const SearchComponent: React.FC<SearchProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { t } = useTranslation(["header"]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://14.225.212.121:8080/api/v1/course/search=${searchTerm}`,
            {
              method: "GET",
              headers: {
                ...configHeaders(),
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBodW9jaG1zZTE3MTgzMEBmcHQuZWR1LnZuIiwic3ViIjoiNjcwY2UyZmUwOGEzYTlkMjU2NWMyY2MwIiwiZnVsbG5hbWUiOiJIdeG7s25oIE1pbmggUGjGsOG7m2MiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyOTIxNDg3OCwiZXhwIjoxNzYwNzUwODc4fQ.6kclDXdX3vzVgtqbqlx4sXCtNTBOnOhU_POPuBPACuk`, // Replace with your token
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();

          if (Array.isArray(result.data)) {
            const titles = result.data.map((item) => item.title);
            setSkills(titles);
          } else {
            console.warn("Data is not an array:", result.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setSkills([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    props.onSearchChange?.(value);

    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText) {
      navigateToExplore(searchText);
      setIsFocused(false);
      setSearchText(searchText);
    }
    // else if (searchText == "") {
    //   navigate("/explore");
    // }
  };

  const handleDeleteHistory = (item: string) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((historyItem) => historyItem !== item)
    );
  };

  const handleHistoryClick = (item: string) => {
    navigateToExplore(item);
    setSearchText(item);
  };

  const navigateToExplore = (uquery: string) => {
    const query = new URLSearchParams();
    query.set("search", uquery);
    navigate(`/explore?${query.toString()}`);
    setSearchHistory((prevHistory) =>
      prevHistory.includes(uquery) ? prevHistory : [uquery, ...prevHistory]
    );
  };

  return (
    <SearchContainer>
      <Label>
        <InputContainer>
          <GoSearchIcon isFocused={isFocused} />
          <SearchInput
            placeholder={t("header.search")}
            value={searchText}
            inputHeight={props.height}
            inputWidth={props.width}
            isFocused={isFocused}
            hasFocusBorder={props.hasFocusBorder || false}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </InputContainer>
      </Label>
      {isFocused && (
        <Popup>
          {searchText && (
            <p>
              <GoSearch style={{ marginRight: "8px" }} />
              {` ${searchText}`}
            </p>
          )}
          {searchHistory.map((item, index) => (
            <HistoryItem
              key={index}
              onMouseDown={() => {
                setSearchText(item); // Set giá trị vào searchText
                handleHistoryClick(item); // Gọi hàm xử lý history click
              }}
            >
              <HistoryText>
                <GoHistory style={{ marginRight: "8px", color: "#999" }} />
                <span>{item}</span>
              </HistoryText>
              <DeleteIcon
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleDeleteHistory(item);
                }}
              />
            </HistoryItem>
          ))}

          {skills
            .filter((search) =>
              search.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((search) => (
              <HistoryItem
                key={search}
                onMouseDown={() => {
                  setSearchText(search); // Set giá trị vào searchText
                  navigateToExplore(search); // Điều hướng tới trang explore
                }}
              >
                <HistoryText>
                  <GoSearch style={{ marginRight: "8px", color: "#999" }} />
                  <span>{search}</span>
                </HistoryText>
              </HistoryItem>
            ))}

          {skills.length === 0 && <div>No search available.</div>}
        </Popup>
      )}
    </SearchContainer>
  );
};

export default SearchComponent;
