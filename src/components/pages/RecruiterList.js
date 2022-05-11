import React, { useEffect, useState } from 'react';
import jobportalAuthService from '../service/jobportal.auth.service';
import '../../App.css';
import instance from '../service/connection';

const RecruiterList = () => {
  const [data, setData] = useState([])
   // for filter 
   const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    jobportalAuthService.getAllRecruiters().then(res => {
      // console.log("data", res.data);
      setData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

return (
  <>
    <div className="container-fluid mb-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
            <div className="search" style={{ margin: "5px 8px" }}>
                  <input type="text" name="" placeholder='Filter the job list' onChange={event => { setSearchTerm(event.target.value) }} style={{ border: "2px solid lightgrey", borderRadius: "10px 14px", padding: "5px 8px" }} />
                  <i className="fa fa-search" aria-hidden="true" style={{ margin: "-26px" }} />
                </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Company Logo</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Website URL</th>
                  </tr>
                </thead>

                <tbody>
                {data.filter((val) => {
                      if (searchTerm === '') {
                        return val;
                      } else if (val.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                      }
                    }).map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img src={`${instance()}downloadFile/${item.companyLogo}`} alt="404" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        </td>
                        <td>{item.companyName}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.websiteUrl}</td>
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

export default RecruiterList