import { useState, useEffect } from 'react';
import useWindowResize from '../../hooks/useWindowResize';
import Button from './Button';
import { useTranslation } from 'react-i18next';
const detectEndPage = (totalPages, startPage, btnsPerPage) => {
  if (startPage + btnsPerPage >= totalPages) {
    return totalPages;
  }

  return startPage + btnsPerPage;
}

const Pagination = ({
  showMore,
  totalPages,
  currentPage,
  switchPage,
  customClass = '',
  visible,
}) => {
  const [ t ] = useTranslation('general');

  const [windowWidth, layout] = useWindowResize();

  const [btnsPerPage, setBtnsPerPage] = useState(4);
  const [startPage, setStartPage] = useState( 1);
  const [endPage, setEndPage] = useState(startPage + btnsPerPage);

  useEffect(() => {
    switch (layout) {
      case 'phone':
        setBtnsPerPage(0);
        break;
      case 'phablet':
        setBtnsPerPage(0);
        break;
      case 'tablet':
        setBtnsPerPage(1);
        break;
      case 'containerWidth':
        setBtnsPerPage(3);
        break;
      default:
        setBtnsPerPage(4);
    }
  }, [layout]);
// TODO: fix non-smooth scroll when paginating last page
  useEffect(() => {
    if (currentPage && totalPages) {
      let newStartPage = currentPage - Math.floor(btnsPerPage / 2);

      if (newStartPage < 1) {
        newStartPage = 1;
      }

      if (btnsPerPage === 0) {
        newStartPage = currentPage;
      }

      if (newStartPage + Math.ceil(btnsPerPage / 2) < 1) {
        setStartPage(1);

        return;
      }

      if ((newStartPage + Math.ceil(btnsPerPage / 2)) < totalPages - 1) {
        setStartPage(newStartPage);
      } else {
        setStartPage(totalPages - (btnsPerPage + 1));
      }
    }
  }, [currentPage, totalPages, btnsPerPage]);

  useEffect(() => {
    if (totalPages) {
      setEndPage(detectEndPage(totalPages, startPage, btnsPerPage));
    }
  }, [totalPages, startPage, btnsPerPage]);

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
            switchPage(page);
          }}
        />
      );
    });
  }

  return (
    <div
      className={`pagination mt-40 mb-60-resp ${customClass} ${visible ? 'visible' : ''}`}
    >
      {currentPage !== totalPages && (
        <Button
          color="primary"
          text={t('showMoreBtn')}
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

        {startPage > 1 && (
          <div className="pagination-pages-first">
            <Button
              color="primary"
              text={1}
              customClass="pagination-pages-page-first-btn"
              onClick={() => {
                switchPage(1);
              }}
            />
            {startPage > 2 && <span>...</span>}
          </div>
        )}

        {renderPages()}

        {endPage < totalPages && (
          <div className="pagination-pages-last">
            {endPage < totalPages - 1 && <span>...</span>}
            <Button
              color={currentPage === totalPages ? 'warning' : 'primary'}
              text={totalPages}
              customClass="pagination-pages-page-last-btn"
              onClick={() => {
                switchPage(totalPages);
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
