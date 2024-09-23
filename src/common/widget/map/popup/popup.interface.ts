import { Popup } from 'react-leaflet';

import type { Idea, Rubric } from '@app/api';

export interface PopupProps
  extends React.ComponentPropsWithoutRef<typeof Popup> {
  idea: Idea;
  rubric: Rubric | undefined;
}
