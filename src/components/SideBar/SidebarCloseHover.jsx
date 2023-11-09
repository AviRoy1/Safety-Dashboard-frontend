import React from "react";
import { VuesaxOutlineDiagram } from "../icons/VuesaxOutlineDiagram";
import { VuesaxOutlineDocumentText } from "../icons/VuesaxOutlineDocumentText";
import { VuesaxOutlineLogout1 } from "../icons/VuesaxOutlineLogout1";
import { VuesaxOutlineMessageQuestion } from "../icons/VuesaxOutlineMessageQuestion/VuesaxOutlineMessageQuestion";
import { VuesaxOutlineSetting21 } from "../icons/VuesaxOutlineSetting21/VuesaxOutlineSetting21";
import { VuesaxOutlineVideo } from "../icons/VuesaxOutlineVideo/VuesaxOutlineVideo";
import styled from "styled-components";
import "./index.css";
import video from "../../images/video.png";
import diagram from "../../images/diagram.png";
import received from "../../images/received.png";
import report from "../../images/report.png";
import setting from "../../images/setting.png";
import training from "../../images/training.png";
import support from "../../images/support.png";
import logout from "../../images/logout.png";
import logo from "../../images/logo.png";

export const SidebarCloseHover = () => {
  return (
    <div class="main">
      <img className="QUANT-VIZ-LOGO" alt="Quant VIZ LOGO" src={logo} />
      <div className="divider" />
      <div className="frame">
        <div className="navigation">
          <div className="link">
            <img src={video} />
            <div className="text-wrapper">Live</div>
          </div>
          <div className="link">
            <img src={diagram} className="icon-instance-node" />
            <div className="div">Analytics</div>
          </div>
          <div className="link-2">
            <img scr={report} className="icon-instance-node" />
            <div className="text-wrapper">Report</div>
          </div>
          <div className="link">
            <img src={support} className="icon-instance-node" />
            <div className="text-wrapper">Support</div>
          </div>
          <div className="link">
            <div className="vuesax-outline">
              <div className="overlap-group">
                <img className="vector" alt="Vector" src={training} />
              </div>
            </div>
            <div className="text-wrapper">Training</div>
          </div>
          <div className="link">
            <img src={setting} className="icon-instance-node" />
            <div className="text-wrapper">Settings</div>
          </div>
        </div>
        <div className="div-wrapper">
          <div className="div-wrapper">
            <div className="link">
              <img src={logout} className="icon-instance-node" />
              <div className="text-wrapper">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
