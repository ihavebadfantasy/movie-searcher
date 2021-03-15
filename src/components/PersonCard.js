import config from '../config';

const PersonCard = ({person}) => {
  return (
    <div className="person-card">
      <div className="person-card-poster">
        <img
          alt={person.name}
          src={`${config.api.urls.dbImages}${person.profile_path}`}
        />
      </div>
    </div>
  );
}

export default PersonCard;
