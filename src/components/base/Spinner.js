import { ReactComponent as BasicSpinner } from '../../assets/images/basicSpinner.svg'

const colors = {
  'primary': 'primary'
};

const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

const Spinner = ({ color = 'primary', size = 'small' }) => {
  return (
    <div uk-spinner="" className={`spinner uk-icon uk-spinner ${colors[color]}`}>
      <BasicSpinner className={`spinner-icon ${sizes[size]}`} />
    </div>
  );
};

export default Spinner;
