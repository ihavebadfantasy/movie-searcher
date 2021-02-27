import Home from './components/Home';
import Header from './components/Header';
import Search from './components/Search';

const App = () => {
  return (
    <div>
      <Header />

      <div>
        <Home />
        <Search />
      </div>
    </div>
  );
}

export default App;
