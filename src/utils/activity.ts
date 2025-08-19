/* eslint-disable import/no-unresolved */
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
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
    await addDoc(collection(db, 'loginLogs'), {
      userId: user.id,
      email: user.email,
      name: user.name,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error logging login', error);
  }
};

export const fetchLoginLogs = async (): Promise<
  { userId: string; email: string; name: string; timestamp: string }[]
> => {
  const q = query(
    collection(db, 'loginLogs'),
    orderBy('timestamp', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as any);
};

