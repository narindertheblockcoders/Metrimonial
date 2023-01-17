import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import ReactPaginate from "react-paginate";
import { data } from "jquery";
import { Pagination } from "react-bootstrap";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const HappyCoupleLatest = () => {
  const [happycouple, setHappyCouple] = useState();
  const [searchData, setSearchData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [happyCoupleData, setHappyCoupleData] = useState();
  const [selectedId, setSelectedId] = useState();
  const [added, setAdded] = useState(0);

  async function getProfileFunction() {
    const res = await axios.post("/api/master/getHappyCouples");
    const response = res.data;
    console.log(
      response.data,
      "to get response form api to get happy couple data"
    );
    setHappyCouple(response.data);
    setHappyCoupleData(response.data);
  }
  useEffect(() => {
    getProfileFunction();
  }, [added]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = happyCoupleData?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const Pagination = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchData(null);
  };

  async function serachFn(e) {
    try {
      console.log(e.target.value);
      const search = e.target.value;
      const filteredData = happyCoupleData?.filter((item) => {
        const name = item?.names;
        return name?.toLowerCase().includes(search.toLowerCase());
      });
      console.log(happyCoupleData, "to get the value of the filtered Data");
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const searchPosts = filteredData?.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
      setSearchData(searchPosts);
      // setHappyCoupleData(filteredData)
      console.log(filteredData, "filter data happy couple data");

      console.log(happyCoupleData, "search happy couple data");
      if (search == "") {
        setHappyCoupleData(happycouple);
      } else {
        setSearchData(searchPosts);
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(happyCoupleData, "happ couple data all hppens");

  async function deleteTestimonial(){
    const id = selectedId
    console.log(id,"to get the value of e")
    try{
      let res = await axios.post("/api/master/deleteHappyCouple",{id:id})
      const response = res.data;
      console.log(response,"to get resonse from api to delete the testimonial")
      toast.success("Deleted Testimonial Successfully")
      setAdded(added+1)

    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="new-dashboard">
      <SideBar />
  <ToastContainer/>
      <section className="forself profile-sects pb-5" id="couple-profile-div">
        <div className="container" id="user-container">
          <div className="couple-head-sec mt-0 mb-0">
            <h4>HAPPY COUPLES</h4>
            <h2>
              MATCHED BY <span> ORTHODOX MATRIMONIAL </span>
            </h2>
          </div>

          <div className="search-bar-sec mb-4">
             <div className="input-group mb-1" id="search-bar-set">

                    <input
                      type="text"
                      style={{paddingLeft:"0px"}}
                      className="input-group-text "
                      placeholder="Search"
                      onChange={(e) => serachFn(e)}
                      id="search-bg-set"
                    />
                    <span className="form-control " >
                      <i className="bi bi-search" id="search-iColor"></i>
                    </span>
                  </div>
         
         
           
          </div>

          <div className="couple-header ">
            {searchData == null
              ? currentPosts?.map((item, id) => {
                  return (
                    <div className="couple-mathed-sec mt-0">
                      <div className="left-mathed-sec" id="left-mathed-secResp">
                        <h3>{item?.names}</h3>
                        <p>{item?.description}</p>
                        <small>
                          {new Date(item?.marrigeDate).toLocaleString()}
                        </small>
                      </div>
                      <div
                        className="right-mathed-sec"
                        id="edit-testimonial-div"
                      >
                        <img src={item?.image} />
                        <div className="self-about-right self-about-resp" id="self-about-top">
                        <Link href={"/editTestimonial/" + item?.id}>
                          <button
                            className="button sub-admin-btn"
                            type="button"
                          >
                            Edit{" "}
                          </button>
                        </Link>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"
                            className="button sub-admin-btn"
                            value={item?.id}
                            onClick={(e) => setSelectedId(e.target.value)}
                          >
                            Delete{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : searchData?.map((item) => {
                  return (
                    <div className="couple-mathed-sec mt-0">
                    <div className="left-mathed-sec" id="left-mathed-secResp">
                      <h3>{item?.names}</h3>
                      <p>{item?.description}</p>
                      <small>
                        {new Date(item?.marrigeDate).toLocaleString()}
                      </small>
                    </div>
                    <div
                      className="right-mathed-sec"
                      id="edit-testimonial-div"
                    >
                      <img src={item?.image} />
                      <div className="self-about-right self-about-resp" id="self-about-top">
                      <Link href={"/editTestimonial/" + item?.id}>
                        <button
                          className="button sub-admin-btn"
                          type="button"
                        >
                          Edit{" "}
                        </button>
                      </Link>
                      <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"
                          className="button sub-admin-btn"
                          value={item?.id}
                          onClick={(e) => setSelectedId(e.target.value)}
                        >
                          Delete{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                  );
                })}










            <div className="paginate-sec " id="paginate-sec">
              <ReactPaginate
                previousLabel="← Previous"
                nextLabel="Next →"
                onPageChange={Pagination}
                pageCount={Math.ceil(happyCoupleData?.length / postsPerPage)}
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


      <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog  modal-dialog-centered">
    <div className="modal-content">
    
      <div className="modal-body">
        Are You Sure You Want to delete the selected Testimonial
      </div>
      <div className="modal-footer">

      <button
                  type="button"
                  id="deleteBtn-Modal"
                  value={selectedId}
                  data-bs-dismiss="modal"
                  onClick={(e)=>deleteTestimonial(e)}
                  class="btn btn-primary"
                >
                  Delete
                </button>
                <button
                  type="button"
                  id="cancelBtn-Modal"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

      </div>
    </div>
  </div>
</div>
    </div>

    
  );
};

export default HappyCoupleLatest;
