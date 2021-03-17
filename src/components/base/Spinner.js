import { ReactComponent as BasicSpinner } from '../../assets/images/basicSpinner.svg'

const Spinner = () => {
  return (
    <div uk-spinner="" className="uk-icon uk-spinner">
      <BasicSpinner />
    </div>
  );
}

export default Spinner;
