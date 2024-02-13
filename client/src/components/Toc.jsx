import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TOC = ({ postContent, setModifiedContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHeadingID, setCurrentHeadingID] = useState();
  const listWrapperRef = useRef(null);
  const wrapperRef = useRef(null);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(postContent, "text/html");
    const headingNodeList = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const newHeadings = Array.from(headingNodeList).map((heading) => {
      const content = heading.textContent.trim();
      const level = parseInt(heading.tagName.charAt(1));
      const id = `heading-${content.toLowerCase().replace(/\s+/g, "-")}`;
      const oldHeading = heading.outerHTML;
      heading.dataset.id = id;
      heading.dataset.ref = id;
      const updatedHeading = heading.outerHTML;
      return { content, level, id, updatedHeading, oldHeading };
    });
    setHeadings(newHeadings);
    let modifiedContent = postContent;
    newHeadings.forEach((heading) => {
      modifiedContent = modifiedContent.replace(
        heading.oldHeading,
        heading.updatedHeading
      );
    });
    setModifiedContent(modifiedContent);
  }, [postContent, setModifiedContent]);

  const handleClick = (id) => {
    const element = document.querySelector(`[data-id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setCurrentHeadingID(id);
      setIsOpen(false);
    }
  };


  return (
    <div
      className="sticky z-30 top-0 bg-neutral-50 border-b-2 py-2 text-sm"
      ref={wrapperRef}
    >
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-gray-100 rounded-lg p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </button>
        <span>Table of Content</span>
      </div>
      <div
        className={`absolute z-50 top-[103%] inset-x-0 bg-neutral-50 drop-shadow rounded-b-2xl overflow-hidden transition-[height] duration-200 ${
          isOpen ? "h-60 visible" : "h-0 invisible"
        }`}
      >
        <div className="p-4 h-full overflow-scroll" ref={listWrapperRef}>
          {headings.map((heading) => (
            <button
              key={heading.id}
              style={{ paddingLeft: heading.level * 7 + "px" }}
              className={`flex w-full my-1 py-2 pr-2 rounded-md font-bold ${
                currentHeadingID === heading.id
                  ? "bg-[#081b4b] text-white text-left"
                  : "hover:bg-gray-100"
              }`}
              title={heading.content}
              onClick={() => handleClick(heading.id)}
            >
              {heading.content}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TOC;
