import Loader from '../base/Loader';
import Container from '../base/Container';
import { Link } from 'react-router-dom';
import MediaCardLight from '../media/MediaCardLight';

const SearchResults = ({isSearching, results}) => {
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
          customClass="mt-60-resp light-border"
        >
          <div className="flex-wrapper">
            {results.map((result) => {
              return (
                <Link
                  to={`/movies/${result.id}`}
                  key={result.id}
                  className="flex-child"
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
