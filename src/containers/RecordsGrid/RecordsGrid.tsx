import React from 'react';
import Card from '../../components/Card';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setFliteredList } from '../../slices/RecordsSlice';

import './RecordsGrid.scss';

const RecordsGrid = () => {
  const filteredList = useAppSelector((state) => state.records.filteredList);
  // debugger
  const dispatch = useAppDispatch();

  return (
    <div className="records-grid">
      {filteredList?.map(record => {
        return (
          <Card
            key={record.id}
            id={record.id}
            title={record.title}
            division={record.division}
            project_owner={record.project_owner}
            budget={record.budget}
            status={record.status}
            created={record.created}
            modified={record.modified}
          />
        )
      })}
    </div>
  );
};

export default RecordsGrid;
