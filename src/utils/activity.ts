/* eslint-disable import/no-unresolved */
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
/* eslint-enable import/no-unresolved */

import { db } from './firebase';

export const logUserActivity = async (
  userId: string,
  activity: string
): Promise<void> => {
  try {
    await addDoc(collection(db, 'users', userId, 'activities'), {
      activity,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error logging activity', error);
  }
};

export const logUserProgress = async (
  userId: string,
  progress: Record<string, unknown>
): Promise<void> => {
  try {
    await addDoc(collection(db, 'users', userId, 'progress'), {
      ...progress,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error logging progress', error);
  }
};

export const logLogin = async (
  user: { id: string; email: string; name: string }
): Promise<void> => {
  try {
    await addDoc(collection(db, 'logins'), {
      email: user.email,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error logging login', error);
  }
};

export const fetchLoginLogs = async (): Promise<
  { email: string; timestamp: string }[]
> => {
  const logsSnapshot = await getDocs(
    query(collection(db, 'logins'), orderBy('timestamp', 'desc'))
  );
  return logsSnapshot.docs.map((d) => d.data() as { email: string; timestamp: string });
};

