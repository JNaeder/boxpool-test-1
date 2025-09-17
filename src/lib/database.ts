import { db, storage } from "./firebase";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const updateEventIdInFirebase = async (
  boxId: string,
  newEventId: string
) => {
  const docRef = doc(db, "boxpools", boxId);
  await updateDoc(docRef, { eventId: newEventId });
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
