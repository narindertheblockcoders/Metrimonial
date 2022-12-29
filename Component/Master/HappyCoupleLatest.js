import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import ReactPaginate from "react-paginate";

const HappyCoupleLatest = () => {
  const [happycouple, setHappyCouple] = useState();
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);


  async function getProfileFunction() {
    const res = await axios.post("/api/master/getHappyCouples");
    const response = res.data;
    console.log(response, "to get response form api to get happy couple data");
    setHappyCouple(response.data);
  }

  useEffect(() => {
    getProfileFunction();
  }, []);

  async function serachFn(e) {
    console.log(e.target.value);
    const search = e.target.value;
    const filteredData = happycouple?.filter((item) => {
      const name = item?.names;
      const date = item?.marrigeDate;
      return (
        name?.toLowerCase().includes(search.toLowerCase())
      );
    });
    console.log(filteredData, "to get the value of the filtered Data");
    setSearchData(filteredData);
  }


    // Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = happycouple?.slice(indexOfFirstPost, indexOfLastPost);
 
    const paginate = ({ selected }) => {
      setCurrentPage(selected + 1);
    };


  return (
    <div className="new-dashboard">
      <SideBar />

      <section className="forself profile-sects pb-5" id="couple-profile-div">
        <div className="container" id="user-container">
          <div className="couple-head-sec mb-0">
            <h4>HAPPY COUPLES</h4>
            <h2>
              MATCHED BY <span> ORTHODOX MATRIMONIAL </span>
            </h2>
          </div>
          <div className="search-bar-sec mb-4">
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
                </div>

          <div className="couple-header ">
            {searchData == null ? currentPosts?.map((item,id)=> {
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
          })
          :
          searchData?.map((item) => {
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

          })
          
          }
          <div className="paginate-sec " id="paginate-sec" >
                       <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  onPageChange={paginate}
                  pageCount={Math.ceil(happycouple?.length / postsPerPage)}
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
  );
};

export default HappyCoupleLatest;
