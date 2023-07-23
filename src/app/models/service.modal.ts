import firebase from 'firebase/compat/app';

export default interface IServiceItem {
  uid: string;
  serviceName: string;
  password: string;
  imageUrl: string;
  timestamp: firebase.firestore.FieldValue;
  docID?: string;
}
