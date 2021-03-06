import config from '../../config';
import posterPlaceholder from '../../assets/images/posterPlaceholder.png'

const MediaCardLight = ({title, img}) => {
  return (
    <div className="media-card-light uk-box-shadow-small">
        <div className="media-card-light-img">
          <img src={img ? `${config.api.urls.dbImages}${img}` : posterPlaceholder} />
        </div>
      <h3 className="media-card-light-title">
        {title}
      </h3>
    </div>
  );
}

export default MediaCardLight;
