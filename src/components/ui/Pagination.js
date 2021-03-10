import { useState, useEffect } from 'react';
import useWindowResize from '../../hooks/useWindowResize';
import Button from './Button';
// TODO: (bug) pagination must be more flexible, when I go to the last page than only this page displayed as page buttons
// TODO: (bug) fix pagination mobile styles
// TODO: (bug) fix all pagination logic bugs
const detectEndPage = (totalPages, startPage, btnsPerPage) => {
  console.log('start', startPage, 'total', totalPages);

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
  const [windowWidth, layout] = useWindowResize();

  const [btnsPerPage, setBtnsPerPage] = useState(4);
  const [startPage, setStartPage] = useState( 1);
  const [endPage, setEndPage] = useState(startPage + btnsPerPage);
  const [isReverse, setIsReverse] = useState(false);

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
  }, [layout]);

  useEffect(() => {
    if (currentPage && totalPages) {
      let newStartPage = currentPage - Math.floor(btnsPerPage / 2);

      if (newStartPage < 1) {
        newStartPage = 1;
      }
      if (btnsPerPage === 0) {
        newStartPage = currentPage;
      }

      setStartPage(newStartPage);
      // if (currentPage < startPage || currentPage === totalPages) {
      //   let newStartPage = startPage - btnsPerPage;
      //   if (newStartPage < 1) {
      //     newStartPage = 1;
      //   }
      //   setStartPage(newStartPage);
      //
      //   return;
      // }
      //
      // if (currentPage === endPage) {
      //   setStartPage(endPage);
      //
      //   return;
      // }




      // if (!isReverse) {
      //   if (currentPage === endPage) {
      //     setStartPage(startPage + btnsPerPage);
      //
      //     return;
      //   }
      //
      //   if (currentPage === startPage && currentPage !== 1) {
      //     setStartPage(startPage - btnsPerPage);
      //   }
      // }

      // if (currentPage === totalPages) {
      //   setIsReverse(true);
      //   setStartPage(totalPages - btnsPerPage);
      //
      //   return;
      // }
      //
      // if (currentPage === endPage && !isReverse) {
      //   setStartPage(endPage);
      //
      //   return;
      // }
      //
      // if (currentPage >= startPage && isReverse) {
      //   console.log('gfjhk');
      //   setStartPage(startPage - btnsPerPage);
      //
      //   return;;
      // }
      //
      // if (currentPage === 1) {
      //   setIsReverse(false);
      //   setStartPage(1);
      // }
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    if (totalPages) {
      setEndPage(detectEndPage(totalPages, startPage, btnsPerPage, isReverse));

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
            if (page === endPage) {
              setStartPage(endPage);
            }
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
        {/*{btnsPerPage < totalPages && isReverse && (*/}
        {/*  <div className="pagination-pages-first">*/}
        {/*    <Button*/}
        {/*      color="primary"*/}
        {/*      text={1}*/}
        {/*      customClass="pagination-pages-page-first-btn"*/}
        {/*      onClick={() => {*/}
        {/*        switchPage(1);*/}
        {/*        window.scrollTo(0, 0);*/}
        {/*      }}*/}
        {/*    />*/}
        {/*    <span>...</span>*/}
        {/*  </div>*/}
        {/*)}*/}

        {renderPages()}

        {/*{btnsPerPage < totalPages && !isReverse && (*/}
        {/*  <div className="pagination-pages-last">*/}
        {/*    <span>...</span>*/}
        {/*    <Button*/}
        {/*      color={currentPage === totalPages ? 'warning' : 'primary'}*/}
        {/*      text={totalPages}*/}
        {/*      customClass="pagination-pages-page-last-btn"*/}
        {/*      onClick={() => {*/}
        {/*        switchPage(totalPages);*/}
        {/*        window.scrollTo(0, 0);*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
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
