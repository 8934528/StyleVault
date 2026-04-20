import React from 'react';
import { usePack } from '../hooks/usePack';
const OpenPack = () => {
  const { opening, openPack } = usePack();
  return (
    <div className="row text-center">
      <div className="col-12">
        <h2><i className="fi fi-rr-gift"></i> Open Pack</h2>
        <button className="btn btn-warning btn-lg mt-4" onClick={openPack} disabled={opening}>
          {opening ? 'Opening...' : 'Open Now for ZAR 20'}
        </button>
      </div>
    </div>
  );
};
export default OpenPack;
