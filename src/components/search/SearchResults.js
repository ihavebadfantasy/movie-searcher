import Loader from '../base/Loader';
import Container from '../base/Container';
import { Link } from 'react-router-dom';
import MediaCardLight from '../media/MediaCardLight';
// TODO: fix loader
const SearchResults = ({isSearching, results, customClass = ''}) => {
  const renderResults = () => {
    if (isSearching) {
      return (
        <div className="full-screen content-centered">
          <Loader />
        </div>
      );
    }

    if (results.length) {
      return (
        <Container
          theme={['withTitle']}
          title="Results"
          customClass="light-border"
        >
          <div className={`search-results ${customClass}`}>
            {results.map((result) => {
              return (
                <Link
                  to={`/movies/${result.id}`}
                  key={result.id}
                  className="search-results-item"
                >
                  <MediaCardLight
                    title={result.title}
                    img={result.poster_path}
                  />
                </Link>
              );
            })
            }
          </div>
        </Container>
      );
    }
  }

  return (
    <>
      {renderResults()}
    </>
    );
}

export default SearchResults;
