import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const SideBar = () => {
  const router  = useRouter();
  const [toggle, setToggle] = useState(false);

  async function logOutHandler(evnet){
    
    window.localStorage.clear();
    router.push("/login")
  }

  return (
    <div>
      <div className={toggle ? "" : "toggle-sidebar"}>
        <button
          onClick={() => setToggle(!toggle)}
          className="btn primary bi bi-list toggle-sidebar"
          id="toggle-setting"
        >
          {" "}
          {/* <img id="arrow-id" src="/others/arws.webp" /> */}
        </button>
        <aside className=" sidebar ">
          <ul className="sidebar-nav" id="sidebar-nav">
            <a className="navbar-brand" href="/" id="href-set">
              <img id="logo-id" src="/navbar/logo.png" />
            </a>
            <div className="profile-menu">
              <img
                className="profileImage"
                id="profilePictureMenu"
                // src={avatar}
                alt=""
              />
              <div className="profile-info overflowHidden" title="">
                {/* {tokenData?.firstName} */}
              </div>
            </div>

            <li className="nav-item">
              <a className="collap" href="/dashboard">
                {/* <img src="/others/dashboard.png"/> */}
                <i className="fa-regular fa-grid"></i>

                <span className="dash-texts">Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                <i className="fa fa-user " id="i-class"></i>
                <span className="spanic">USERS</span>
                <i className="fa fa-chevron-down" id="icon-cd"></i>
              </a>
              <ul
                id="components-nav"
                className="nav-content collapse show"
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="/users/totalUsers">
                    <i className="fa fa-circle"></i>
                    <span>USER PROFILE</span>
                  </a>
                </li>

                {/* <li>
                  <a href="#">
                    <i className="fa fa-circle"></i>
                    <span>BLOCK USERS</span>
                  </a>
                </li> */}
                {/* <li>
                  <a href="#">
                    <i className="fa fa-circle"></i>
                    <span>UNBLOCK USERS</span>
                  </a>
                </li> */}

                {/* <li>
                  <a href="/changePassword">
                    <i className="fa fa-circle"></i>
                    <span>CHANGE PASSWORD </span>
                  </a>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#network-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                <i className="fa fa-network-wired " id="i-class"></i>
                <span className="spanic">MASTER</span>
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
                    <span>DEGREE</span>
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
              <button className="nav-link"
              type="submit" 
              onClick={logOutHandler}
              style={{border:"none"}} 
              >
                                {/* <i className="bi bi-box-arrow-right " id="i-class"></i> */}
                                <i class="bi bi-box-arrow-left" id="  "></i>
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