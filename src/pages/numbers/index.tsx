import { useContext, useEffect, useState } from 'react';
import NumberItem from '../../components/numbers/NumberItem';
import _ from 'lodash';
import { numbersArray } from '../../constants';
import {
  onTryAgain,
  onWin,
  findNumberGame,
  pickNumberGameCheck,
} from '../../utils/numbers';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Numbers.module.css'

const Numbers = () => {
  interface Scores {
    success: string[];
    failed: string[];
  }
  const { user } = useContext(AuthContext)
  const initScores = { success: [''], failed: [''] }
  const [turns, setTurns] = useState(() => 0)
  const [findNumberDissabled, setFindNumberDissabled] = useState(() => false)
  const [numbers, setNumbers] = useState<number[]>(() => numbersArray)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(0)
  const [number, setNumber] = useState<number | null>(null)
  const [playSelectNumberGame, setPlaySelectNumberGame] =
    useState<boolean>(false)
  const [scores, setScores] = useState<Scores>(() => initScores)

  const resetHandling = () => {
    setTurns(0)
    setPlaySelectNumberGame(false)
    setFindNumberDissabled(false)
    setNumbers(numbersArray)
    setScores(() => initScores)
  };

  const onShuffleHandling = () => {
    setNumbers(_.shuffle(numbers))
  };

  const startSelectNumberGame = () => {
    setFindNumberDissabled(true)
    findNumberGame(setPlaySelectNumberGame, setNumber)
    onShuffleHandling()
  };

  useEffect(() => {
    if (playSelectNumberGame) {
      if (pickNumberGameCheck(number!, selectedNumber!)) {
        onWin();
        setScores({ ...scores, success: [...scores.success, ' 👍 '] })
        setNumbers([number!])
        setFindNumberDissabled(false)
        setTimeout(() => {
          startSelectNumberGame()
        }, 2500);
      } else {
        onTryAgain();
        setScores({ ...scores, failed: [...scores.failed, ' 👎 '] })
        setNumbers([number!])
        setTimeout(() => {
          startSelectNumberGame()
        }, 4100);
      }
    }
  }, [selectedNumber,turns])

  return (
    <>
      <div className={styles.buttons}>
        <button onClick={startSelectNumberGame} disabled={findNumberDissabled}>▶️</button>
        <button onClick={resetHandling}>🔄</button>
        <button onClick={onShuffleHandling}>🔀</button>
      </div>
      <div className={styles['scores-success']} >
        {scores.success}
      </div>
      <div className={styles['scores-failed']}>
        {scores.failed}
      </div>

      <div className={styles.container}>
        <div className={styles.cards}>
          {numbers.map((number) => {
            return (
              <div key={number} className={styles.card} onClick={() => setTurns((prev) => prev + 1)}>
                <NumberItem
                  number={number}
                  setSelectedNumber={setSelectedNumber}
                  playSelectNumberGame={playSelectNumberGame}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Numbers;
