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
          containerTheme={['withTitle', 'dark']}
          containerClass="mb-30"
          title="The Newest Movies"
        />

        <MediaCarousel
          containerTheme={['withTitle']}
          containerClass="mb-30"
          title="The Newest TV-Shows"
        />

        <MediaCarousel
          containerTheme={['withTitle', 'dark']}
          containerClass="mb-30"
          title="The Most Popular Movies"
        />

        <MediaCarousel
          containerTheme={['withTitle']}
          containerClass="mb-30"
          title="The Most Popular TV-Shows"
        />

      </div>
    </div>
  );
}

export default App;
