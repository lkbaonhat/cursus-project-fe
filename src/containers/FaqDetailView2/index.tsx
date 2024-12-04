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
  { name: "Payments", path: " " },
];


const InstructorTopics = () => (
  <div className="instructor-topics-2">
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


const ArticleContent: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    
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
      <div className="article-content-2">
        <h3>Taxes</h3>
        <a href="link1">{highlightText("Common Instructor Questions About The W-8BEN", searchQuery)}</a><br />
        <a href="link2">{highlightText("Taxes: What do Instructors Need to Submit to Cursus?", searchQuery)}</a><br />
        <a href="link3">{highlightText("What Does Cursus do With my Tax Information (i.e. Withholding)?", searchQuery)}</a><br />
        <a href="link4">{highlightText("How do I Submit my Tax Forms to Cursus?", searchQuery)}</a><br />
       
        <a href="link6">{highlightText("How Does Cursus Handle VAT / GST?", searchQuery)}</a><br />
        <h3>Payments - General</h3>
        <a href="link7">{highlightText("How do I Earn Revenue From Cursus for Business?", searchQuery)}</a><br />
        <a href="link8">{highlightText("How to opt out of Cursus for Business", searchQuery)}</a><br />
        <a href="link9">{highlightText("Payoneer FAQ", searchQuery)}</a><br />
        <a href="link10">{highlightText("Missing Instructor Payments", searchQuery)}</a><br />
        <a href="link11">{highlightText("Instructor Revenue Share", searchQuery)}</a><br />
        <a href="link12">{highlightText("Instructor Revenue Report", searchQuery)}</a><br />
        <a href="link13">{highlightText("Instructor Payment Overview", searchQuery)}</a><br />
        <a href="link14">{highlightText("How do I Opt Into the Affiliate Program?", searchQuery)}</a><br />

    </div>
    )};


const FaqDetailView2: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="faq-detail-2">
      <div className="header-title-2">
        <TitlePages
          breadcrumbs={breadcrumbs}
          titleName="Payments"
        />
        <div className="search-bar-2">
          <input type="text" placeholder="Search..." value={searchQuery}
            onChange={handleSearchChange} />
          <IoMdSearch className="search-icon-2" />
        </div>
      </div>
      <div className="faq-detail-body-2">
        <div className="left-column-2">
          <InstructorTopics />
          
          
        </div>

        <div className="article-content-2">
          <ArticleContent searchQuery={searchQuery}/>
        </div>
      </div>
    </div>
  );
};

export default FaqDetailView2;
