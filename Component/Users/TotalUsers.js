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
  const [userses, setUserses] = useState();

  const router = useRouter();
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [oldData,setOldData] =useState([])
  // const [userStatus, setUserStatus] = useState(0)
  const [date, setDate] = useState([]);

  const [fromDate, setFromDate] = useState();
  // const [toDate, setToDate] = useState();

  async function getUsers() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsers", { token: token });
      const response = res.data;
      console.log(response.data, "to get the response from api to get users");
      setUsers(response.data);
      setOldData(response.data)
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
    const filteredData = oldData?.filter((item) => {
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

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  async function dateFilterFn(e) {
    try {
      const fromDate = new Date(e[0]?.$d).toLocaleDateString();
      const toDate = new Date(e[1]?.$d).toLocaleDateString();

      console.log(fromDate, toDate, "to get from & to Date");
      const filteredData = oldData?.filter((item) => {
        console.log(
          new Date(item?.createdAt).toLocaleDateString(),
          "to check the date to search"
        );

        const dateData = new Date(item?.createdAt).toLocaleDateString();
        console.log(dateData, "filtered data fetch");
        return dateData >= fromDate && dateData <= toDate;
      });
      console.log(filteredData, "ffffff");
      setUsers(filteredData);

      if(filteredData===[]){
        setUsers(oldData)
      }
      else{
        setUsers(filteredData)
      }

    } catch (err) {
      console.log(err);
      setUsers(oldData)
    }
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

                  <div className="rangePicker-Div">
                  <RangePicker
                  className="rangePicker-set"
                    selected={users}
                    onChange={(e) => dateFilterFn(e)}
                  />
</div>
                </div>

 
                  {/* <RangePicker onChange={(value) => {
                    setDate(value?.map(item=>{
                      console.log(value[0].$d,"valu=e is here")
                      return moment(item).date(value)

                    }))
                  }}/> */}

                  {/* <DatePicker
        onChange={(e) => setFromDate(e)}
      />
                 <DatePicker
                    onChange={(e) => dateFilterFn(e)}
      />          */}
                  {/* <input type="date" onChange={(e) => setFromDate(e)}/> 
 <input type="date" onChange={(e) => dateFilterFn(e)}/>  */}
                

                <div className="Cards-head mt-0">
                  {searchData == null
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
                    onPageChange={paginate}
                    pageCount={Math.ceil(users.length / postsPerPage)}
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
