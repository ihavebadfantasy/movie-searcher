import { useContext } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as UsaFlag } from '../../assets/images/usaFlag.svg';
import { ReactComponent as PixelatedUsaFlag } from '../../assets/images/pixelatedUsaFlag.svg';
import { ReactComponent as PixelatedRussiaFlag } from '../../assets/images/pixelatedRussiaFlag.svg';
import { ReactComponent as RussiaFlag } from '../../assets/images/russiaFlag.svg';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../store/user/actions';
import ThemeContext from '../../contexts/ThemeContext';
import config from './../../config';

const { basic, nes } = config.themes;

const LanguageFlagsSelector = ({ setLanguage }) => {
  const { theme } = useContext(ThemeContext);
  const [ t , i18n] = useTranslation('general');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  }

  return (
    <div className="language-flags-selector">
      { theme === nes ? (
        <>
          <PixelatedUsaFlag
            className={`usa-flag ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => {
              changeLanguage('en');
            }}
          />
          <PixelatedRussiaFlag
            className={`russia-flag ${i18n.language === 'ru' ? 'active' : ''}`}
            onClick={() => {
              changeLanguage('ru');
            }}
          />
          </>
      ) : (
       <>
         <UsaFlag
           className={`usa-flag ${i18n.language === 'en' ? 'active' : ''}`}
           onClick={() => {
             changeLanguage('en');
           }}
         />
         <RussiaFlag
           className={`russia-flag ${i18n.language === 'ru' ? 'active' : ''}`}
           onClick={() => {
             changeLanguage('ru');
           }}
         /></>
      ) }
    </div>
  );
}

const mapDispatchToProps = {
  setLanguage,
}

export default connect(null, mapDispatchToProps)(LanguageFlagsSelector);
