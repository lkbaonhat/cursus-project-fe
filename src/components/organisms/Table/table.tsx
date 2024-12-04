import React, { useState } from "react";
import styled from "styled-components";
import MyCourses from "./MyCourses";
import MyPurchases from "./MyPurchases";
import UpcomingCourses from "./UpcomingCourses";
import Discounts from "./Discount";
import { IoPricetagOutline } from "react-icons/io5";
import { BsUpload, BsDownload } from "react-icons/bs";
import { LuBookMinus } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";


export const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
`;


export const Button = styled.button`
  background-color: #D72127;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #A72127;
  }
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 10px 20px;
  background-color: #F7F7F7;
  border-bottom: 1px solid #ddd;
`;

export const NavItem = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center; 
  color: #000; 
  flex: 1; 
  border-radius: 3px;

  &.active {
    background-color: #D72127;
    color: #fff;
  }

  &:hover {
    background-color: #D72127;
    color: #fff;
  }
`;

export const NavIcon = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 10px;
  padding-bottom: 25px;
`;

export const TableContainer = styled.div`
  padding: 20px;
  background-color: #fff;
`;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 10px;
    background-color: #FFECEC;
    font-weight: bold;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;

    &.active {
      color: #D72127;
    }
  }
`;

const Courses = () => {
  const [activeTab, setActiveTab] = useState("My Courses");

  const handleTabChange = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  return (
    <CoursesContainer>
      <Header>
        <Title>
        <LuBookMinus />
          Jump Into Course Creation
        </Title>
        <Button>Create Your Course</Button>
      </Header>
      <Nav>
        {["My Courses", "My Purchases", "Upcoming Courses", "Discounts", "Promotions"].map((tab, index) => (
          <NavItem
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabChange(tab)}
          >
            {index === 0 && <NavIcon><LuBookMinus /></NavIcon>} 
            {index === 1 && <NavIcon><BsDownload /></NavIcon>} 
            {index === 2 && <NavIcon><BsUpload /></NavIcon>} 
            {index === 3 && <NavIcon><IoPricetagOutline /></NavIcon>} 
            {index === 4 && <NavIcon><GrAnnounce /></NavIcon>} 
            {tab} 
          </NavItem>
        ))}
      </Nav>
      <TableContainer>
        {activeTab === "My Courses" && (
          <Table >
            <thead>
              <tr>
              <th>Item No.</th>
                <th>Title</th>
                <th>Publish Date</th>
                <th>Sales</th>
                <th>Parts</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
                
              </tr>
            </thead>
          <MyCourses idItemmc={"321"} titlemc={"123"}  datemc={"123"} salemc={"123"} 
          partsmc={"123"} categorymc={"123"} statusmc={"123"} actionmc={"123"}/>
          </Table>
        )}
        {activeTab === "My Purchases" && (
          <Table>
            <thead>
              <tr>
              <th>Item No.</th>
                <th>Title</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Delivery Type</th>
                <th>Price</th>
                <th>Purchase Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <MyPurchases idItemmp={"456"} titlemp={"456"} vendormp={"456"} categorymp={"456"} 
            detypemp={"456"} pricemp={"456"} pudatemp={"456"} actionmp={"456"} />
          </Table>
        )}
                {activeTab === "Upcoming Courses" && (
          <Table>
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Title</th>
                <th>Thumbnail</th>
                <th>Category</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <UpcomingCourses idItemuc={"789"} titleuc={"789"} thumuc={"789"} categoryuc={"789"} 
            priceuc={"789"} dateuc={"789"} statusuc={"789"} actionuc={"789"} />
          </Table>
        )}
                {activeTab === "Discounts" && (
          <Table>
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Course</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <Discounts idItemdi={"000"} coursedi={"000"} sdatedi={"000"} edatedi={"000"} 
            disdi={"000"} statusdi={"000"} actiondi={"000"} />
          </Table>
        )}
      </TableContainer>
    </CoursesContainer>
  );
};

export default Courses;
