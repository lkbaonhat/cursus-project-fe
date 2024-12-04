import TitlePages from "@/components/atoms/Title";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Our Blog", path: "/" },
  { name: "Blog View", path: " " },
];
const paragraphs = [
  {
    question: "Why did you decide to teach on Cursus?",
    content:
      "Nam a egestas libero, eget eleifend turpis. Sed id ipsum a ipsum aliquam laoreet sit amet sit amet nibh. Proin dapibus, libero sed posuere rhoncus, orci mi cursus enim, at accumsan eros massa lacinia mi. Nunc eget finibus felis, volutpat malesuada sem. Aliquam ac nisl pellentesque, varius neque sit amet, porttitor nunc. Nullam elit tellus, dapibus non eleifend sed, hendrerit eget velit. Aliquam ut felis dictum, tincidunt magna vitae, aliquam massa. In porttitor tristique quam, non dignissim sapien pharetra ultrices. Cras non ante non velit mollis mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque et bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl.",
  },
  {
    question:
      "Did you have any prior on- or offline teaching experience prior to publishing your first Cursus course?",
    content:
      "Morbi lectus nunc, lacinia ut consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna. Quisque interdum ac enim eu tempus. Fusce viverra, lectus egestas tincidunt cursus, tortor sapien convallis metus, vitae auctor risus metus vel nisi. Aenean dapibus bibendum mauris ut iaculis.",
  },
  {
    question: "What are the most rewarding aspects of teaching on Cursus?",
    content:
      "Quisque et bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl.",
  },
];

const BlogDetail = () => {
  const [views, setViews] = useState<number>(0);

  const hasRun = useRef(false); 

  useEffect(() => {
    if (typeof window !== "undefined" && !hasRun.current) {
      let currentViews = parseInt(localStorage.getItem("views") || "0", 10);

      currentViews += 1;

      localStorage.setItem("views", currentViews.toString());

      setViews(currentViews);
      hasRun.current = true;
    }
  }, []);
  return (
    <div className="Blog-Page">
      <TitlePages breadcrumbs={breadcrumbs} titleName="Blog" />
      <div className="Blog-Detail">
        <img
          src="https://gambolthemes.net/html-items/cursus-new-demo/images/blog/big_blog.jpg"
          alt=""
        />
        <div className="view">
          <p>{views} views - November 7, 2024</p>
        </div>
        <div className="Content">
          {paragraphs.map((item, index) => (
            <div key={index}>
              <h3>{item.question}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <div className="previous-section">
          <GrPrevious className="GrPrevious" />
          <div className="text-container">
            <div className="prev">Previous</div>
            <div className="prev-title">
              Lorem ipsum dolor sit amet,
              <br /> consectetur adipiscing elit.
            </div>
          </div>
        </div>
        <div className="next-section">
          <div className="text-container">
            <div className="next">Next</div>
            <div className="next-title">
              Vestibulum vulputate nulla quis
              <br />
              <span className="right-text">dignissim ultricies.</span>
            </div>
          </div>
          <GrNext className="GrNext" />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
