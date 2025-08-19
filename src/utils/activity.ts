/* eslint-disable import/no-unresolved */
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
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
    const userRef = doc(db, 'loginLogs', user.email);
    await setDoc(userRef, { email: user.email, name: user.name }, { merge: true });
    await addDoc(collection(userRef, 'logs'), {
      userId: user.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error logging login', error);
  }
};

export const fetchLoginLogs = async (): Promise<
  { email: string; name: string; logs: { timestamp: string }[] }[]
> => {
  const usersSnapshot = await getDocs(collection(db, 'loginLogs'));
  const userLogs = await Promise.all(
    usersSnapshot.docs.map(async (userDoc) => {
      const logsSnapshot = await getDocs(
        query(collection(userDoc.ref, 'logs'), orderBy('timestamp', 'desc'))
      );
      return {
        email: userDoc.id,
        ...(userDoc.data() as any),
        logs: logsSnapshot.docs.map((d) => d.data() as any),
      };
    })
  );
  return userLogs.sort((a, b) => a.email.localeCompare(b.email));
};

