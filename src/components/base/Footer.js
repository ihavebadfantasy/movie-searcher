import { useContext } from 'react';
import { ReactComponent as TMDBLogo } from '../../assets/images/TMDBLogo.svg';
import { useTranslation } from 'react-i18next';
import config from '../../config';
import ThemeContext from '../../contexts/ThemeContext';

const Footer = () => {
  const [ t ] = useTranslation('footer');

  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="base-container">
        <div className="footer-wrapper">
          <div className="footer-partners">
            <div className="gray very-small-text">{t('copyrightText1')}</div>
            <TMDBLogo width={100} />
          </div>

          <div>
            <div
              onClick={() => {setTheme(config.themes.basic)}}
            >
              boring
            </div>
            <div
              onClick={() => {setTheme(config.themes.nes)}}
            >
              cool
            </div>
          </div>

          <div className="footer-contact">
            <div>{t('copyrightText2')}
            <a href="https://github.com/ihavebadfantasy" target="_blank">  ihavebadfantasy</a>
            </div>
            <div
              className="gray very-small-text footer-contact-text"
            >
              <span>{t('contactUs1')}</span>
              <span>{t('contactUs2')}</span>
            </div>
            <a href={`mailto:${config.email.developer}`}>
              {config.email.developer}
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
