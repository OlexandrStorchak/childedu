import { ENGLISH_PAGE, NUMBERS_PAGE, ROOT_PATH } from '../../constants';
import UserMenu from '../userMenu';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import styles from '../../styles/Nav.module.css'
import router from 'next/router';

const Navigation = () => {
  const { user } = useContext(AuthContext);

  const onNavigationClick = (page:string) => {
    router.push(page)
  }

  return (
    <>
      <div className={styles.buttons} onClick={() => onNavigationClick(ROOT_PATH)}>🏠</div>
      <div className={styles.buttons} onClick={() => onNavigationClick(NUMBERS_PAGE)}>🔢</div>
      <div className={styles.buttons} onClick={() => onNavigationClick(ENGLISH_PAGE)}>🇬🇧</div>
      <div className={styles.login}>
        <UserMenu />
      </div>
    </>
  );
};
export default Navigation;
