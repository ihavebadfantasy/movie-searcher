import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

const ControlButtons = ({onSearch, onReset}) => {
  const [ t ] = useTranslation('general');

  return (
    <>
      <Button
        customClass="w-100"
        text={t('searchBtn')}
        onClick={onSearch}
      />

      <Button
        customClass="w-100 mt-30"
        text={t('resetAllBtn')}
        onClick={onReset}
        color="error"
      /></>
  );
}

export default ControlButtons;
