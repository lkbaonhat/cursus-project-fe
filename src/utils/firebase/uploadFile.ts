import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // import các phương thức cần thiết
import { firebaseApp } from "./firebase";
// import firebaseApp nếu bạn dùng tên khác cho biến khởi tạo

export const uploadFile = async (file: File, folderPath: string): Promise<string> => {
    const storage = getStorage(firebaseApp); // Lấy Firebase Storage instance
    const storageRef = ref(storage, `${folderPath}/${file.name}`); // Tạo tham chiếu đến file

    const snapshot = await uploadBytes(storageRef, file); // Upload file vào Firebase Storage
    const downloadURL = await getDownloadURL(snapshot.ref); // Lấy URL của file đã upload
    return downloadURL;
};
