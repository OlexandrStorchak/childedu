import { CircularProgress, Popover } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Nav.module.css'

const UserMenu = () => {
  const { login, logout, user, profile, showSpiner } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const anchorEl = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <>
      {showSpiner ? (
        <div className={styles.menu}>
          <CircularProgress className='nav-user-menu-user-name' />
        </div>
      ) : (
        <>
          {user ? (
            <>
              {profile && (
                <div
                  className={styles.menu}
                  ref={anchorEl}
                  onClick={handleOpen}
                >
                  <span>
                    {profile.name}
                  </span>
                  <img src={profile.picture} alt='user image' />
                </div>
              )}
              <>
                <Popover
                  id='user-menu-popover'
                  open={open}
                  anchorEl={anchorEl.current}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <div className={styles['menu-wrapper']}>
                    <button onClick={handleLogout}>Вийти</button>
                  </div>
                </Popover>
              </>
            </>
          ) : (
            <button onClick={login}>👤</button>
          )}
        </>
      )}
    </>
  );
};

export default UserMenu;
