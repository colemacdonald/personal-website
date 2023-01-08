import React from 'react';
import { GiantButtonList } from '../../components/Buttons';
import { Title } from '../../components/Titles';
import { SilhouetteType } from '../../components/Silhouettes';

export const PersonalHome = () => (
  <div className="personal-home">
    <div className="personal-home-hero">
      <Title text="Cole Macdonald" />
      <p className="subtitle">Human Being</p>
      <p>Thanks for coming you might be the first person here...</p>
    </div>
    <GiantButtonList
      buttons={[
        {
          text: 'Music',
          href: '#/thehuman/music',
          silhouetteType: SilhouetteType.MusicNote
        },
        {
          text: 'Photography',
          href: '#/thehuman/photography',
          silhouetteType: SilhouetteType.Camera
        },
        {
          text: 'Game Development',
          href: '#/thehuman/wizethegame',
          silhouetteType: SilhouetteType.GameController
        }
      ]}
    />
  </div>
);
