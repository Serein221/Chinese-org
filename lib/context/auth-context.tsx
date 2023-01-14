import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import {
  usersCollection,
  userStatsCollection,
  userBookmarksCollection
} from '@lib/firebase/collections';
import { getRandomId } from '@lib/random';
import type { ReactNode } from 'react';
import type { WithFieldValue } from 'firebase/firestore';
import type { User } from '@lib/types/user';
import type { Bookmark } from '@lib/types/bookmark';
import type { Stats } from '@lib/types/stats';
import { useAccount, useDisconnect } from 'wagmi';
type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed: string;
  userBookmarks: Bookmark[] | null;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  var url1 = [
    'https://s1.ax1x.com/2023/01/06/pSESTCF.png',
    'https://s1.ax1x.com/2023/01/06/pSESI4U.png',
    'https://s1.ax1x.com/2023/01/06/pSES8hD.png',
    'https://s1.ax1x.com/2023/01/06/pSES3tO.png',
    'https://s1.ax1x.com/2023/01/06/pSES1AK.png',
    'https://s1.ax1x.com/2023/01/06/pSESQ76.png',
    'https://s1.ax1x.com/2023/01/06/pSESM0x.png',
    'https://s1.ax1x.com/2023/01/06/pSESKn1.png',
    'https://s1.ax1x.com/2023/01/06/pSESnXR.png',
    'https://s1.ax1x.com/2023/01/06/pSESmc9.png',
    'https://s1.ax1x.com/2023/01/06/pSESe1J.png',
    'https://s1.ax1x.com/2023/01/06/pSESZp4.png',
    'https://s1.ax1x.com/2023/01/06/pSAzTOI.png'
  ]

  function getRndInteger1(min1, max1) {
    return Math.floor(Math.random() * (max1 - min1 + 1) ) + min1;
  }
  
  useEffect(() => {
    const handleUser = async (address: string): Promise<void> => {
      const userSnapshot = await getDoc(doc(usersCollection, address));
      if (!userSnapshot.exists()) {
        const userData: WithFieldValue<User> = {
          id: address,
          bio: null,
          name: address,
          theme: null,
          accent: null,
          website: null,
          location: null,
          photoURL: url1[getRndInteger1(0,12)],
          username: address,
          verified: false,
          subscribed: [],
          subscriber: [],
          createdAt: serverTimestamp(),
          updatedAt: null,
          totalTweets: 0,
          totalPhotos: 0,
          pinnedTweet: null,
          coverPhotoURL: null,
          balance: 100
        };

        const userStatsData: WithFieldValue<Stats> = {
          likes: [],
          tweets: [],
          updatedAt: null
        };

        try {
          await Promise.all([
            setDoc(doc(usersCollection, address), userData),
            setDoc(doc(userStatsCollection(address), 'stats'), userStatsData)
          ]);
          const newUser = (await getDoc(doc(usersCollection, address))).data();
          setUser(newUser as User);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        const userData = userSnapshot.data();
        setUser(userData);
      }
      try {
        setLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };

    if (address) {
      void handleUser(address);
    }
  }, [address]);

  useEffect(() => {
    if (!user) return;

    const { id } = user;

    const unsubscribeUser = onSnapshot(doc(usersCollection, id), (doc) => {
      setUser(doc.data() as User);
    });

    const unsubscribeBookmarks = onSnapshot(
      userBookmarksCollection(id),
      (snapshot) => {
        const bookmarks = snapshot.docs.map((doc) => doc.data());
        setUserBookmarks(bookmarks);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribeBookmarks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const signOut = () => {
    setLoading(false);
    setUser(null);
    disconnect();
  };
  const isAdmin = false;
  const randomSeed = useMemo(getRandomId, [user?.id]);

  const value: AuthContext = {
    user,
    error,
    loading,
    isAdmin,
    randomSeed,
    userBookmarks,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within an AuthContextProvider');

  return context;
}
