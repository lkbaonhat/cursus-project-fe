import { useState } from "react";
import styled from "styled-components";

interface TabProps {
    tabs: Array<{
    index: number;
    name: string;
    state: boolean;
    icon: React.ReactNode;
    component: React.ReactNode;
  }>;
}

const BoxTab = styled.div<{ active: boolean }>`
  width: 100%;
  min-height: 46px;
  background-color: ${(props) => (props.active ? "red" : "white")};
  border: 1px solid #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Thêm hiệu ứng chuyển màu */
`;

const TabName = styled.div<{ active: boolean }>`
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TabContent = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  min-height: 100px;
  transition: opacity 0.3s ease; /* Thêm hiệu ứng fade-in */
  opacity: 1;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabCol3 = (props: TabProps) => {
  const [listTab1, setListTab1] = useState(props.tabs);

  // Hàm xử lý khi tab được click
  const handleTabClick = (clickedName: string) => {
    const updatedTabs = listTab1.map((item) =>
      item.name === clickedName ? { ...item, state: true } : { ...item, state: false }
    );
    setListTab1(updatedTabs);
  };

  return (
    <div style={{width: '100%'}} >
      <div 
        //  style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}
        className="row"
        style={{marginLeft:'-1px', marginRight:'-1px'}}
      >
        {listTab1.map((item, index) => (
          <div key={index} 
            // style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '30%'}}
            className="d-flex justify-content-center col-lg-4 col-xs-12 p-0"
          >
            <BoxTab active={item.state} onClick={() => handleTabClick(item.name)}>
              <TabName active={item.state}>{item.icon} {item.name}</TabName>
            </BoxTab>
          </div>
        ))}
      </div>

      {/* Render nội dung tab với hiệu ứng */}
      <TabContent>
        {listTab1.find((tab) => tab.state)?.component}
      </TabContent>
    </div>
  );
};

export default TabCol3;
