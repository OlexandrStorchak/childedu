import _ from 'lodash';

export const playNumber = (number: number, timeout?: boolean) => {
  const audio = new Audio(`/numbers/${number}ua.mp3`);
  return timeout ? setTimeout(() => audio.play(), 2000) : audio.play()
};

const playFindNumber = () => {
  const audio = new Audio(`/numbers/findNumberUA.mp3`);
  return audio.play();
};

export const findNumberGame = async (
  setPlaySelectNumberGame: (play: boolean) => void,
  setNumber: (number: number) => void
) => {
  setPlaySelectNumberGame(true);
  const number = _.random(1, 10);
  await playFindNumber();
  playNumber(number, true);
  setNumber(number);
};

export const onWin = () => {
  const audio = new Audio(`/numbers/winUA.mp3`);
  audio.play();
};

export const onTryAgain = () => {
  const audio = new Audio(`/numbers/tryAgain.mp3`);
  audio.play();
};

export const pickNumberGameCheck = (number: number, selectedNumber: number) =>
  number === selectedNumber;
