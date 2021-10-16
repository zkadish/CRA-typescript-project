import React from 'react';
import AppBar from '../../components/AppBar';
import RecordsGrid from '../../containers/RecordsGrid';

import './Records.scss';

const Records = () => {
  return (
    <>
      <AppBar />
      <div className="records">
        <RecordsGrid />
      </div>
    </>
  );
};

export default Records;
