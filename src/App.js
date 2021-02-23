import Container from './components/Container';
import Header from './components/Header';
import SearchInput from './components/SearchInput';

const App = () => {
  return (
    <div>
      <Header />
      <div className="base-container mt-60-resp">
        <div className="mb-30">
          <SearchInput />
        </div>
        <Container
          theme={['withTitle']}
          title="Most Popular"
          customClass={'mb-30'}
        >
          <div>most popular slider</div>
        </Container>

        <Container
          theme={['withTitle', 'dark']}
          title="The Newest"
        >
          <div>the newest slider</div>
        </Container>
      </div>
    </div>
  );
}

export default App;
