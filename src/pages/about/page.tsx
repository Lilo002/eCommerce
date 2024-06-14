import { heroes } from './model/heroes';
import { CardUser } from './ui/CardUser';

import './ui/_about.scss';

export function AboutPage() {
  return (
    <div className="about">
      <h2 className="title">Our heroes</h2>
      <div className="about-cards">
        {heroes.map((hero) => (
          <CardUser hero={hero} />
        ))}
      </div>
    </div>
  );
}
