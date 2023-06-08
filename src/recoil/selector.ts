import { selector } from 'recoil';
import { passwordValueAtom } from './atom';

export const passwordSelector = selector({
  key: 'passwordSelector',
  get: ({ get }) => {
    const passwordValue = get(passwordValueAtom);

    return passwordValue;
  },
});