import { Link } from 'react-router-dom';

import sprite from './ui/sprites.svg';

import './ui/_footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <ul className="footer-social">
        <li>
          <Link to="https://www.facebook.com/" target="_blank">
            <svg className="footer-icon">
              <use xlinkHref={`${sprite}#facebook`} />
            </svg>
          </Link>
        </li>
        <li>
          <Link to="https://twitter.com/" target="_blank">
            <svg className="footer-icon">
              <use xlinkHref={`${sprite}#twitter`} />
            </svg>
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/" target="_blank">
            <svg className="footer-icon">
              <use xlinkHref={`${sprite}#instagram`} />
            </svg>
          </Link>
        </li>
      </ul>
      <span>2024</span>
      <div>
        <Link to="https://rs.school/" target="_blank">
          <svg className="footer-icon school-icon">
            <use xlinkHref={`${sprite}#rsschool`} />
          </svg>
        </Link>
      </div>
    </div>
  </footer>
);
