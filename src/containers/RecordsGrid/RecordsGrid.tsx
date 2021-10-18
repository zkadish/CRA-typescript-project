import React from 'react';
import Card from '../../components/Card';
import { useAppSelector } from '../../hooks';

import './RecordsGrid.scss';

const RecordsGrid = () => {
  const filteredList = useAppSelector((state) => state.records.filteredList);

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
