import config from '../../config';
// TODO: add image placeholder

const MediaCardLight = ({title, img}) => {
  return (
    <div className="media-card-light">
      {img && (
        <div className="media-card-light-img">
          <img src={`${config.api.urls.dbImages}${img}`} />
        </div>
      )}
      <h3 className="media-card-light-title">
        {title}
      </h3>
    </div>
  );
}

export default MediaCardLight;
