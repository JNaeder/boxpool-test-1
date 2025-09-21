import type { Boxpool } from "../types/boxpoolTypes";
import { db, storage } from "./firebase";
import { updateDoc, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const createNewBoxpoolInDB = async (userId: string): Promise<string> => {
  const boxpoolCollection = collection(db, "boxpools");
  const newBoxpool: Boxpool = {
    name: "",
    userId: userId,
    eventId: "",
    boxNumbers: {
      homeBoxNumbers: [],
      awayBoxNumbers: [],
    },
    prizeNumbers: {
      gameScore: {
        firstQuarter: "",
        secondQuarter: "",
        thirdQuarter: "",
        final: "",
      },
      plusTwo: null,
      plusFive: null,
      reverse: null,
    },
    boxes: {},
  };

  const docRef = await addDoc(boxpoolCollection, newBoxpool);
  return docRef.id;
};

export const updateBoxpoolDataInDB = async (
  boxId: string,
  boxpoolData: Boxpool
) => {
  const docRef = doc(db, "boxpools", boxId);
  await updateDoc(docRef, boxpoolData);
};

export const updateEventIdInDB = async (
  boxId: string | undefined,
  newEventId: string
) => {
  if (boxId) {
    const docRef = doc(db, "boxpools", boxId);
    await updateDoc(docRef, { eventId: newEventId });
  }
};

export const writeBoxDataToDB = async (
  boxId: string,
  boxpoolData: Boxpool | null
) => {
  if (!boxpoolData) return;
  // console.log(boxpoolData);
  const docRef = doc(db, "boxpools", boxId);
  await setDoc(docRef, boxpoolData);
};

export const uploadImageToStorage = async (
  boxImage: File,
  userId: string
): Promise<string> => {
  const imageRef = ref(
    storage,
    `boxesImages/${userId}/${boxImage.name}-${crypto.randomUUID()}`
  );
  const snapshot = await uploadBytes(imageRef, boxImage);
  const imageURL = await getDownloadURL(snapshot.ref);
  return imageURL;
};
