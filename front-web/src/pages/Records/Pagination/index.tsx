import React from 'react';
import './styles.css';

type Props = {
  totalPages?:number;
  goTopage: Function;
  activePage: number;
}


const Pagination = ({ totalPages = 0, goTopage, activePage } : Props) => {

  const paginationItems = Array.from(Array(totalPages).keys());

  return (
    <div className="pagination-container">
      {paginationItems.map(item => (
        <button 
          key={item}
          className={`pagination-item ${activePage === item ? 'active' : 'inactive'}`}
          onClick={() => goTopage(item)}
        >
          {item + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;

//  === 2:05:05 === 