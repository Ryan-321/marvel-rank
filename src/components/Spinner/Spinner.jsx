import React from 'react'
import './Spinner.css'




const Spinner = () =>
  <div id="spinner">
    <div className={'loader loader--flipHoz'}>
      <span className="loader-item">1</span>
      <span className="loader-item">2</span>
      <span className="loader-item">3</span>
    </div>
  </div>

export default Spinner