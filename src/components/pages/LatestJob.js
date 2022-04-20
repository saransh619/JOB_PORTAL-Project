import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jobportalAuthService from '../service/jobportal.auth.service';
import instance from '../service/connection';
import '../../App.css';
import Select from 'react-select';
const LatestJob = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState("PENDING");
  // console.log("props data is ", data);

  // for filter 
  const [searchTerm, setSearchTerm] = useState('');
  localStorage.setItem("JobPostData", JSON.stringify(data));

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData()
  }, [])
  
  const fetchData = () => {
    jobportalAuthService.getAllPosts().then(res => {
      // console.log('get all post response is ', res);
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.log(`eeeeerrrrrroooorrrrrr is`, err);
    })
  }
  const handleDelete = (item) => {
    axios.delete(instance() + `jobpost/deletePost/${item.postId}`).then(res => {
      fetchData()
      navigate('/latestjob');
    }).catch(err => {
      console.log("Error is", err);
    })
  }

  const fetching = JSON.parse(localStorage.getItem('user'));
  var role = "null";
  if (fetching) {
    role = fetching.user.role[0].roleName;
    // console.log('role is ', role);
  }

  const laodStatus = (item, event) => {
    console.log(event.target.value);
    // console.log(item);
    jobportalAuthService.acceptRecruiterPost(item.postId).then(res => {
      if (event.target.value === "accept") {
        alert("Post Accepted");
        setAccepted(res.data.status);
      } else {
        setAccepted("REJECTED");
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const deleteHandler = (item, event) => {
    jobportalAuthService.deleteRecruiterPost(item.postId).then(res => {
      fetchData();
      navigate('/latestjob');
    }
    ).catch(err => {
      console.log(err);
    })
  }

  // for loading 
  const loadingPic = require('../../images/loading.png');
  if (loading) {
    return (
      <>
        <div className="loader" style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <img style={{ width: "250px", height: "250" }} src={loadingPic} alt="me" />
          <h1>Loading Jobs 😃 ❤️</h1>;
        </div>
      </>
    )
    //  
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card dropDowning">
              {/* <div className="card-header">
                <h3>Latest Job</h3>
              </div> */}
              <div className="card-body ">
                <div className="search" style={{margin:"5px 8px"}}>
                  <input type="text" name="" placeholder='Filter the job list' onChange={event => { setSearchTerm(event.target.value) }} style={{ border: "2px solid lightgrey", borderRadius: "10px 14px", padding: "5px 8px" }} />
                  <i className="fa fa-search" aria-hidden="true" style={{ margin: "-26px" }} />
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Company</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Post Date</th>
                      <th scope="col">Last Date</th>
                      {
                        role === 'Recruiter' && (
                          <th scope="col">Action</th>
                        )
                      }
                      {
                        role === 'User' && (
                          <th scope="col">Process</th>
                        )
                      }
                      {
                        role === "null" && (
                          <th scope="col">Process</th>
                        )
                      }
                      {
                        role === "Admin" && (

                          <th scope="col">Decision</th>

                        )
                      }
                      {
                        role === "Admin" && (

                          <th scope='col'>fdfdfd</th>

                        )
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {data.filter((val) => {
                      if (searchTerm == '') {
                        return val;
                      } else if (val.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                      }
                    }).map((item, index) => {
                      return (
                        <tr key={item.postId}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.companyName}</td>
                          <td>{item.jobTitle}</td>
                          <td>{item.description}</td>
                          <td className='dateFormat'>{item.postDate}</td>
                          <td className='dateFormat'>{item.lastDate}</td>
                          <td>
                            {
                              role === 'Recruiter' && (
                                <>
                                  <Link to={`/editjob/${item.postId}`} state={item} className="btn btn-primary" >Edit</Link>
                                  <Link to={`/deletejob/${item.postId}`} className="btn btn-danger" onClick={() => {
                                    handleDelete(item)
                                  }}>Delete</Link>
                                </>
                              )
                            }
                            {
                              role === 'User' && (
                                <>
                                  <Link to='/jobapply' className="btn btn-success">Apply</Link>
                                </>
                              )
                            }
                            {
                              role === "null" && (
                                <>
                                  <Link to='/jobapply' className="btn btn-success">Apply</Link>
                                </>
                              )
                            }
                            {
                              role === "Admin" && (
                                <>
                                  <td>
                                    <select className="activity" onChange={(e) => laodStatus(item, e)}>
                                      <option value="pending" hidden>{accepted}</option>
                                      <option id="accept" value="accept">Accept</option>
                                      <option id="reject" value="reject">Reject</option>
                                    </select>
                                  </td>
                                </>
                              )
                            }
                          </td>
                          <td>
                            {
                              role === "Admin" && (
                                <td><button className='removeRecruiter' onClick={(e) => deleteHandler(item, e)}>Remove Recruiter</button> </td>
                              )
                            }
                          </td>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LatestJob;