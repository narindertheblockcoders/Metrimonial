import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const SideBar = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  async function logOutHandler(event) {
    event.preventDefault();
    signOut();
  }
  async function sidebarHide() {
    // document.getElementsByClassName("sidebar")[0].style.left="-300px"
  }

  return (
    <div>
      <div className={toggle ? "" : "toggle-sidebar"}>
        <button
          onClick={() => setToggle(!toggle)}
          className="btn primary bi bi-list toggle-sidebar toggle-settings"
          id="toggle-setting"
        >
          {" "}
          {/* <img id="arrow-id" src="/others/arws.webp" /> */}
        </button>
        <aside className=" sidebar ">
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            data-bs-dismiss="sidebar"
            id="sidebar-close-btn"
            onClick={() => setToggle(!toggle)}
          ></button>
          <ul className="sidebar-nav" id="sidebar-nav">
            <a className="navbar-brand" href="/" id="href-set">
              <img id="logo-id" className="mb-5" src="/navbar/new-logo.png" />
            </a>
            {/* <div className="profile-menu">
              <img
                className="profileImage"
                id="profilePictureMenu"
                alt=""
              />
              <div className="profile-info overflowHidden" title="">
              </div>
            </div> */}

            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                {/* <img src="/others/dashboard.png"/> */}
                <i className="bi bi-columns-gap" id="i-class"></i>
                <span className="spanic">DASHBOARD</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#allprofile-nav"
                data-bs-toggle="collapse"
              >
                <i className="bi bi-people-fill " id="i-class"></i>
                <span className="spanic">REGISTER USERS</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="allprofile-nav"
                className="nav-content collapse show"
                data-bs-parent="#allprofile-nav"
              >
                <li>
                  <a href="/users/totalUsers">
                    <i className="fa fa-circle"></i>
                    <span>LIST OF ALL PROFILES </span>
                  </a>
                </li>
                <li>
                  <a href="/profileStatus/adminApprove">
                    <i className="fa fa-circle"></i>
                    <span> APPROVED PROFILES </span>
                  </a>
                </li>
                <li>
                  <a href="/profileStatus/disaproveProfile">
                    <i className="fa fa-circle"></i>
                    <span> DISAPPROVED PROFILES </span>
                  </a>
                </li>
                {/* <li>
                  <a href="/profileStatus/activeProfiles">
                    <i className="fa fa-circle"></i>
                    <span>ACTIVE PROFILES </span>
                  </a>
                </li>
                <li>
                  <a href="/profileStatus/inactiveProfiles">
                    <i className="fa fa-circle"></i>
                    <span>INACTIVE PROFILES </span>
                  </a>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#testimonial-nav"
                data-bs-toggle="collapse"
              >
                <img src="/others/qoute.png" id="i-class-img"></img>
                <span className="spanic">TESTIMONIALS</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="testimonial-nav"
                className="nav-content collapse show"
                data-bs-parent="#testimonial-nav"
              >
                <li>
                  <a href="/master/happyCoupleLatest">
                    <i className="fa fa-circle"></i>
                    <span>LIST OF TESTIMONIALS </span>
                  </a>
                </li>

                <li>
                  <a href="/master/addCoupleDescription">
                    <i className="fa fa-circle"></i>
                    <span>ADD TESTIMONIALS</span>
                  </a>
                </li>

                {/* <li>
                  <a href="/master/query">
                    <i className="fa fa-circle"></i>
                    <span>EDIT TESTIMONIALS</span>
                  </a>
                </li> */}

                {/* <li>
                  <a href="/master/query">
                    <i className="fa fa-circle"></i>
                    <span>DELETE TESTIMONIALS</span>
                  </a>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#social-nav"
                data-bs-toggle="collapse"
              >
                <i className="bi bi-slack" id="i-class"></i>
                <span className="spanic">SOCIAL MEDIA</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="social-nav"
                className="nav-content collapse show"
                data-bs-parent="#social-nav"
              >
                <li>
                  <a href="/master/addSocialMedia">
                    <i className="fa fa-circle"></i>
                    <span>UPDATE SOCIAL MEDIA LINKS</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#network-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                <img src="/others/table.png" id="i-class-img"></img>
                <span className="spanic">MASTER TALBLES</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="network-nav"
                className="nav-content collapse show"
                data-bs-parent="#network-nav"
              >
                <li>
                  <a href="/master/addCountry">
                    <i className="fa fa-circle"></i>
                    <span>COUNTRY</span>
                  </a>
                </li>
                <li>
                  <a href="/master/addState">
                    <i className="fa fa-circle"></i>
                    <span>STATE </span>
                  </a>
                </li>
                <li>
                  <a href="/master/addCity">
                    <i className="fa fa-circle"></i>
                    <span>CITY</span>
                  </a>
                </li>

                <li>
                  <a href="/master/addCollege">
                    <i className="fa fa-circle"></i>
                    <span>COLLEGE</span>
                  </a>
                </li>

                <li>
                  <a href="/master/addEducation">
                    <i className="fa fa-circle"></i>
                    <span>QUALIFICATION</span>
                  </a>
                </li>

                <li>
                  <a href="/master/addProfession">
                    <i className="fa fa-circle"></i>
                    <span>PROFESSION</span>
                  </a>
                </li>

                <li>
                  <a href="/master/addMotherTongue">
                    <i className="fa fa-circle"></i>
                    <span>MOTHER TONGUE</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#banner-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                {/* <i className="bi bi-badge-ad-fill" id="i-class"></i> */}
                <img src="/others/adverticement.png" id="i-img"></img>
                <span className="spanic">ADVERTISE BANNER</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="banner-nav"
                className="nav-content collapse show"
                data-bs-parent="#banner-nav"
              >
                <li>
                  <a href="/master/advertisement">
                    <i className="fa fa-circle"></i>
                    <span>MANAGE BANNERS</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#ques-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                <i className="bi bi-question-square-fill" id="i-class"></i>
                <span className="spanic">FREQUENTLY ASKED QUESTIONS</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="ques-nav"
                className="nav-content collapse show"
                data-bs-parent="#ques-nav"
              >
                <li>
                  <a href="/faq/allFaq">
                    <i className="fa fa-circle"></i>
                    <span>FREQUENTLY ASKED QUESTIONS</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#legal-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                {/* <i className="bi bi-person-heart" id="i-class"></i> */}
                <i className="bi bi-file-person" id="i-class"></i>
                <span className="spanic">LEGAL</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="legal-nav"
                className="nav-content collapse show"
                data-bs-parent="#legal-nav"
              >
                <li>
                  <a href="/explore/aboutUs">
                    <i className="fa fa-circle"></i>
                    <span>ABOUT US</span>
                  </a>
                </li>
                <li>
                  <a href="/explore/terms">
                    <i className="fa fa-circle"></i>
                    <span>TERMS OF USE </span>
                  </a>
                </li>
                <li>
                  <a href="/explore/privacyPolicy">
                    <i className="fa fa-circle"></i>
                    <span>PRIVACY POLICY</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <button
                className="nav-link"
                type="submit"
                onClick={logOutHandler}
                style={{ border: "none" }}
              >
                {/* <i className="bi bi-box-arrow-right " id="i-class"></i> */}
                <i className="bi bi-box-arrow-left" id="  "></i>
                <span className="spanic"> LOGOUT</span>
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
