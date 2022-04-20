import React from 'react'
const img1 = require('../images/a.png')
const img2 = require('../images/b.png')
const img3 = require('../images/c.jpg')

const Carasoul = () => {
  return (
    <><div className=''>
        
        <div style={{objectFit: "cover"}} id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" style={{height:"80vh"}}>
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="..."/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    </>
  )
}

export default Carasoul