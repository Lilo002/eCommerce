import { useState } from 'react';
import { Button } from 'antd';

import { SORT_DIRECTIONS, SORT_FIELDS } from '../model/constants';

import sprites from './icon/sprites.svg';

type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS];
type SortDirection = (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];

export const SortBar = ({ onSort }: { onSort: (sortField: SortField, sortDirection: string | null) => void }) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const handleSort = (field: SortField) => {
    let direction: SortDirection | null = SORT_DIRECTIONS.ASC;
    if (sortField === field) {
      if (clickCount === 2) {
        direction = null;
        setClickCount(0);
      } else {
        direction = sortDirection === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC;
        setClickCount((prevCount) => prevCount + 1);
      }
    } else {
      setClickCount(1);
    }

    setSortField(field);
    setSortDirection(direction);

    onSort(field, direction);
  };

  const getSortDirection = (field: SortField) => {
    if (sortField !== field || !sortDirection) {
      return '';
    }

    if (sortDirection === SORT_DIRECTIONS.DESC) {
      return (
        <svg className="icon">
          <use xlinkHref={`${sprites}#desc`} />
        </svg>
      );
    }

    return (
      <svg className="icon">
        <use xlinkHref={`${sprites}#asc`} />
      </svg>
    );
  };

  return (
    <div className="catalog-control-panel-sort">
      <Button className="catalog-control-panel-sort-btn" type="primary" onClick={() => handleSort(SORT_FIELDS.NAME)}>
        <span>Name </span> {sortField === SORT_FIELDS.NAME ? getSortDirection(SORT_FIELDS.NAME) : ''}
      </Button>
      <Button className="catalog-control-panel-sort-btn" type="primary" onClick={() => handleSort(SORT_FIELDS.PRICE)}>
        <span>Price</span> {sortField === SORT_FIELDS.PRICE ? getSortDirection(SORT_FIELDS.PRICE) : ''}
      </Button>
    </div>
  );
};
