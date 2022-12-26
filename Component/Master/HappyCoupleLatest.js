import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";

const HappyCoupleLatest = () => {
  const [happycouple, setHappyCouple] = useState();

  async function getProfileFunction() {
    const res = await axios.post("/api/master/getHappyCouples");
    const response = res.data;
    console.log(response, "to get response form api to get happy couple data");
    setHappyCouple(response.data);
  }

  useEffect(() => {
    getProfileFunction();
  }, []);

  return (
    <div className="new-dashboard">
      <SideBar />

      <section className="forself profile-sects pb-5" id="couple-profile-div">
        <div className="container" id="user-container">
          <div className="couple-head-sec">
            <h4>HAPPY COUPLES</h4>
            <h2>
              MATCHED BY <span> ORTHODOX MATRIMONIAL </span>
            </h2>
          </div>
          <div className="couple-header">
            {happycouple?.map((item,id)=> {
                return(
          <div className="couple-mathed-sec">
            <div className="left-mathed-sec">
              <h3>{item?.names}</h3>
              <p>
                {item?.description}
              </p>
              <small>{new Date(item?.marrigeDate).toLocaleString()}</small>
            </div>
            <div className="right-mathed-sec">
              <img src={item?.image} />
            </div>
          </div>
                )
          })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HappyCoupleLatest;
