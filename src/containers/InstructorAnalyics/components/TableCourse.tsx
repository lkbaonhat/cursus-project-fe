import TableDynamic from "@/components/organisms/Table/TableDynamic";

function TableCourse() {
  const data = [
    {
      id: "001",
      imgUrl:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-2.jpg",
      title: "Course Title Here",
      purchases: 100,
      comments: 10,
      views: 200,
    },
    {
      id: "002",
      imgUrl:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-3.jpg",
      title: "Course Title Here",
      purchases: 100,
      comments: 10,
      views: 200,
    },
  ];

  const columns = [
    {
      title: "Item No.",
      dataIndex: "id",
    },
    {
      title: "Thumbnail",
      dataIndex: "imgUrl",
      render: (url: string) => (
        <img src={url} style={{ width: 150, height: 100 }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Purchases",
      dataIndex: "purchases",
    },
    {
      title: "Comments",
      dataIndex: "comments",
    },
    {
      title: "Views",
      dataIndex: "views",
    },
  ];

  return (
    <div>
      <TableDynamic data={data} columns={columns} />
    </div>
  );
}

export default TableCourse;
