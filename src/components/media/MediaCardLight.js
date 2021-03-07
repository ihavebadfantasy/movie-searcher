import config from '../../config';
import posterPlaceholder from '../../assets/images/posterPlaceholder.png'
// TODO: add image placeholder

const MediaCardLight = ({title, img}) => {
  return (
    <div className="media-card-light">
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
