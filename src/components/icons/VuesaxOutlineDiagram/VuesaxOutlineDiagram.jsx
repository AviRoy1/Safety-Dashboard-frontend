import React from "react";
import styled from "styled-components";
import "./index.css";

// const StyledVuesaxOutlineDiagram = styled.svg`
//   &.vuesax-outline-diagram {
//     fill: none;
//     height: 24px;
//     viewBox: 0 0 24 24;
//     width: 24px;
//   }

//   & .path {
//     fill: #F9FAFB;
//   }
// `;

export const VuesaxOutlineDiagram = ({ className }) => {
  return (
    <div
      className={`vuesax-outline-diagram ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M22 22.75H5C2.93 22.75 1.25 21.07 1.25 19V2C1.25 1.59 1.59 1.25 2 1.25C2.41 1.25 2.75 1.59 2.75 2V19C2.75 20.24 3.76 21.25 5 21.25H22C22.41 21.25 22.75 21.59 22.75 22C22.75 22.41 22.41 22.75 22 22.75Z"
      />
      <path
        className="path"
        d="M4.99982 17.7498C4.82982 17.7498 4.64982 17.6898 4.50982 17.5698C4.19982 17.2998 4.15982 16.8298 4.42982 16.5098L9.01982 11.1498C9.51982 10.5698 10.2398 10.2198 10.9998 10.1898C11.7598 10.1698 12.5098 10.4498 13.0498 10.9898L13.9998 11.9398C14.2498 12.1898 14.5798 12.3098 14.9298 12.3098C15.2798 12.2998 15.5998 12.1398 15.8298 11.8698L20.4198 6.50983C20.6898 6.19983 21.1598 6.15981 21.4798 6.42981C21.7898 6.69981 21.8298 7.16981 21.5598 7.48981L16.9698 12.8498C16.4698 13.4298 15.7498 13.7798 14.9898 13.8098C14.2298 13.8298 13.4798 13.5498 12.9398 13.0098L11.9998 12.0598C11.7498 11.8098 11.4198 11.6798 11.0698 11.6898C10.7198 11.6998 10.3998 11.8598 10.1698 12.1298L5.57982 17.4898C5.41982 17.6598 5.20982 17.7498 4.99982 17.7498Z"
      />
    </div>
  );
};
