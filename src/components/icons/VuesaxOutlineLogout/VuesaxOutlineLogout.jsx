import React from "react";
import styled from "styled-components";

// const StyledVuesaxOutlineLogout = styled.svg`
//   .path {
//     fill: #292d32;
//   }

//   .g {
//     opacity: 0;
//   }
// `;

export const VuesaxOutlineLogout = ({ className }) => {
  return (
    <div
      className={`vuesax-outline-logout ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M17.44 15.37C17.25 15.37 17.06 15.3 16.91 15.15C16.62 14.86 16.62 14.38 16.91 14.09L18.94 12.06L16.91 10.03C16.62 9.74 16.62 9.26 16.91 8.97C17.2 8.68 17.68 8.68 17.97 8.97L20.53 11.53C20.82 11.82 20.82 12.3 20.53 12.59L17.97 15.15C17.82 15.3 17.63 15.37 17.44 15.37Z"
        fill="#292D32"
      />
      <path
        className="path"
        d="M19.93 12.81H9.76C9.35 12.81 9.01 12.47 9.01 12.06C9.01 11.65 9.35 11.31 9.76 11.31H19.93C20.34 11.31 20.68 11.65 20.68 12.06C20.68 12.47 20.34 12.81 19.93 12.81Z"
        fill="#292D32"
      />
      <path
        className="path"
        d="M11.76 20.75C6.61 20.75 3.01 17.15 3.01 12C3.01 6.85 6.61 3.25 11.76 3.25C12.17 3.25 12.51 3.59 12.51 4C12.51 4.41 12.17 4.75 11.76 4.75C7.49 4.75 4.51 7.73 4.51 12C4.51 16.27 7.49 19.25 11.76 19.25C12.17 19.25 12.51 19.59 12.51 20C12.51 20.41 12.17 20.75 11.76 20.75Z"
        fill="#292D32"
      />
      <g className="g" opacity="0" />
    </div>
  );
};
