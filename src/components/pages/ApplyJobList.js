import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jobportalAuthService from '../service/jobportal.auth.service';
import '../../App.css';
import instance from '../service/connection';

const ApplyJobList = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    jobportalAuthService.getAllApplyJobList().then(res => {
      // console.log(res);
      setData(res.data.data);
    }
    ).catch(err => {
      console.log(err);
    })
      // http.get('/getAllApplyJobList').then(res => {
      //   // console.log("response data is", res.data);
      //   setData(res.data);
      // }).catch(err => {
      //   console.log("Error is", err);
      // })

    }, []) 
    
    return (

      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card dropDowning">
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Resume</th>
                        <th scope="col">Skills</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => {

                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                            {/* {item.resume} */}
                              <a href={`${instance()}downloadFile/${item.resume}`} download target='_saransh'>Download</a>
                       
                            </td>
                            <td>{item.skills}</td>
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

export default ApplyJobList