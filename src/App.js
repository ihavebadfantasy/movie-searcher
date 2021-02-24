import Container from './components/Container';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import MediaCarousel from './components/MediaCarousel';

const App = () => {
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
          slidesPerPage={5}
        />

        <MediaCarousel
          containerTheme={['withTitle']}
          containerClass="mb-30"
          title="The Newest TV-Shows"
          slidesPerPage={3}
        />

        <MediaCarousel
          containerTheme={['withTitle']}
          containerClass="mb-30"
          title="The Most Popular Movies"
          slidesPerPage={7}
        />

        <MediaCarousel
          containerTheme={['withTitle']}
          containerClass="mb-30"
          title="The Most Popular TV-Shows"
          slidesPerPage={5}
        />

      </div>
    </div>
  );
}

export default App;
