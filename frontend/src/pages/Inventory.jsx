import React from 'react';
const Inventory = () => (
  <div className="row">
    <div className="col-12">
      <h2><i className="fi fi-rr-box"></i> Your Inventory</h2>
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card bg-dark text-white border-secondary p-3 text-center">
            <h5>Empty Slot</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Inventory;
