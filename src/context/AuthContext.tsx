import {
  googleLogout,
  TokenResponse,
  useGoogleLogin,
} from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { ROOT_PATH } from '../constants';
import { IAuthUser, IGoogleAuthUserInfo } from '../types';

type AuthValuesType = {
  user: IAuthUser | null;
  profile: IGoogleAuthUserInfo | null;
  setProfile: (data: any) => void;
  login: () => void;
  logout: () => void;
  showSpiner: boolean;
  setShowSpiner: (show: boolean) => void;
};

const defaultProvider: AuthValuesType = {
  user: null,
  profile: null,
  setProfile: (data: IGoogleAuthUserInfo) => null,
  login: () => null,
  logout: () => null,
  showSpiner: false,
  setShowSpiner: (show: boolean) => null,
};

const AuthContext = React.createContext(defaultProvider);

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const router = useRouter();
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [profile, setProfile] = useState<IGoogleAuthUserInfo | null>(null);
  const [showSpiner, setShowSpiner] = useState<boolean>(false);
  const USER_INFO_URL = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.accessToken}`;

  const headers = {
    Authorization: `Bearer ${user?.accessToken}`,
    Accept: 'application/json',
  };

  const login = useGoogleLogin({
    onSuccess: ({ access_token }: TokenResponse) =>
      setUser({ ...user, accessToken: access_token }),
    onError: () => console.log('error login'),
  });

  const logout = () => {
    googleLogout();
    setUser(null);
  };

  const getUserInfo = () => {
    setShowSpiner(true);
    axios
      .get(USER_INFO_URL, { headers })
      .then(({ data }: any) => setProfile(data))
      .catch((err) => console.log(err))
      .finally(() => setShowSpiner(false));
  };

  const values = {
    user: user,
    profile,
    setProfile,
    login,
    logout,
    showSpiner,
    setShowSpiner,
  };

  useEffect(() => {
    if (user) getUserInfo();
    if (!user) router.push(ROOT_PATH);
  }, [user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
