import Link from "next/link";
import React, { useEffect, useState, useRouter } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../SideBar";


const DisaproveProfile = () => {
  const [collectiveData, setCollectiveData] = useState();
  const [adminDetail, setAdminDetail] = useState();
  const [userData, setUserData] = useState();



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
        
            <form className="funds-sec">
              <h3 className="dummy-txts"> </h3>
            
              <ToastContainer />
        
              <div className="left-dashboard mt-0 " id="lr-id">

              <div className="rapper-between mb-5 mt-3" id="token-form-padding">
                    <h5 className="heading-text pink-text ">DISAPPROVED PROFILES</h5>
                    <h5 className="hide-text">1</h5>
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
export default DisaproveProfile;
