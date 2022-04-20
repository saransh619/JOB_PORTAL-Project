import React, { useEffect, useState } from 'react';
import jobportalAuthService from '../service/jobportal.auth.service';

const RecruiterList = () => {
  const [data, setData] = useState([])
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
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
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.companyLogo}</td>
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