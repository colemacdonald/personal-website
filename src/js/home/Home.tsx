import React from 'react';
import { GiantButtonList } from '../components/Buttons';
import { SilhouetteType } from '../components/Silhouettes';
import { Title } from '../components/Titles';

export const Home = () => (
  <div className="home">
    <div className="home-hero-section">
      <Title text="Welcome!" />
      <img className="home-image" src={require('../../resources/home/cole2.jpeg')} />

      <p className="subtitle">Click below to learn more about Cole Macdonald.</p>
    </div>
    <GiantButtonList
      buttons={[
        {
          text: 'THE HUMAN',
          href: '#/thehuman',
          silhouetteType: SilhouetteType.Head
        },
        {
          text: 'THE ENGINEER',
          href: '#/theengineer',
          silhouetteType: SilhouetteType.Gear
        }
      ]}
    />
  </div>
);
