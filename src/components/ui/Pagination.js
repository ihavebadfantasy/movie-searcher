import { useState, useEffect } from 'react';
import useWindowResize from '../../hooks/useWindowResize';
import Button from './Button';

const detectEndPage = (totalPages, startPage, btnsPerPage) => {
  if (startPage + btnsPerPage > totalPages) {
    return totalPages;
  }

  return startPage + btnsPerPage;
}

const Pagination = ({showMore, totalPages, currentPage, switchPage}) => {
  const [windowWidth, layout] = useWindowResize();

  const [btnsPerPage, setBtnsPerPage] = useState(4);
  const [startPage, setStartPage] = useState(currentPage || 1);
  const [endPage, setEndPage] = useState(startPage + btnsPerPage);

  useEffect(() => {
    switch (layout) {
      case 'phone':
        setBtnsPerPage(0);
        break;
      case 'phablet':
        setBtnsPerPage(1);
        break;
      case 'tablet':
        setBtnsPerPage(2);
        break;
      case 'containerWidth':
        setBtnsPerPage(3);
        break;
      default:
        setBtnsPerPage(4);
    }
  }, [layout])

  useEffect(() => {
    if (totalPages) {
      setEndPage(detectEndPage(totalPages, startPage, btnsPerPage));
    }
  }, [totalPages, startPage, btnsPerPage])

  const renderPages = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages.map((page) => {
      return (
        <Button
          key={page}
          color={page === currentPage ? 'warning' : 'primary'}
          text={page}
          customClass="pagination-pages-page-btn"
          onClick={() => {
            if (page === endPage) {
              setStartPage(endPage);
            }

            switchPage(page);
            window.scrollTo(0, 0);
          }}
        />
      );
    });
  }

  return (
    <div className="pagination mt-40 mb-60-resp">
      {currentPage !== totalPages && (
        <Button
          color="primary"
          text="Show More"
          customClass="pagination-load-more-btn"
          onClick={showMore}
        />
      )}

      <div className="pagination-pages mt-40">
        <Button
          color={currentPage === 1 ? 'disabled' : 'primary'}
          disabled={currentPage === 1}
          text="<"
          customClass="pagination-pages-prev-btn"
          onClick={() => {
            switchPage(currentPage - 1);
          }}
        />
        {renderPages()}

        {endPage !== totalPages && (
          <div className="pagination-pages-last">
            <span>...</span>
            <Button
              color={currentPage === totalPages ? 'warning' : 'primary'}
              text={totalPages}
              customClass="pagination-pages-page-last-btn"
              onClick={() => {
                switchPage(totalPages);
                window.scrollTo(0, 0);
              }}
            />
          </div>
        )}
        <Button
          color={currentPage === totalPages ? 'disabled' : 'primary'}
          text=">"
          disabled={currentPage === totalPages}
          customClass="pagination-pages-next-btn"
          onClick={() => {
            switchPage(currentPage + 1);
          }}
        />
      </div>
    </div>
  );
}

export default Pagination;
