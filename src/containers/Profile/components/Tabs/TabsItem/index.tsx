import React from "react";
import styled from "styled-components";
import { style } from "@/theme/index";

interface TabItemProps {
  name: string;
  index: number;
  active: number;
  onChangeTabs: (index: number) => void;
}

export const TabItem = styled.a`
  color: ${style.colors.black.title};
  background-color: transparent;
  text-decoration: none;
  padding: 10px 20px;
  display: inline-block;
  &:hover {
    color: ${style.colors.black.title};
    cursor: pointer;
  }
  &.active {
    border-bottom: 2px solid ${style.colors.red.bg};
  }
`;

export default function TabsItem(props: TabItemProps) {
  return (
    <TabItem
      className={props.index === props.active ? "active" : ""}
      onClick={() => props.onChangeTabs(props.index)}
    >
      {props.name}
    </TabItem>
  );
}
