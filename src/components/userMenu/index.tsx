import { CircularProgress, Popover } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Nav.module.css'

const UserMenu = () => {
  const { login, logout, user, profile, showSpiner } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const anchorEl = useRef(null);
  const router = useRouter();

  const adminRoute = process.env.ADMIN_ROUTE;
  const adminEmail = process.env.ADMIN_EMAIL;

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

  const handleAdminClick = () => {
    handleClose();
    if (adminRoute) {
      router.push(`/${adminRoute}`);
    }
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
                    {profile?.email === adminEmail && (
                      <button onClick={handleAdminClick}>Admin</button>
                    )}
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
