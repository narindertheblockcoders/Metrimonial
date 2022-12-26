import React from "react";
import SideBar from "../SideBar";

const HappyCoupleLatest = () => {
  return (
    <div className="new-dashboard">
      <SideBar/>

      <section className="forself profile-sects" id="totalDetailProfileSec">
        <div className="container" id="user-detail-container">
           <div className="couple-head-sec">
              <h4>HAPPY COUPLES</h4>
              <h2>MATCHED BY <span> ORTHODOX MATRIMONIAL </span></h2>
            </div>
            <div className="couple-mathed-sec">
                <div className="left-mathed-sec">
                    <h3>Abbie & Abbigale</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate sit amet nisl at porttitor. Morbi faucibus eros tortor, finibus luctus nulla vestibulum a. Aliquam vitae lobortis lacus. Lorem ipsum dolor. 
                        </p>
                   <small>Marriage Date 10 December, 2021
</small>

                </div>
  <div className="right-mathed-sec">
                    <img src="/others/couple-mathed.jpg"/>
                </div>
            </div>
                


        </div>
      </section>
    </div>
  );
};

export default HappyCoupleLatest;
