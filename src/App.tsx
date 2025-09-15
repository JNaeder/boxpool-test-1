import { useEffect, useState } from "react";
import type { Boxpool, User } from "./types";
import TopMenuBar from "./components/TopMenuBar";
import BoxPoolPage from "./components/BoxpoolPage/BoxPoolPage";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/Dashboard/DashboardPage";
// import { blankBoxpoolData } from "./fakeDB";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  // addDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyABQ0sYuFtyyryx_Tt0vENSiBJomHdpPEo",
    authDomain: "boxpool-cf6d8.firebaseapp.com",
    projectId: "boxpool-cf6d8",
    storageBucket: "boxpool-cf6d8.firebasestorage.app",
    messagingSenderId: "710308673241",
    appId: "1:710308673241:web:67e9269630da76f9b2b0c8",
    measurementId: "G-S4R1S19RGZ",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allBoxPools, setAllBoxPools] = useState<Boxpool[]>([]);

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
      setAllBoxPools(boxpoolsArray);
    };

    // Get Current Logged In User
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    getAllUserBoxPoolData();

    // const addData = async () => {
    //   const boxpoolDB = collection(db, "boxpools");
    //   const docRef = await addDoc(boxpoolDB, blankBoxpoolData);
    //   console.log(docRef);
    // };

    // addData();
  }, [currentUser]);

  return (
    <>
      <BrowserRouter>
        <TopMenuBar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          auth={auth}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={<DashboardPage allBoxpools={allBoxPools} />}
          />
          <Route
            path="box/:boxId"
            element={<BoxPoolPage db={db} storage={storage} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
