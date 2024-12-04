import React, { useState } from "react";
import TitlePages from "@/components/atoms/Title";
import { IoMdSearch } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CiRuler } from "react-icons/ci";
import { MdOutlineShowChart } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

import "./index.scss";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Selling & Promotion", path: "/help" },
  { name: "Pricing & Coupons", path: " " },
];


const InstructorTopics = () => (
  <div className="instructor-topics">
    <h3>Instructor Topics</h3>
    <ul>
      <li>
        <MdOutlinePayment className="icon" />
        Payments
      </li>
      <li>
        <IoStatsChart className="icon" />
        Selling & Promotion
      </li>
      <li>
        <HiOutlineDesktopComputer className="icon" />
        Quality Standards
      </li>
      <li>
        <CiRuler className="icon" /> Course Building
      </li>
      <li>
        <MdOutlineShowChart className="icon" /> Course Management
      </li>
      <li>
        <FiBookOpen className="icon" /> Trust & Safety
      </li>
    </ul>
  </div>
);

const RelatedArticles = () => (
  <div className="related-articles">
    <h3>Related Articles</h3>
    <ul>
      <li>Instructor Revenue Share</li>
      <li>Coupons & Course Referral Links: Rules and Guidelines</li>
      <li>Rules and Guidelines</li>
      <li>Instructor Promotional Agreements and Course Deals</li>
      <li>Cursus Coupons: FAQ</li>
      <li>How to Select Your Payout Method and Become a Premium Instructor</li>
    </ul>
  </div>
);
{/*  */}

const ArticleContent: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value); 
    };
    const highlightText = (text: string, query: string) => {
      if (!query) return text;
  
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          part
        )
      );
    };
    return (
      <div className="article-content">
      <p>
        {highlightText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat maximus pellentesque. Integer sem enim, luctus at nibh at, condimentum sagittis sapien. Sed tempus ipsum erat, sit amet efficitur velit interdum eu. Vestibulum hendrerit id dolor eu scelerisque. Phasellus ex dui, consequat nec feugiat eu, dapibus eget ante. Sed sodales interdum dui, at euismod mi feugiat hendrerit. Suspendisse auctor libero in tempor mollis. Nulla et dolor velit. Aliquam sit amet luctus quam."
        ,searchQuery)};
      </p>
      <h2>Course referral links</h2>
      <p>{highlightText(
        "Nam a egestas libero, eget eleifend turpis. Sed id ipsum a ipsum aliquam laoreet sit amet sit amet nibh. Proin dapibus, libero sed posuere rhoncus, orci mi cursus enim, at accumsan eros massa lacinia mi. Nunc eget finibus felis, volutpat malesuada sem. Aliquam ac nisl pellentesque, varius neque sit amet, porttitor nunc. Nullam elit tellus, dapibus non eleifend sed, hendrerit eget velit. Aliquam ut felis dictum, tincidunt magna vitae, aliquam massa. In porttitor tristique quam, non dignissim sapien pharetra ultrices. Cras non ante non velit mollis mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque et bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl. Etiam lobortis dictum tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse ultricies efficitur dui, suscipit tempus elit condimentum quis. Duis sed vestibulum tortor, eget cursus odio."
        ,searchQuery)};
      </p>
      <h3>How to create a coupon </h3>
      <ol>
        <li>{highlightText("Navigate to the course Promotions page",searchQuery)};</li>
        <li>{highlightText(
          "Click Create new coupon",searchQuery)};
        </li>
        <li>{highlightText("Select the coupon type",searchQuery)};</li>
        <li>{highlightText("If applicable, choose your coupon price",searchQuery)};</li>
        <li>{highlightText(
          "Edit the coupon code if you wish the coupon code must be between 6 and 20 characters, and can only contain alphanumeric characters (A-Z, 0-9) "
          ,searchQuery)};
          </li>
        <li>{highlightText(
          "Click Review coupon to double-check the coupon’s details",searchQuery)};
        </li>
        <li>
          Click <strong>Create coupon</strong>
        </li>
      </ol>
      <h3>How to share your coupon code</h3>
      <p>{highlightText(
        "Morbi lectus nunc, lacinia ut consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna. Quisque interdum ac enim eu tempus. Fusce viverra, lectus egestas tincidunt cursus, tortor sapien convallis metus, vitae auctor risus metus vel nisi. Aenean dapibus bibendum mauris ut iaculis."
        ,searchQuery)}
      </p>
      <h3>How to deactivate a coupon</h3>
      <p>{highlightText(
        "Quisque et bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl."
        ,searchQuery)}
      </p>
      <p>{highlightText(
        "Was this review helpful?"
        ,searchQuery)}
        <label className={`option-label ${selectedOption === "yes" ? "selected" : ""}`}>
        <input
          type="radio"
          name="option"
          value="yes"
          checked={selectedOption === "yes"}
          onChange={handleOptionChange}
        />
        Yes
      </label>
      <label className={`option-label ${selectedOption === "no" ? "selected" : ""}`}>
        <input
          type="radio"
          name="option"
          value="no"
          checked={selectedOption === "no"}
          onChange={handleOptionChange}
        />
        No
      </label>
      </p>
    </div>


    )};


const FaqDetailView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="faq-detail">
      <div className="header-title">
        <TitlePages
          breadcrumbs={breadcrumbs}
          titleName="Promote Your Course With Coupons and Referral Links"
        />
        <div className="search-bar">
          <input type="text" placeholder="Search..." value={searchQuery}
            onChange={handleSearchChange} />
          <IoMdSearch className="search-icon" />
        </div>
      </div>
      <div className="faq-detail-body">
        <div className="left-column">
          <InstructorTopics />
          <RelatedArticles />
          
        </div>

        <div className="article-content">
          <ArticleContent searchQuery={searchQuery}/>
        </div>
      </div>
    </div>
  );
};

export default FaqDetailView;
