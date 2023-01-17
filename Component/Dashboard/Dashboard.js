import Link from "next/link";
import React, { useEffect, useState, useRouter } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../SideBar";
import ReactPaginate from "react-paginate";


const NewDashboard = () => {
  const [collectiveData, setCollectiveData] = useState();
  const [adminDetail, setAdminDetail] = useState();
  const [userData, setUserData] = useState();
  const [added, setAdded] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [oldData, setOldData] = useState([]);
  const [deleteIdValue, setDeleteIdValue] = useState()


  async function getCollectiveData() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from localStorage");
      let res = await axios.post("/api/dashboard/dashboard", { token: token });
      const response = res.data;
      console.log(
        response,
        "to get the response from api on dashboard for collective data"
      );
      setCollectiveData(response.data)
      ;
    } catch (err) {
      console.log(err);
    }
  }

  async function getAdminDetails() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from localStorage");
      let res = await axios.post("/api/dashboard/adminDetails", { token: token });
      const response = res.data;
      console.log(
        response,
        "to get the response from api on dashboard for admin details"
      );
      setAdminDetail(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getUsers() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsers", { token: token });
      const response = res.data;
      console.log(response, "to get the response from api to get users");
      setOldData(response.data);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getAdminDetails();
    getCollectiveData();
    getUsers();
  }, [added]);


  async function deleteUser(data){
    try{
    const res = await axios.post("/api/users/deleteUsers",data)
    const response= res.data
    console.log(response,"delete user response")
    setAdded(added+1)
    toast.success("Deleted Successfully")
    setIsLoading(true)
    document.getElementById('modal').classList.remove('show');


    // document.getElementsByClassName("modal-backdrop")[0].style.display="none"

    // document.getElementsByClassName("modal")[0].style.display="none"

    
  }catch(err){
    setIsLoading(false)
    console.log(err)
  }
}

 async function deleteUserSubmitHandler(e){
  console.log(e,"item value")
  const data ={
    id:e,
  }
  deleteUser(data)
  setAdded(added+1)
 }


 async function serachFn(e) {
  console.log(e.target.value);
  const search = e.target.value;
  console.log(oldData, "old data here");
  const filteredData = oldData?.filter((item) => {
    const name = item?.name;
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
    setUserData(userData);
  } else {
    setSearchData(searchPosts);
  }
  // setUsers(searchData)
}
 
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = userData?.slice(indexOfFirstPost, indexOfLastPost);

  const Pagination = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchData(null);
    setUserData(userData);
  };



  return (
    <div className="new-dashboard">
      <SideBar />
      <section className="profile-sec profile-sects pt-0">
            {/* <div  className="left-dashboard  first-set  mb-4" id="leftt-section">
                {" "}
                <h5>Welcome -  {" "} {adminDetail?.firstName} </h5>
              </div> */}
        <div className="container">
          <div className="row">
            {/* <Navbar /> */}
            <form className="funds-sec">
              <h3 className="dummy-txts"> </h3>
              <ToastContainer />
              <div className="col-head mt-1 " id="col-head">
                <h6 className="dummy-txts mt-2 mb-4"  style={{ fontSize: "14px" }}>
                  {" "}
                </h6>
                {/* {collectiveData?.map((item, id) => {
                  return ( */}
                    <div className="col-md-12 left-headSec">
                      <div
                        className="link-head  "
                        id="first-sec"
                        style={{ justifyContent: "space-between" }}
                      >
                        <Link href={"/users/totalUsers"}>
                          <div
                            className="link-dashboard  first-set"
                            id="lr-section"
                          >
                            {" "}
                            <i
                              className="fa-sharp fa-solid fa-users "
                              id="dashboard-icons"
                            ></i>
                            <p className="dashboard-txts">{collectiveData?.totalUser[0]?.totalUser}</p>
                            <h6 className="dashboard-txt"> TOTAL USERS</h6>
                          </div>
                        </Link>

                        <Link href={"/master/happyCoupleLatest"}>
                        <div className="link-dashboard  first-set" id="firstet-item">
                          <i className="fa-solid fa-arrow-up-from-ground-water" id="dashboard-icons"></i>
                          <p className="dashboard-txts"> {collectiveData?.happycouple[0]?.totalHc}</p>
                          <h6 className="dashboard-txt "> LIST OF TESTIMONIALS</h6>
                        </div>
                        </Link>

                        <Link href={"/profileStatus/adminApprove"}>
                          <div className="link-dashboard first-set" id="invest-item">
                            <i class="fa-solid fa-user-check" id="dashboard-icons"></i>
                            <p className="dashboard-txts">{collectiveData?.approve[0]?.totalapprove}</p>
                            <h6 className="dashboard-txt"> APPROVED PROFILES</h6>
                          </div>
                        </Link>

                        <Link href="/master/advertisement">
                          <div
                            className="link-dashboard first-set"
                            id="faquery-item"
                          >
                            <i class="fa-solid fa-rectangle-ad" id="dashboard-icons"></i>
                            {/* <i className="fa-solid fa-hand-holding-dollar" id="dashboard-icons" ></i> */}
                            {/* <i class="fa-light fa-rectangle-ad" id="dashboard-icons"></i> */}
                            <p className="dashboard-txts"> {collectiveData?.advertise[0]?.totaladvertise}</p>
                            <h6 className="dashboard-txt">ADVERTISEMENT </h6>
                          </div>
                        </Link>

                
                      </div>
                    </div>
                  {/* )
                })} */}
              </div>

              <div className="left-dashboard  " id="lr-id">
          
              <div className="search-bar-sec" id="pt-resp-totalusers">
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
                </div>
              <table className="table funds-table mt-3" id="funds-color">
              <thead>
                    <tr className="">
                      <th id="fuds" scope="col">
                        Sr. No.
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
                      <th id="fuds" scope="col">
                        
                      </th>
                      <th id="fuds" scope="col"></th>

                      <th id="fuds" scope="col" ></th>
                      
                    </tr>
                  </thead>

                <tbody>
                {searchData == null ?
                currentPosts?.map((item,id)=>{
                 return(<>
                      <tr >
                        <Link href={"/userDetails/" + item.id}>
                        <td className="total-account">
                          {id+1}
                        </td>
                        </Link>

                        <Link href={"/userDetails/" + item.id}>
                        <td className="total-account">
                          {item.name}
                           </td>
                           </Link>

                           <Link href={"/userDetails/" + item.id}>
                        <td className="total-account">
                          {item.gender}</td>
                          </Link>

                          <Link href={"/userDetails/" + item.id}>
                        <td className="total-account">
                        {item.age}</td>
                        </Link>
                        <Link href={"/userDetails/" + item.id}>
                        <td className="total-account ">
                        {item.country}</td>
                        </Link>
                 
                        <Link href={"/userDetails/" + item.id}>
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

                                 

                                 

                                  {/* <button type="button" className="btn view-btn" id="approvePending-btn">
                                    View
                                  </button>
                                  <button type="button" className="btn view-btn" id="disapprove-btn">
                                    View
                                  </button> */}

                              </td>
                              </Link>
                            

                              <td className="total-account td-width" id="right-textset">
                                <Link href={"/userDetails/" + item.id}>

                                <i className="bi bi-pencil-square td-icons"  id="edit-btn"></i>
                                </Link>
                              </td>



                              <td
                                className="total-account  td-width"
                                data-bs-toggle="modal" data-bs-target="#deleteModal"
                                onClick={()=> setDeleteIdValue(item?.id)}
                                >
                                <i  style={{ cursor: "pointer" }} className="bi bi-trash3 td-icons" id="pin-dark-icon" ></i>{" "}
                              </td>
  
                            </tr>
                          </>
                      ) ;
                    }):searchData?.map((item, id)=>{
                         return(<>
                      <Link href={"/userDetails/" + item.id}>
                      <tr >
                        <td className="total-account">
                          
                          {id+1}
                        </td>
                        <td className="total-account">
                          {item.name}
                           </td>
                        <td className="total-account">
                          {item.gender}</td>
                        <td className="total-account">
                        {item.age}</td>
                        <td className="total-account ">
                        {item.country}</td>
                 
                              
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

                                 

                                 

                                  {/* <button type="button" className="btn view-btn" id="approvePending-btn">
                                    View
                                  </button>
                                  <button type="button" className="btn view-btn" id="disapprove-btn">
                                    View
                                  </button> */}

                              </td>
                            

                              <td className="total-account td-width" id="right-textset">
                                <Link href={"/userDetails/" + item.id}>

                                <i className="bi bi-pencil-square td-icons"  id="edit-btn"></i>
                                </Link>
                              </td>



                              <td
                                className="total-account  td-width"
                                data-bs-toggle="modal" data-bs-target="#deleteModal"
                                onClick={()=> setDeleteIdValue(item?.id)}>
                                <i  style={{ cursor: "pointer" }} className="bi bi-trash3 td-icons" id="pin-dark-icon" ></i>{" "}
                              </td>
  
  
                            </tr>
                          </Link>

                          </>
                          );

                    })
                  }
                  
                  
              
                </tbody>
              </table>
              </div>
            </form>
            <div className="paginate-sec">
                <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  onPageChange={Pagination}
                  pageCount={Math.ceil(
                    userData?.length  / postsPerPage
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



{/* <!-- Modal --> */}
<div class="modal fade"
 id="deleteModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content" id="deleteModl-content">
     
      <div class="modal-body">
        Are You Sure You Want to Delete 
      </div>
      <div class="modal-footer">
        <button type="button" id="deleteBtn-Modal" value={deleteIdValue} data-bs-dismiss="modal" onClick={(e) => deleteUserSubmitHandler(e.target.value)} class="btn btn-primary">Delete</button>
        <button type="button" id="cancelBtn-Modal" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};
export default NewDashboard;
