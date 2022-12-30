import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useRouter } from "next/router";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
import ReactPaginate from "react-paginate";

const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [oldData, setOldData] = useState([]);
  const [profile, setProfile] = useState();
  const [fromDate, setFromDate] = useState();
 const  [oldDate, setOldDate] =useState()

  async function getUsers() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsers", { token: token });
      const response = res.data;
      console.log(response.data, "to get the response from api to get users");
      setUsers(response.data);
      setOldData(response.data);
      setOldDate(response.data)
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
    console.log(oldData, "old data here");
    const filteredData = oldData?.filter((item) => {
      const name = item?.name;
      return name?.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filteredData, "to get the value of the filtered Data");
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const searchPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);
    setSearchData(searchPosts);
  }

  async function setDateFunction(e) {
    try{
     const zeroData = e[0].$d
     const firstData = e[1].$d
     console.log(oldDate,"old date here for l")
      const filteredDate = oldDate?.filter((item) => {

          const dateData = new Date(item?.createdAt).toLocaleDateString()

      return (
        dateData >= new Date(zeroData).toLocaleDateString() &&
        dateData <= new Date(firstData).toLocaleDateString()
        );
      });
    setUsers(filteredDate);
  
    if(filteredDate == []){
      setUsers(users)
    }else{
      setUsers(filteredDate);
    }
    console.log(filteredDate,"filteredData")
    const valueOfPaginate= Math.ceil(users?.length / postsPerPage)
    console.log(users,valueOfPaginate,"value")
  }
    
    catch(err){
      console.log(err)
      setUsers(oldData)
    }
  }


  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = users?.slice(indexOfFirstPost, indexOfLastPost);


  const Pagination = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchData(null);
    setUsers(users)
  };

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
                      placeholder="Search"
                      onChange={(e) => serachFn(e)}
                    />
                  </div>

                  <div className="rangePicker-Div">
                  < RangePicker
                    onChange={(e)=>setDateFunction(e)}
                  />
                  
</div>
</div>
                <div className="Cards-head mt-0">
                  { searchData == null 
                    ? currentPosts?.map((item, id) => {
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
                <div className="paginate-sec">
                  <ReactPaginate
                    previousLabel="← Previous"
                    nextLabel="Next →"
                    onPageChange={Pagination}
                    pageCount={Math.ceil(users?.length / postsPerPage) ||oldData?.length / postsPerPage}
                    containerClassName="pagination"
                    previousLinkClassName="pagination__link"
                    nextLinkClassName="pagination__link"
                    disabledClassName="pagination__link--disabled"
                    activeClassName="pagination__link--active"
                    className="page-link"
                  />
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
