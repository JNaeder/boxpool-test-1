import type { Boxpool } from "../types/boxpoolTypes";
import { db, storage } from "./firebase";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const updateEventIdInDB = async (boxId: string, newEventId: string) => {
  const docRef = doc(db, "boxpools", boxId);
  await updateDoc(docRef, { eventId: newEventId });
};

export const writeBoxDataToDB = async (
  boxId: string,
  boxpoolData: Boxpool | null
) => {
  if (!boxpoolData) return;
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
