interface Github {
  title: string;
  link: string;
}

interface InitialProperties {
  role: string;
  location: string;
  education: string;
  startItem: string;
  weapon: string;
  companion: string;
}

export interface Hero {
  name: string;
  role: string;
  summary: string;
  properties: string[];
  initial: InitialProperties;
  contributions: string[];
  github: Github;
}

const Lisa = {
  name: 'Basarab Elizabeth',
  role: 'Team Lead',
  summary:
    'Lisa is a member of the Team Lead race. Representatives of this race like to control everything, set tasks for other team members. They also like to share knowledge and contribute to the development of their team.',
  properties: ['+15 to diplomatic negotiations', 'Human healing skills increased by 100%', '+40 to team damage'],
  initial: {
    role: 'Priest',
    location: 'Homel, Belarus',
    education: 'Belarusian Medical State University',
    startItem: 'Medical kit',
    weapon: 'Staff',
    companion: 'Dog',
  },
  contributions: [
    'Prayed to the supreme god of SDK',
    'Called for new followers to come back: login page',
    'Collected offerings from followers: cart page',
    'Entered into negotiations with other unfriendly tribes during cross-checks',
    'Called team members to pursue a spiritual mission: daily meetings and ClickUp',
  ],
  github: {
    title: '@Lilo002',
    link: 'https://github.com/Lilo002',
  },
};

const Dima = {
  name: 'Markovich Dmitry',
  role: 'Frontend Developer',
  summary:
    'Dima is a member of the Night Developer race. Members of this race are no different from ordinary people during the day. In the evening, they sit closer to computers, their eyes turn red and their need for caffeine increases dramatically.',
  properties: [
    '+5 to the action of the team during night time',
    'The probability of a commit after 22.00 is increased by 50%',
    'Testing skill increased by 50%',
    '+30% to team damage',
  ],
  initial: {
    role: 'Warrior',
    location: 'Brest, Belarus',
    education: 'Brest State University',
    startItem: 'A cup of coffee',
    weapon: 'Sword',
    companion: 'Dog',
  },
  contributions: [
    'Developing a defense plan: set up the project with Vite, Typescript, Sass, Jest',
    'A successful attack on 404, catalog and about us pages',
    'Reflecting multiple bugs attacks during testing',
    'Gathered, filtering and sorting an army of products',
  ],
  github: {
    title: '@CrazyTapok',
    link: 'https://github.com/CrazyTapok',
  },
};

const Luba = {
  name: 'Hadunova Liubou',
  role: 'Frontend Developer',
  summary:
    'Luba is a member of the Housewife Developer race. Representatives of this race can do several things at once, they are always ready to help other team members and are not afraid to ask for advice.',
  properties: [
    'Availability of free time increased by 25%',
    'Noise resistance increased by 50%',
    '+30% to team damage',
  ],
  initial: {
    role: 'Asassin',
    location: 'Wroclaw, Poland',
    education: 'Grodno State University',
    startItem: 'Scoop',
    weapon: 'Knife',
    companion: 'Cat',
  },
  contributions: [
    'Discreet surveillance of opponents: import products',
    'Identified the weaknesses of opponents: product page',
    'By force and threats attracted new followers: registration page',
    'Identified possible avenues of retreat: breadcrumbs',
  ],
  github: {
    title: '@Zarembochka',
    link: 'https://github.com/Zarembochka',
  },
};

export const heroes: Hero[] = [Lisa, Dima, Luba];
