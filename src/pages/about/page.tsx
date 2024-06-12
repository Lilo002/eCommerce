import sprites from './ui/icon/sprites.svg';
import avatarMD from './ui/images/markovich.png';

import './ui/_about.scss';

export function AboutPage() {
  return (
    <div className="about">
      <h2 className="title">Meet the team</h2>
      <div className="about-cards">
        <div className="card-user">
          <div className="card-user-img-box">
            <img className="card-user-img-box-avatar" src={avatarMD} alt="avatar" />
          </div>
          <h2 className="card-user-name">Basarab Elizabeth</h2>
          <h3 className="card-user-role">Team Lead, Frontend Developer</h3>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Summary</h4>
          </div>
          <p className="card-user-about">
            Lisa is a member of the Team Lead race. Representatives of this race like to control everything, set tasks
            for other team members. They also like to share knowledge and contribute to the development of their team.
          </p>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Special properties</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">+15 to diplomatic negotiations</li>
            <li className="card-user-list-item">Human healing skills increased by 100%</li>
            <li className="card-user-list-item">+40 to team damage</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Initial information</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">Role - Priest</li>
            <li className="card-user-list-item">Location - Homel, Belarus</li>
            <li className="card-user-list-item">Education - Belarusian Medical State University</li>
            <li className="card-user-list-item">Start item - Medical kit</li>
            <li className="card-user-list-item">Weapon - Staff</li>
            <li className="card-user-list-item">Companion - Dog</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Contributions</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">Prayed to the supreme god of SDK.</li>
            <li className="card-user-list-item">Called for new followers to come back: login page.</li>
            <li className="card-user-list-item">Collected offerings from followers: cart page.</li>
            <li className="card-user-list-item">
              Entered into negotiations with other unfriendly tribes during cross-checks.
            </li>
            <li className="card-user-list-item">
              Called team members to pursue a spiritual mission: daily meetings and ClickUp.
            </li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Links</h4>
          </div>
          <a className="card-user-link" href="https://github.com/Lilo002" target="_blank" rel="noreferrer">
            <svg className="icon">
              <use xlinkHref={`${sprites}#github`} />
            </svg>
            &nbsp;@Lilo002
          </a>
        </div>

        <div className="card-user">
          <div className="card-user-img-box">
            <img className="card-user-img-box-avatar" src={avatarMD} alt="avatar" />
          </div>
          <h2 className="card-user-name">Zarembochka Luba</h2>
          <h3 className="card-user-role">Frontend Developer</h3>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Summary</h4>
          </div>
          <p className="card-user-about">
            Luba is a member of the Housewife Developer race. Representatives of this race can do several things at
            once, they are always ready to help other team members and are not afraid to ask for advice.
          </p>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Special properties</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">Availability of free time increased by 25%</li>
            <li className="card-user-list-item">Noise resistance increased by 50%</li>
            <li className="card-user-list-item">+30% to team damage</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Initial information</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">Role - Scout</li>
            <li className="card-user-list-item">Location - Wroclaw, Poland</li>
            <li className="card-user-list-item">Education - Grodno State University</li>
            <li className="card-user-list-item">Start item - Scoop</li>
            <li className="card-user-list-item">Weapon - Knife</li>
            <li className="card-user-list-item">Companion - Cat</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Contributions</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">Discreet surveillance of opponents: import products</li>
            <li className="card-user-list-item">Identified the weaknesses of opponents: product page</li>
            <li className="card-user-list-item">By force and threats attracted new followers: registration page</li>
            <li className="card-user-list-item">Identified possible avenues of retreat: breadcrumbs</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Links</h4>
          </div>
          <a className="card-user-link" href="https://github.com/Zarembochka" target="_blank" rel="noreferrer">
            <svg className="icon">
              <use xlinkHref={`${sprites}#github`} />
            </svg>
            &nbsp;@Zarembochka
          </a>
        </div>

        <div className="card-user">
          <div className="card-user-img-box">
            <img className="card-user-img-box-avatar" src={avatarMD} alt="avatar" />
          </div>
          <h2 className="card-user-name">Markovich Dmitry</h2>
          <h3 className="card-user-role">Frontend Developer</h3>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Summary</h4>
          </div>
          <p className="card-user-about">
            Dima is a member of the Night Developer race. Members of this race are no different from ordinary people
            during the day. In the evening, they sit closer to computers, their eyes turn red and their need for
            caffeine increases dramatically.
          </p>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Special properties</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">+5 to the action of the team during night time</li>
            <li className="card-user-list-item">The probability of a commit after 22.00 is increased by 50%</li>
            <li className="card-user-list-item">Testing skill increased by 50%</li>
            <li className="card-user-list-item"> +30% to team damage</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Initial information</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">Role - Warrior</li>
            <li className="card-user-list-item">Location - Brest, Belarus</li>
            <li className="card-user-list-item">Education - Brest State University named after A.S. Pushkin</li>
            <li className="card-user-list-item">Start item - A cup of coffee</li>
            <li className="card-user-list-item">Weapon - Sword</li>
            <li className="card-user-list-item">Companion - Dog</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Contributions</h4>
          </div>
          <ul className="card-user-list">
            <li className="card-user-list-item">
              Developing a defense plan: set up the project with Vite, Typescript, Sass, Jest
            </li>
            <li className="card-user-list-item">A successful attack on 404, catalog and about us pages</li>
            <li className="card-user-list-item">Reflecting multiple bugs attacks during testing</li>
            <li className="card-user-list-item">Gathered, filtering and sorting an army of products</li>
          </ul>
          <div className="card-user-title">
            <h4 className="card-user-title-content">Links</h4>
          </div>
          <a className="card-user-link" href="https://github.com/CrazyTapok" target="_blank" rel="noreferrer">
            <svg className="icon">
              <use xlinkHref={`${sprites}#github`} />
            </svg>
            &nbsp;@CrazyTapok
          </a>
        </div>
      </div>
    </div>
  );
}
