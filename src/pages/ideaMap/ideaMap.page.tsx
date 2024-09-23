import { Helmet } from 'react-helmet';

import { InstructionMap } from './instructionMap';
import { InteractiveMap } from './interactiveMap';
import styles from './ideaMap.module.css';

export const IdeaMapPage = () => (
  <div className={styles.page}>
    <Helmet>
      <title>Камская агломерация | Карта идей</title>
      <meta
        name="description"
        content="Есть идея, как сделать Камскую агломерацию более современной, комфортной и привлекательной? Напишите об этом здесь! Ваши идеи внимательно изучат разработчики."
      />

      <meta name="og:type" content="website" />
      <meta name="og:title" content="Камская агломерация | Карта идей" />
      <meta name="og:description" content="Камская агломерация | Карта идей" />
      <meta
        name="og:description"
        content="Есть идея, как сделать Камскую агломерацию более современной, комфортной и привлекательной? Напишите об этом здесь! Ваши идеи внимательно изучат разработчики."
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Камская агломерация | Карта идей" />
      <meta
        name="twitter:description"
        content="Есть идея, как сделать Камскую агломерацию более современной, комфортной и привлекательной? Напишите об этом здесь! Ваши идеи внимательно изучат разработчики."
      />
    </Helmet>
    <InstructionMap />
    <InteractiveMap />
  </div>
);
