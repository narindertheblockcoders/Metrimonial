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



  return (
    <>
      <div className="new-dashboard">
        <SideBar />

        <section className="profile-sec pb-0 profile-sects">
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
                
                <div className="Cards-head ">
                {users?.map((item,id)=> {
                  return(
                  <div class="card " id="card-settings">
                    <img
                      src={item.avatar}
                      class="card-img-top"
                      alt="..."
                    />
                    <div key={id} class="card-body">

                      <div className="card-body-parts">
                      <h5 class="card-title">Name:-  </h5>
                      <h5 class="card-title" id="card-title"> {item.name} </h5></div>

                      <div className="card-body-parts">
                      <h5 class="card-title">Email:- </h5>
                      <h5 class="card-title" id="card-title"> {item.email} </h5></div>

                      <div className="card-body-parts">
                      <h5 class="card-title">Phone:-  </h5>
                      <h5 class="card-title" id="card-title"> {item.phone} </h5></div>

                      <div className="card-body-parts">
                      <h5 class="card-title">Age:- </h5>
                      <h5 class="card-title" id="card-title"> {item.age}</h5></div>

                      <div className="card-body-parts">
                      <h5 class="card-title">Country:- </h5>
                      <h5 class="card-title" id="card-title"> {item.country}</h5></div>
                      <div className="card-body-parts">
                      <h5></h5>
                      <h5 class="card-title" id="more-detail">

                        <Link href={"/userDetails/"+ item.id} >
                        More details ..</Link>
                        </h5></div>

                    </div>
                    <div>
                      {/* <button>
                    Details
                      </button> */}
                    </div>
                  </div>
                  )
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
