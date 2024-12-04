import styled from "styled-components";
import { useState, ReactNode, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoIosCheckmarkCircle, IoMdArrowDropdown } from "react-icons/io";
import { FaPen, FaPlayCircle } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { FaRegCircleXmark } from "react-icons/fa6";
interface SlideItem {
  icon?: ReactNode;
  content: string;
  dropdown?: {
    label: string;
    link: string;
    iconType?: string;
    time?: string;
    status?: string;
  }[];
  link?: string;
  number?: string;
}

interface SideContentProps {
  items: SlideItem[];
  isOpen: boolean;
  color: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
  activeBackgroundColor?: string;
  activeColor?: string;
  hoverEnabled: boolean;
  activeEnabled: boolean;
}

const SidebarItem = styled(NavLink)<{
  color: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
  activeBackgroundColor?: string;
  activeColor?: string;
  hoverEnabled: boolean;
  activeEnabled: boolean;
}>`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  color: ${({ color }) => color || "black"};
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  ${({ hoverEnabled, hoverBackgroundColor, hoverColor }) =>
    hoverEnabled &&
    `&:hover {
        background-color: ${hoverBackgroundColor || "inherit"};
        color: ${hoverColor || "inherit"};
      }`}

  ${({ activeEnabled, activeBackgroundColor, activeColor }) =>
    activeEnabled &&
    `&:active {
        background-color: ${activeBackgroundColor || "inherit"};
        color: ${activeColor || "inherit"};
      }`}

    &.active {
    background-color: ${({ activeBackgroundColor }) =>
      activeBackgroundColor || "inherit"};
    color: ${({ activeColor }) => activeColor || "inherit"};
    background-color: "";
  }
`;

const IconContainer = styled.div`
  margin-right: 15px;
`;

const ContentLabel = styled.span`
  font-weight: 500;
`;

const DropdownIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropdownContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  transition: max-height 0.3s ease-in-out;
`;

const DropdownItem = styled(NavLink)<{
  color: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
}>`
  padding: 10px 40px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${({ color }) => color || "black"};
  text-decoration: none;

  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    color: ${({ hoverColor }) => hoverColor};
  }

  &.active {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    color: ${({ hoverColor }) => hoverColor};
  }
`;

export const SideContent = ({
  items,
  isOpen,
  color,
  hoverBackgroundColor,
  hoverColor,
  activeBackgroundColor,
  activeColor,
  hoverEnabled,
  activeEnabled,
}: SideContentProps) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  useEffect(() => {}, [items]);

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          {item.dropdown ? (
            <SidebarItem
              as="div"
              aria-expanded={openDropdownIndex === index}
              color={color}
              hoverBackgroundColor={hoverBackgroundColor}
              hoverColor={hoverColor}
              activeBackgroundColor={activeBackgroundColor}
              activeColor={activeColor}
              hoverEnabled={hoverEnabled}
              activeEnabled={activeEnabled}
              onClick={() => toggleDropdown(index)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <ContentLabel>{item.content}</ContentLabel>
                  {item.number && (
                    <div style={{ fontSize: "0.8rem", marginTop: "2px" }}>
                      {item.number}
                    </div>
                  )}
                </div>

                {isOpen && item.dropdown && (
                  <DropdownIcon>
                    <IoMdArrowDropdown size={20} />
                  </DropdownIcon>
                )}
              </div>
            </SidebarItem>
          ) : (
            <SidebarItem
              to={item.link || "#"}
              color={color}
              hoverBackgroundColor={hoverBackgroundColor}
              hoverColor={hoverColor}
              activeBackgroundColor={activeBackgroundColor}
              activeColor={activeColor}
              hoverEnabled={hoverEnabled}
              activeEnabled={activeEnabled}
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <ContentLabel>{item.content}</ContentLabel>
                {isOpen && item.dropdown && (
                  <DropdownIcon>
                    <IoMdArrowDropdown size={20} />
                  </DropdownIcon>
                )}
              </div>
              {item.number && (
                <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>
                  <span style={{ flexGrow: 1 }}></span>
                  {item.number}
                </div>
              )}
            </SidebarItem>
          )}
          {isOpen && item.dropdown && openDropdownIndex === index && (
            <DropdownContainer isOpen={true}>
              {item.dropdown.map((dropdownItem, dropdownIndex) => (
                <DropdownItem
                  key={dropdownIndex}
                  to={dropdownItem.link}
                  color={
                    dropdownItem.status === "learn"
                      ? "green" // Nếu chỉ learn mà không active, giữ màu xanh lá cây
                      : color
                  }
                  hoverBackgroundColor={
                    dropdownItem.status === "learn"
                      ? "#D8F3DC"
                      : hoverBackgroundColor
                  }
                  hoverColor={
                    dropdownItem.status === "learn"
                      ? "green" // Nếu chỉ learn mà không active, giữ màu xanh lá cây
                      : hoverColor
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <ContentLabel>{dropdownItem.label}</ContentLabel>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "4px",
                      }}
                    >
                      {dropdownItem.status === "learn" && (
                        <IoIosCheckmarkCircle
                          size={16}
                          style={{ marginRight: "5px", color: "green" }}
                        />
                      )}
                      {dropdownItem.status === "failed" && (
                        <FaRegCircleXmark
                          size={16}
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      {dropdownItem.status !== "passed" &&
                        dropdownItem.status !== "failed" &&
                        dropdownItem.iconType === "pen" && (
                          <FaPen size={16} style={{ marginRight: "5px" }} />
                        )}
                      {dropdownItem.iconType === "play" && (
                        <FaPlayCircle
                          size={16}
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      {dropdownItem.iconType === "doc" && (
                        <IoDocumentText
                          size={16}
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      <div>{dropdownItem.time}</div>
                    </div>
                  </div>
                </DropdownItem>
              ))}
            </DropdownContainer>
          )}
        </div>
      ))}
    </>
  );
};
