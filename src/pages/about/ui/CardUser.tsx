import { Hero } from '../model/heroes';

import sprites from './icon/sprites.svg';
import avatarMD from './images/markovich.png';

export const CardUser = ({ hero }: { hero: Hero }) => (
  <div className="card-user">
    <div className="card-user-img-box">
      <img className="card-user-img-box-avatar" src={avatarMD} alt="avatar" />
    </div>
    <h2 className="card-user-name">{hero.name}</h2>
    <h3 className="card-user-role">{hero.role}</h3>
    <div className="card-user-title">
      <h4 className="card-user-title-content">Summary</h4>
    </div>
    <div className="section-box">
      <p className="card-user-about">{hero.summary}</p>
    </div>
    <div className="card-user-title">
      <h4 className="card-user-title-content">Special properties</h4>
    </div>
    <div className="section-box">
      <ul className="card-user-list">
        {hero.properties.map((item) => (
          <li className="card-user-list-item">{item}</li>
        ))}
      </ul>
    </div>
    <div className="card-user-title">
      <h4 className="card-user-title-content">Initial information</h4>
    </div>
    <div className="section-box-large">
      <ul className="card-user-list">
        <li className="card-user-list-item">Role - {hero.initial.role}</li>
        <li className="card-user-list-item">Location - {hero.initial.location}</li>
        <li className="card-user-list-item">Education - {hero.initial.education}</li>
        <li className="card-user-list-item">Start item - {hero.initial.startItem}</li>
        <li className="card-user-list-item">Weapon - {hero.initial.weapon}</li>
        <li className="card-user-list-item">Companion - {hero.initial.companion}</li>
      </ul>
    </div>
    <div className="card-user-title">
      <h4 className="card-user-title-content">Contributions</h4>
    </div>
    <div className="section-box-large">
      <ul className="card-user-list">
        {hero.contributions.map((item) => (
          <li className="card-user-list-item">{item}</li>
        ))}
      </ul>
    </div>
    <div className="card-user-title">
      <h4 className="card-user-title-content">Links</h4>
    </div>
    <a className="card-user-link" href={hero.github.link} target="_blank" rel="noreferrer">
      <svg className="icon">
        <use xlinkHref={`${sprites}#github`} />
      </svg>
      &nbsp;{hero.github.title}
    </a>
  </div>
);
