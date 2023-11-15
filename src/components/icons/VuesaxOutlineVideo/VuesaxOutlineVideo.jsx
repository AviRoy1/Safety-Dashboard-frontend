import React from "react";
import styled from "styled-components";
import "./index.css";

// const StyledVuesaxOutlineVideo = styled.svg`
//   &.vuesax-outline-video {
//     fill: none;
//     height: 24px;
//     viewBox: 0 0 24 24;
//     width: 24px;
//   }

//   & .path {
//     fill: #f9fafb;
//   }
// `;

export const VuesaxOutlineVideo = ({ className }) => {
  return (
    <div
      className={`vuesax-outline-video ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M12.88 20.8606H6.81C3.26 20.8606 2 18.3706 2 16.0506V7.95062C2 4.49062 3.35 3.14062 6.81 3.14062H12.88C16.34 3.14062 17.69 4.49062 17.69 7.95062V16.0506C17.69 19.5106 16.34 20.8606 12.88 20.8606ZM6.81 4.66062C4.2 4.66062 3.52 5.34062 3.52 7.95062V16.0506C3.52 17.2806 3.95 19.3406 6.81 19.3406H12.88C15.49 19.3406 16.17 18.6606 16.17 16.0506V7.95062C16.17 5.34062 15.49 4.66062 12.88 4.66062H6.81Z"
      />
      <path
        className="path"
        d="M20.7797 18.1085C20.3497 18.1085 19.7997 17.9685 19.1697 17.5285L16.4997 15.6585C16.2997 15.5185 16.1797 15.2885 16.1797 15.0385V8.95853C16.1797 8.70853 16.2997 8.47853 16.4997 8.33853L19.1697 6.46853C20.3597 5.63853 21.2297 5.87853 21.6397 6.08853C22.0497 6.30853 22.7497 6.87853 22.7497 8.32853V15.6585C22.7497 17.1085 22.0497 17.6885 21.6397 17.8985C21.4497 18.0085 21.1497 18.1085 20.7797 18.1085ZM17.6897 14.6385L20.0397 16.2785C20.4897 16.5885 20.8097 16.6185 20.9397 16.5485C21.0797 16.4785 21.2297 16.1985 21.2297 15.6585V8.33853C21.2297 7.78853 21.0697 7.51853 20.9397 7.44853C20.8097 7.37853 20.4897 7.40853 20.0397 7.71853L17.6897 9.35853V14.6385Z"
      />
      <path
        className="path"
        d="M11.5 11.75C10.26 11.75 9.25 10.74 9.25 9.5C9.25 8.26 10.26 7.25 11.5 7.25C12.74 7.25 13.75 8.26 13.75 9.5C13.75 10.74 12.74 11.75 11.5 11.75ZM11.5 8.75C11.09 8.75 10.75 9.09 10.75 9.5C10.75 9.91 11.09 10.25 11.5 10.25C11.91 10.25 12.25 9.91 12.25 9.5C12.25 9.09 11.91 8.75 11.5 8.75Z"
      />
    </div>
  );
};