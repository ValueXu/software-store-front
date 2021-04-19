import React from "react";
import "./welcome.less";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import {
  FcAlarmClock,
  // FcBiohazard,
  FcBriefcase,
  FcFeedback,
  FcFilmReel,
  FcHeadset,
  FcHighBattery,
  FcHome,
  FcMultipleCameras,
  FcReadingEbook,
  FcShipped,
} from "react-icons/fc";
import HomeEntrance from "../../components/homeEntrance/HomeEntrance";

export default class Welcome extends React.Component {
  onWheel = (e) => {
    // e.preventDefault();
    let length = 50;
    if (e.deltaY < 0) {
      length = -length;
    }
    const headContent = document.getElementsByClassName("head-content")[0];
    headContent.scrollTo(
      headContent.scrollLeft + length,
      headContent.scrollTop
    );
  };

  render() {
    return (
      <div className="welcome">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="head">
          <div className="head-content">
            <div className="head-content-wrap" onWheel={this.onWheel}>
              <Link to="/">
                {/* <FcBiohazard className="head-content-icon" /> */}
                <FcHome className="head-content-icon" />
              </Link>
              <Link to="#">
                <FcAlarmClock className="head-content-icon" />
              </Link>
              <Link to="#">
                <FcBriefcase className="head-content-icon" />
              </Link>
              <Link to="#">
                <FcFilmReel className="head-content-icon" />
              </Link>
              <Link to="#">
                {" "}
                <FcFeedback className="head-content-icon" />
              </Link>
              <Link to="#">
                <FcHeadset className="head-content-icon" />
              </Link>
              <Link to="#">
                <FcHighBattery className="head-content-icon" />
              </Link>
              <Link to="#">
                <FcMultipleCameras className="head-content-icon" />
              </Link>
              <Link to="#">
                <FcShipped className="head-content-icon" />
              </Link>
            </div>
          </div>
          <div className="head-sign">
            <Link to="/signin">
              <FcReadingEbook className="signin-icon" />
            </Link>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content">
            {this.props.children ? this.props.children : <HomeEntrance />}
          </div>
        </div>
        <div className="footer-wrapper">
          <Footer />
        </div>
      </div>
    );
  }
}
