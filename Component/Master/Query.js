import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
    import axios from "axios";


const Query = () => {
  const [contactData, setContactData] = useState()
 
    async function contactUsFunction(){
    const res = await axios.post("/api/master/contactUs")
    const response = res.data
    console.log(response.data,"contact us data")
    setContactData(response.data)
    }

    useEffect(()=>{
        contactUsFunction()
    },[])



  return (
    <div>
      <ToastContainer />
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
                  QUERY
                </h3>

                <div className="search-bar-sec">
                  <div className="input-group mb-1" id="search-bar-set">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search"
                      onChange={(e) => serachFn(e)}
                    />
                  </div>

                  <div className="rangePicker-Div">
              
                  
</div>
</div>
                <div className="Cards-head mt-0">

                    {contactData?.map((item)=>{
                        return(         
                          <div className="card " id="card-settings">
                       
                            <div  className="card-body">
                              <div className="card-body-parts">
                                <h5 className="card-title">First Name:- </h5>
                                <h5
                                  className="card-title name-title"
                                  id="card-title"
                                >
                                  {" "}
                                  Nikhil
                                  {item.firstName}{" "}
                                </h5>
                              </div>
                              <div className="card-body-parts">
                                <h5 className="card-title">Last Name:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.lastName}{" "}
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
                                <h5 className="card-title">Message:- </h5>
                                <h5 className="card-title" id="card-title">
                                  {" "}
                                  {item.message}
                                </h5>
                              </div>

                         
                             
                            </div>
                            <div></div>
                          </div>
                        );
                      })
                    } 
                </div>
                {/* <div className="paginate-sec">
                  <ReactPaginate
                    previousLabel="← Previous"
                    nextLabel="Next →"
                    onPageChange={Pagination}
                    pageCount={Math.ceil(users?.length / postsPerPage)}
                    containerClassName="pagination"
                    previousLinkClassName="pagination__link"
                    nextLinkClassName="pagination__link"
                    disabledClassName="pagination__link--disabled"
                    activeClassName="pagination__link--active"
                    className="page-link"
                  />
                </div> */}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Query