import React from "react";

type ListComponentProps = {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
};

export default function ListComponent({
  data,
  renderItem,
}: ListComponentProps) {
  return <>{data.map((item) => renderItem(item))}</>;
}
