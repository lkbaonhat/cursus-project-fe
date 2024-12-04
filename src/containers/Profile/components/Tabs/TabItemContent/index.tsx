import React from "react";

type TabItemContentProps = {
  Component: React.ComponentType;
};

export default function TabItemContent({ Component }: TabItemContentProps) {
  return <Component />;
}
