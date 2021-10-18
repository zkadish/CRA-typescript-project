import React from 'react';
import RecordsFilter from '../../components/RecordsFilter';
import Analytics from '../../components/Analytics';
import Export from '../../components/Export';

const Dialog = () => {
  return (
    <>
      <RecordsFilter />
      <Analytics />
      <Export />
    </>
  );
};

export default Dialog;
