import { ReactComponent as TMDBLogo } from '../../assets/images/TMDBLogo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="base-container">
        <div className="footer-wrapper">
          <div className="footer-partners">
            <div className="gray very-small-text">Made with</div>
            <TMDBLogo width={100} />
          </div>
          <div className="footer-contact">
            <div>Made by:
            <a href="https://github.com/ihavebadfantasy" target="_blank">ihavebadfantasy</a>
            </div>
            <div
              className="gray very-small-text footer-contact-text"
            >
              <span>Feel free to contact me for</span>
              <span>bug reports or any other reason:)</span>
            </div>
            <a href="mailto:ihavebadfantasy@protonmail.com">
              ihavebadfantasy@protonmail.com
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
