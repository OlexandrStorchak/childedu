import { playNumber } from '../../../utils/numbers';
import styles from '../../../styles/Numbers.module.css'

interface INumberItem {
  number: number;
  playSelectNumberGame: boolean;
  setSelectedNumber: (number: number) => void;
}

const NumberItem = ({
  number,
  playSelectNumberGame,
  setSelectedNumber,
}: INumberItem) => {
  const handleNumberClick = () => {
    if (playSelectNumberGame === false) playNumber(number);
    setSelectedNumber(number);
  };

  return (
    <div className={styles['card-content']} id={`number ${number.toString()}`} onClick={handleNumberClick}>
      <div className={styles['card-content-text']}>{number}</div>
    </div>
  );
};

export default NumberItem;
