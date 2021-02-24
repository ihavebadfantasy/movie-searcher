import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import MediaCarousel from './components/MediaCarousel';
import useWindowResize from './hooks/useWindowResize';

const App = () => {
  const [slidesPerPage, setSlidesPerPage] = useState(5);
  const [windowWidth, layout] = useWindowResize();

  useEffect(() => {
    switch (layout) {
      case 'phone':
        setSlidesPerPage(1);
        break;
      case 'phablet':
        setSlidesPerPage(2);
        break;
      case 'tablet':
        setSlidesPerPage(3);
        break;
      case 'containerWidth':
        setSlidesPerPage(4);
        break;
      default:
        setSlidesPerPage(5);
    }

  }, [layout])

  return (
    <div>
      <Header />
      <div className="base-container mt-60-resp">
        <div className="mb-30">
          <SearchInput />
        </div>

        <MediaCarousel
          containerTheme={['withTitle']}
          containerClass="mb-30"
          title="The Newest Movies"
          slidesPerPage={slidesPerPage}
        />

        {/*<MediaCarousel*/}
        {/*  containerTheme={['withTitle']}*/}
        {/*  containerClass="mb-30"*/}
        {/*  title="The Newest TV-Shows"*/}
        {/*  slidesPerPage={slidesPerPage}*/}
        {/*/>*/}

        {/*<MediaCarousel*/}
        {/*  containerTheme={['withTitle']}*/}
        {/*  containerClass="mb-30"*/}
        {/*  title="The Most Popular Movies"*/}
        {/*  slidesPerPage={slidesPerPage}*/}
        {/*/>*/}

        {/*<MediaCarousel*/}
        {/*  containerTheme={['withTitle']}*/}
        {/*  containerClass="mb-30"*/}
        {/*  title="The Most Popular TV-Shows"*/}
        {/*  slidesPerPage={slidesPerPage}*/}
        {/*/>*/}

      </div>
    </div>
  );
}

export default App;
