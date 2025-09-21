// React and external libraries
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Redux
import { useAppDispatch } from "./hooks";
import { setCurrentUser } from "./slices/userSlice";

// Components
import TopMenuBar from "./components/TopMenuBar";
import BoxPoolPage from "./components/BoxpoolPage/BoxPoolPage";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import LoginSignUpPage from "./components/LoginSignupPage/LoginSignUpPage";

// Types
import type { User } from "./types/userTypes";

// Utils
import { app, auth } from "./lib/firebase";

function App() {
  const dispatch = useAppDispatch();
  getAnalytics(app);

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
        console.log(user);
        dispatch(setCurrentUser(user));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <>
      <BrowserRouter>
        <TopMenuBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="box/:boxId" element={<BoxPoolPage />} />
          <Route path="/login" element={<LoginSignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
