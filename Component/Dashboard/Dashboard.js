import Link from "next/link";
import React, { useEffect, useState, useRouter } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../SideBar";


const NewDashboard = () => {
  const [collectiveData, setCollectiveData] = useState();
  const [adminDetail, setAdminDetail] = useState();
  const [userData, setUserData] = useState();

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
      setCollectiveData(response.data);
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
 
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  }





  useEffect(() => {
    getAdminDetails();
    getCollectiveData();
    getUsers()
  }, []);

  async function deleteAdvertisement(e){
    console.log(e,"e data here")
    try{
     const id = e
    const res = await axios.post("/api/advertisement/deleteAdvertisement",{id:id})
    response = res.data
    console.log(response.data,"delete user response here")
  }catch(err){
    console.log(err)
  }
  }





  return (
    <div className="new-dashboard">
      <SideBar />
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row">
            {/* <Navbar /> */}
            <div
                className="left-dashboard  first-set mt-4 mb-4"
                id="leftt-section"
              >
                {" "}
                <h5>Welcome -  {" "} {adminDetail?.firstName} </h5>
              </div>
            <form className="funds-sec">
              <h3 className="dummy-txts"> </h3>
              <ToastContainer />
              <div className="col-head mt-1 " id="col-head">
                <h6 className="dummy-txts mt-2 mb-4"  style={{ fontSize: "14px" }}>
                  {" "}
                </h6>
                {collectiveData?.map((item, id) => {
                  return (
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
                            <p className="dashboard-txts">{item.totalUser}</p>
                            <h6 className="dashboard-txt"> TOTAL USERS</h6>
                          </div>
                        </Link>

                        <div
                          className="link-dashboard  first-set"
                          id="firstet-item"
                          data-bs-toggle="modal"
                          href="#exampleModalToggle"
                        >
                          <i
                            className="fa-solid fa-arrow-up-from-ground-water"
                            id="dashboard-icons"
                          ></i>
                          <p className="dashboard-txts"> {}</p>
                          <h6 className="dashboard-txt "> TODAY'S BUSINESS</h6>
                        </div>

                        <Link href={"/directIncome"}>
                          <div
                            className="link-dashboard first-set"
                            id="invest-item"
                          >
                            <i
                              className="fa-solid fa-hand-holding-dollar"
                              id="dashboard-icons"
                            ></i>
                            <p className="dashboard-txts">{}</p>
                            <h6 className="dashboard-txt"> TOTAL INCOME</h6>
                          </div>
                        </Link>

                        <Link href="/directIncome">
                          <div
                            className="link-dashboard first-set"
                            id="faquery-item"
                          >
                            <i
                              className="fa-solid fa-hand-holding-dollar"
                              id="dashboard-icons"
                            ></i>
                            <p className="dashboard-txts"> {}</p>
                            <h6 className="dashboard-txt">TOTAL PAYOUT </h6>
                          </div>
                        </Link>

                        {/* <Link href="/totalWithdraws">
                                      <div className="link-dashboard" id="teams-item">
                                        <i
                                          className="fa fa-filter-circle-dollar"
                                          id="dashboard-icons"
                                        ></i>
                                        <p className="dashboard-txts"></p>
                                        <h6 className="dashboard-txt">TOTAL WITHDRAWAL </h6>
                                      </div>
                                    </Link> */}

                        {/* <Link href={"/directIncome"}>
                                      <div
                                        className="link-dashboard  first-set"
                                        id="teams-item"
                                      >
                                        {" "}
                                        <i
                                          className="fa-solid fa-users"
                                          id="dashboard-icons"
                                        ></i>
                                        <p className="dashboard-txts"></p>
                                        <h6 className="dashboard-txt "> DIRECT INCOME</h6>
                                      </div>
                                    </Link> */}

                        {/* <Link href={"/allMatchingIncome"}>
                                          <div
                                            className="link-dashboard  first-set"
                                            id="teams-item"
                                          >
                                            {" "}
                                            <i
                                              className="fa-solid fa-users"
                                              id="dashboard-icons"
                                            ></i>
                                            <p className="dashboard-txts"></p>
                                            <h6 className="dashboard-txt "> MATCHING INCOME</h6>
                                          </div>
                                        </Link> */}

                        {/* <Link href={"/totalRocMatchingIncome"}>
                                            <div
                                              className="link-dashboard  first-set"
                                              id="teams-item"
                                            >
                                              {" "}
                                              <i
                                                className="fa-solid fa-users"
                                                id="dashboard-icons"
                                              ></i>
                                              <p className="dashboard-txts"></p>
                                              <h6 className="dashboard-txt "> ROC MATCHING INCOME</h6>
                                            </div>
                                          </Link> */}

                        {/* <Link href="/allTickets">
                                            <div className="link-dashboard" id="third-itemes">
                                              <i
                                                className="fa-solid fa-users-between-lines"
                                                id="dashboard-icons"
                                              ></i>
                                              <p className="dashboard-txts"></p>
                                              <h6 className="dashboard-txt"> SUPPORTED TICKET</h6>
                                            </div>
                                          </Link> */}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="left-dashboard  " id="lr-id">
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
                    <th  id="fuds" scope="col">
                      Country
                    </th>
                    <th id="fuds" scope="col">
                     Status
                    </th>
                    <th id="fuds" scope="col" ></th>
                  </tr>
                </thead>

                <tbody>
                {userData?.map((item,id)=>{
                 return(
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
                        <td className="total-account">
                        {item.country}</td>
                        <td className="total-account " id="right-textset">Pending</td>
                        <td className="total-account right-textset" id="right-textset" >
                         <button onClick={()=>deleteAdvertisement(item?.id,1)} type="button" className="btn"> Delete</button>
                          </td>
                      </tr>
                
                      ) ;
                    })}
              
                </tbody>
              </table>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default NewDashboard;
