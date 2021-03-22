import { useState, useEffect, useContext } from 'react';
import useWindowResize from '../../hooks/useWindowResize';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../contexts/ThemeContext';
import config from '../../config';
import { ReactComponent as BasicNextArrow } from '../../assets/images/basicNextArrow.svg';
import { ReactComponent as BasicPrevArrow } from '../../assets/images/basicPrevArrow.svg';

const { nes, basic } = config.themes;

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
  const { theme } = useContext(ThemeContext);

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
        setBtnsPerPage(0);
        break;
      case 'containerWidth':
        setBtnsPerPage(2);
        break;
      default:
        setBtnsPerPage(3);
    }
  }, [layout]);

  useEffect(() => {
    if (currentPage && totalPages) {

      if (totalPages <= btnsPerPage + 1) {
        setStartPage(1);

        return;
      }

      let newStartPage = currentPage - Math.floor(btnsPerPage / 2);

      if (newStartPage < 1) {
        newStartPage = 1;
      }

      if (btnsPerPage === 0) {
        newStartPage = currentPage;
      }

      if ((newStartPage + Math.ceil(btnsPerPage / 2)) < totalPages - 1) {
        setStartPage(newStartPage);
      } else {
        setStartPage(totalPages - (btnsPerPage));
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
      let color;

      if (theme === nes && page === currentPage) {
        color = 'warning';
      }

      if (theme === nes && page !== currentPage) {
        color = 'primary';
      }

      if (theme === basic && page === currentPage) {
        color = 'emptyPrimary';
      }

      if (theme === basic && page !== currentPage) {
        color = 'empty';
      }
      return (
        <Button
          key={page}
          color={color}
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
          customClass="pagination-load-more-btn uk-button-default uk-button"
          onClick={showMore}
        />
      )}

      <div className="pagination-pages mt-40">
        { theme === nes ? (
          <Button
            color={currentPage === 1 ? 'disabled' : 'primary'}
            disabled={currentPage === 1}
            text="<"
            customClass="pagination-pages-prev-btn"
            onClick={() => {
              switchPage(currentPage - 1);
            }}
          />
          ) : (
            <button
              className="uk-icon uk-slidenav-prev uk-slidenav"
              disabled={currentPage === 1}
              onClick={() => {
                switchPage(currentPage - 1);
              }}
            >
              <BasicPrevArrow width={16} />
            </button>
          )
        }

        {startPage > 1 && (
          <div className="pagination-pages-first">
            <Button
              color={theme === nes ? 'primary': 'empty'}
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
              color={theme === nes ? 'primary': 'empty'}
              text={totalPages}
              customClass="pagination-pages-page-last-btn"
              onClick={() => {
                switchPage(totalPages);
              }}
            />
          </div>
        )}

        { theme === nes ? (
          <Button
            color={currentPage === totalPages ? 'disabled' : 'primary'}
            text=">"
            disabled={currentPage === totalPages}
            customClass="pagination-pages-next-btn"
            onClick={() => {
              switchPage(currentPage + 1);
            }}
          />
          ) : (
          <button
            className="uk-icon uk-slidenav-next uk-slidenav"
            disabled={currentPage === totalPages}
            onClick={() => {
              switchPage(currentPage + 1);
            }}
          >
            <BasicNextArrow width={16} />
          </button>
          )
        }
      </div>
    </div>
  );
}

export default Pagination;
