import Link from "next/link";
import React, { useEffect, useState, useRouter } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../SideBar";

const ActiveProfiles = () => {
  // const [collectiveData, setCollectiveData] = useState();
  // const [adminDetail, setAdminDetail] = useState();
  // const [userData, setUserData] = useState();

  // async function getUsers() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     let res = await axios.post("/api/users/getUsers", { token: token });
  //     const response = res.data;
  //     console.log(response, "to get the response from api to get users");

  //     setUserData(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // async function deleteAdvertisement(e) {
  //   console.log(e, "e data here");
  //   try {
  //     const id = e;
  //     const res = await axios.post("/api/advertisement/deleteAdvertisement", {
  //       id: id,
  //     });
  //     response = res.data;
  //     console.log(response.data, "delete user response here");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <div className="new-dashboard">
        <SideBar />

        <section
          className="profile-sec  profile-sects"
          id="totalUserProfileSec"
        >
          <div className="container">
            <div className="row justify-content-center">
              {/* <div className="Cards-head mt-0"> */}

              <div className="left-dashboard mt-0 " id="lr-id">
                <div
                  className="rapper-between mb-4 mt-3"
                  id="token-form-padding"
                >
                  <h5 className="heading-text pink-text ">ALL PROFILES</h5>
                  <h5 className="hide-text">1</h5>
                </div>

                <div className="search-bar-sec" id="pt-resp-totalusers">
                  <div className="input-group mb-1" id="search-bar-set">
                    <input
                      type="text"
                      style={{ paddingLeft: "0px" }}
                      className="input-group-text "
                      placeholder="Search"
                      // onChange={(e) => serachFn(e)}
                      id="search-bg-set"
                    />
                    <span className="form-control ">
                      <i className="bi bi-search" id="search-iColor"></i>
                    </span>
                  </div>

                  {/* <div className="rangePicker-Div">
                    <RangePicker onChange={(e) => setDateFunction(e)} />
                  </div> */}
                </div>

                <table className="table funds-table mt-3" id="funds-color">
                  <thead>
                    <tr className="">
                      <th id="fuds" scope="col">
                        Sr. No. <img src="/others/tableArrow.png" />
                      </th>
                      <th id="fuds" scope="col">
                        Name
                      </th>
                      <th id="fuds" scope="col">
                        Gender
                      </th>
                      <th id="fuds" scope="col">
                        Age
                      </th>
                      <th id="fuds" scope="col">
                        Country
                      </th>
                      <th id="fuds" scope="col"></th>
                      <th id="fuds" scope="col"></th>

                      <th id="fuds" scope="col"></th>
                    </tr>
                  </thead>

                  {/* <tbody >
                    {searchData == null
                      ? currentPosts?.map((item, id) => {
                          return (
                            <tr className="tbody-tr">

                              <Link href={"/userDetails/" + item.id}>
                              <td className="total-account">{id + 1}</td></Link>
                              <Link href={"/userDetails/" + item.id}>
                              <td className="total-account">{item.name}</td></Link>
                              <Link href={"/userDetails/" + item.id}>
                              <td className="total-account">{item.gender}</td></Link>
                              <Link href={"/userDetails/" + item.id}>
                              <td className="total-account">{item.age}</td></Link>
                              <Link href={"/userDetails/" + item.id}>
                              <td className="total-account">{item.country}</td></Link>
                                

                              <td className="total-account " id="right-textset">
                                  {item?.adminApproved1 == 1 && item?.adminApproved2 == 1 ?  <button type="button" className="btn view-btn" id="approve-btn">
                                    Approved
                                  </button>: null }
                                
                                  {(item?.adminApproved1 == 1 &&  item?.adminApproved2 == 0) || (item?.adminApproved1 == 0 &&  item?.adminApproved2 == 1)|| ( item?.adminApproved1 == 0 && item?.adminApproved2 == 0) ?  <button type="button" className="btn view-btn" id="approvePending-btn">
                                    Pending
                                  </button> : null }
                                 

                                  {(item?.adminApproved1 == 2 || item?.adminApproved2 == 2)  || (item?.adminApproved1 == 2 &&  item?.adminApproved2 == 0) || (item?.adminApproved1 == 0 &&  item?.adminApproved2 == 2) || (item?.adminApproved1 == 1 &&  item?.adminApproved2 == 2) || (item?.adminApproved1 == 2 &&  item?.adminApproved2 == 1)? <button type="button" className="btn view-btn" id="disapprove-btn">
                                    Disapproved
                                  </button> : null }

                              </td>
                            

                              <td className="total-account td-width" id="right-textset">
                                <Link href={"/editDetails/" + item.id}>

                                <i className="bi bi-pencil-square td-icons"  id="edit-btn"></i>
                                </Link>
                              </td>



                              <td
                                className="total-account  td-width"
                                onClick={() => deleteUserSubmitHandler(item?.id)}>
                                <i  style={{ cursor: "pointer" }} className="bi bi-trash3 td-icons" id="pin-dark-icon" ></i>{" "}
                              </td>
  
                            </tr>
                            
                          );
                        })
                      : searchData?.map((item, id) => {
                          return (
                            <tr>
                              <td className="total-account">{id + 1}</td>
                              <td className="total-account">{item.name}</td>
                              <td className="total-account">{item.gender}</td>
                              <td className="total-account">{item.age}</td>
                              <td className="total-account">{item.country}</td>

                              
                              <td className="total-account " id="right-textset">
                                  {item?.adminApproved1 == 1 && item?.adminApproved2 == 1 ?  <button type="button" className="btn view-btn" id="approve-btn">
                                    Approved
                                  </button>: null }
                                
                                  {(item?.adminApproved1 == 1 &&  item?.adminApproved2 == 0) || (item?.adminApproved1 == 0 &&  item?.adminApproved2 == 1)|| ( item?.adminApproved1 == 0 && item?.adminApproved2 == 0) ?  <button type="button" className="btn view-btn" id="approvePending-btn">
                                    Pending
                                  </button> : null }
                                 

                                  {(item?.adminApproved1 == 2 || item?.adminApproved2 == 2)  || (item?.adminApproved1 == 2 &&  item?.adminApproved2 == 0) || (item?.adminApproved1 == 0 &&  item?.adminApproved2 == 2) || (item?.adminApproved1 == 1 &&  item?.adminApproved2 == 2) || (item?.adminApproved1 == 2 &&  item?.adminApproved2 == 1)? <button type="button" className="btn view-btn" id="disapprove-btn">
                                    Disapproved
                                  </button> : null }
                              </td>
                            

                              <td className="total-account td-width" id="right-textset">
                                <Link href={"/editDetails/" + item.id}>

                                <i className="bi bi-pencil-square td-icons"  id="edit-btn"></i>
                                </Link>
                              </td>



                              <td
                                className="total-account  td-width"
                                onClick={() => deleteUserSubmitHandler(item?.id)}>
                                <i  style={{ cursor: "pointer" }} className="bi bi-trash3 td-icons" id="pin-dark-icon" ></i>{" "}
                              </td>
  
                            </tr>
                          );
                        })}
                  </tbody> */}
                </table>
              </div>

              {/* </div> */}
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default ActiveProfiles;
