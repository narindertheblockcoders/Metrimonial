import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Navbar from "../ui/Navbar";
import Router from "next/router";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const TotalUsers = () => {
  const [users, setUsers] = useState();
  const router = useRouter();
  const [searchData, setSearchData] = useState();

  async function getUsers() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsers", { token: token });
      const response = res.data;
      console.log(response.data, "to get the response from api to get users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function serachFn(e) {
    console.log(e.target.value);
    const search = e.target.value;
    const filteredData = users?.filter((item) => {
      const email = item?.email;
      const name = item?.name;
      const country = item?.country;
      return (
        email?.toLowerCase().includes(search.toLowerCase()) ||
        name?.toLowerCase().includes(search.toLowerCase()) ||
        country?.toLowerCase().includes(search.toLowerCase())
      );
    });
    console.log(filteredData, "to get the value of the filtered Data");
    setSearchData(filteredData);
  }

  return (
    <>
      <div className="new-dashboard">
        <SideBar />

        <section
          className="profile-sec pb-0 profile-sects"
          id="totalUserProfileSec"
        >
          <div className="container">
            <div className="row justify-content-center">
              <form className="input-sec mb-5" id="card-input-field">
                <h3 className="heading-text pink-text mt-5">
                  {/* {/ <Link href> /} */}
                  <span
                    className="arrows-icon"
                    style={{
                      position: "relative",
                      left: "-23%",
                      cursor: "pointer",
                    }}
                  >
                    {/* <img src={Arrow.src} />   */}
                    <Link href={"/users"}>
                      <span
                        className="arrows-icon  "
                        id="arrow-span"
                        style={{
                          position: "relative",
                          // left: "-20%",
                          // width:"150px",
                          // top:"40%",
                          marginTop: "40px",
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                        // src={"/arrow.svg"}
                        />
                      </span>
                    </Link>{" "}
                  </span>
                  USER PROFILE
                </h3>

                <div className="search-bar-sec">
                  <div className="input-group mb-1" id="search-bar-set">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search Country"
                      onChange={(e) => serachFn(e)}
                    />
                  </div>
                </div>

                <div className="Cards-head mt-0">
                  {searchData == null
                    ? users?.map((item, id) => {
                        return (
                          <div className="card " id="card-settings">
                            <img
                              src={item.avatar}
                              className="card-img-top"
                              alt="..."
                            />
                            <div key={id} className="card-body">
                              <div className="card-body-parts">
                                <h5 className="card-title">Name:- </h5>
                                <h5
                                  className="card-title name-title"
                                  id="card-title"
                                >
                                  {" "}
                                  {item.name}{" "}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Email:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.email}{" "}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Phone:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.phone}{" "}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Age:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.age}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Country:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.country}
                                </h5>
                              </div>
                              <div className="card-body-parts">
                                <h5></h5>
                                <h5 className="card-title" id="more-detail">
                                  <Link href={"/userDetails/" + item.id}>
                                    More details ..
                                  </Link>
                                </h5>
                              </div>
                            </div>
                            <div></div>
                          </div>
                        );
                      })
                    : searchData?.map((item, id) => {
                        return (
                          <div className="card " id="card-settings">
                            <img
                              src={item.avatar}
                              className="card-img-top"
                              alt="..."
                            />
                            <div key={id} className="card-body">
                              <div className="card-body-parts">
                                <h5 className="card-title">Name:- </h5>
                                <h5
                                  className="card-title name-title"
                                  id="card-title"
                                >
                                  {" "}
                                  {item.name}{" "}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Email:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.email}{" "}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Phone:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.phone}{" "}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Age:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.age}
                                </h5>
                              </div>

                              <div className="card-body-parts">
                                <h5 className="card-title">Country:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.country}
                                </h5>
                              </div>
                              <div className="card-body-parts">
                                <h5></h5>
                                <h5 className="card-title" id="more-detail">
                                  <Link href={"/userDetails/" + item.id}>
                                    More details ..
                                  </Link>
                                </h5>
                              </div>
                            </div>
                            <div></div>
                          </div>
                        );
                      })}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TotalUsers;
