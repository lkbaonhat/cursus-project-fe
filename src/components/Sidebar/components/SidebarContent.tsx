import styled from 'styled-components';
import { useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

interface SlideItem {
  icon?: ReactNode;
  content: string;
  dropdownItems?: { label: string; link: string }[];
  link?: string;
}

interface SideContentProps {
  items: SlideItem[];
  isOpen?: boolean;
  color: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
  activeBackgroundColor?: string;
  activeColor?: string;
  hoverEnabled: boolean;
  activeEnabled: boolean;
}

// Sidebar item with hover and active actions
const SidebarItem = styled(NavLink) <{
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
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: ${({ color }) => color || 'black'};
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  ${({ hoverEnabled, hoverBackgroundColor, hoverColor }) =>
    hoverEnabled &&
    `&:hover {
      background-color: ${hoverBackgroundColor || 'inherit'};
      color: ${hoverColor || 'inherit'};
    }`}

  ${({ activeEnabled, activeBackgroundColor, activeColor }) =>
    activeEnabled &&
    `&:active {
      background-color: ${activeBackgroundColor || 'inherit'};
      color: ${activeColor || 'inherit'};
    }`}

  &.active {
    background-color: ${({ activeBackgroundColor }) =>
    activeBackgroundColor || 'inherit'};
    color: ${({ activeColor }) => activeColor || 'inherit'};
  }
`;

const IconContainer = styled.div`
  margin-right: 15px;
`;

const ContentLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const DropdownIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled(NavLink) <{
  color: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
}>`
  padding: 10px 50px;
  font-size: 14px;
  display: flex;
  justify-content: start;
  cursor: pointer;
  color: ${({ color }) => color || 'black'};
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

  const { t } = useTranslation(['sidebar']);

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          {item.dropdownItems ? (
            <SidebarItem
              as='div'
              to={''}
              color={color}
              hoverBackgroundColor={hoverBackgroundColor}
              hoverColor={hoverColor}
              activeBackgroundColor={activeBackgroundColor}
              activeColor={activeColor}
              hoverEnabled={hoverEnabled}
              activeEnabled={activeEnabled}
              onClick={() => toggleDropdown(index)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconContainer>{item.icon}</IconContainer>
                <ContentLabel>{t(item.content)}</ContentLabel>
              </div>
              {isOpen && (
                <DropdownIcon>
                  <IoMdArrowDropdown size={20} />
                </DropdownIcon>
              )}
            </SidebarItem>
          ) : (
            <SidebarItem
              to={item.link || '#'}
              color={color}
              hoverBackgroundColor={hoverBackgroundColor}
              hoverColor={hoverColor}
              activeBackgroundColor={activeBackgroundColor}
              activeColor={activeColor}
              hoverEnabled={hoverEnabled}
              activeEnabled={activeEnabled}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconContainer>{item.icon}</IconContainer>
                <ContentLabel>{t(item.content)}</ContentLabel>
              </div>
            </SidebarItem>
          )}

          {isOpen && item.dropdownItems && openDropdownIndex === index && (
            <DropdownContainer>
              {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                <DropdownItem
                  key={dropdownIndex}
                  to={dropdownItem.link}
                  color={color}
                  hoverBackgroundColor={hoverBackgroundColor}
                  hoverColor={hoverColor}
                >
                  {t(dropdownItem.label)}
                </DropdownItem>
              ))}
            </DropdownContainer>
          )}
        </div>
      ))}
    </>
  );
};
