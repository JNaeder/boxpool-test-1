// React and external libraries
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Redux
import { useAppDispatch, useAppSelector } from "./hooks";
import { setCurrentUser, setBoxPools } from "./slices/userSlice";

// Components
import TopMenuBar from "./components/TopMenuBar";
import BoxPoolPage from "./components/BoxpoolPage/BoxPoolPage";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/Dashboard/DashboardPage";

// Types
import type { Boxpool } from "./types/boxpoolTypes";
import type { User } from "./types/userTypes";

// Utils
import { app, auth, db } from "./lib/firebase";

function App() {
  const dispatch = useAppDispatch();
  getAnalytics(app);

  const { user: currentUser } = useAppSelector((store) => store.user);

  // Get Current Logged In User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user: User = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          photoURL: currentUser.photoURL,
        };
        dispatch(setCurrentUser(user));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  // Get User Boxpools
  useEffect(() => {
    const getAllUserBoxPoolData = async () => {
      if (!currentUser) return;
      const q = query(
        collection(db, "boxpools"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const boxpoolsArray = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Boxpool;
      });

      dispatch(setBoxPools(boxpoolsArray));
    };

    getAllUserBoxPoolData();
  }, [currentUser]);

  return (
    <>
      <BrowserRouter>
        <TopMenuBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="box/:boxId" element={<BoxPoolPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
