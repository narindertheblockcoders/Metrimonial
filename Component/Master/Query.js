import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
    import axios from "axios";
import ReactPaginate from "react-paginate";


const Query = () => {
  const [contactData, setContactData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [searchData, setSearchData] = useState();
  const [fullData, setFullData] = useState()

    async function contactUsFunction(){
    const res = await axios.post("/api/master/contactUs")
    const response = res.data
    console.log(response.data,"contact us data")
    setContactData(response.data)
    setFullData(response.data)
    }

    useEffect(()=>{
        contactUsFunction()
    },[])


    async function serachFn(e) {
      console.log(e.target.value);
      const search = e.target.value;
      console.log(contactData, "old data here");
      const filteredData = contactData?.filter((item) => {
        const name = item?.firstName;
        return name?.toLowerCase().includes(search.toLowerCase());
      });
      console.log(filteredData, "to get the value of the filtered Data");
      const selected = 0;
      Pagination({ selected });
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const searchPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);
      console.log(searchPosts, "search post");
  
      setSearchData(searchPosts);
  
      if (search == "") {
        setSearchData(fullData);
        setContactData(fullData)
        console.log(fullData,"fullData here for you")
      } else {
        setSearchData(searchPosts);
      }
      // setUsers(searchData)
    }
  
     // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = contactData?.slice(indexOfFirstPost, indexOfLastPost);

  const Pagination = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchData(null);
    setContactData(contactData);
  };

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
                        <img  // src={"/arrow.svg"}
/>
                      </span>
                    </Link>{" "}
                  </span>
                USERS  QUERY
                </h3>

                <div className="search-bar-sec">
                  <div className="input-group mb-1" id="search-bar-set">
  
                             <input
                      type="text"
                      style={{ paddingLeft: "0px" }}
                      className="input-group-text "
                      placeholder="Search"
                      onChange={(e) => serachFn(e)}
                      id="search-bg-set"
                    />
                    <span className="form-control ">
                      <i className="bi bi-search" id="search-iColor"></i>
                    </span>
                  </div>
                  

                  <div className="rangePicker-Div">
              
                  
</div>
</div>
                <div className="Cards-head mt-0">
                {searchData == null?
                    currentPosts?.map((item)=>{
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

                              <div className="card-body-parts" id="massege-body-parts">
                                <h5 className="card-title">Message:- </h5>
                                <h5 className="card-title" id="card-title">
                                    
                                  {" "}
                                  {item.message}
                                </h5>
                              </div>

                         
                             
                            </div>
                            <div></div>
                          </div> 
                        )  
                        })
                          :searchData?.map((item)=>{
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

                              <div className="card-body-parts" id="massege-body-parts">
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




              <div className="paginate-sec">
                <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  onPageChange={Pagination}
                  pageCount={Math.ceil(
                    contactData?.length  / postsPerPage
                  )}
                  containerClassName="pagination"
                  previousLinkClassName="pagination__link"
                  nextLinkClassName="pagination__link"
                  disabledClassName="pagination__link--disabled"
                  activeClassName="pagination__link--active"
                  className="page-link"
                />
              </div>


            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Query