import firebase from 'firebase/compat/app';

export default interface IServiceItem {
  uid: string;
  serviceName: string;
  address: string;
  imageUrl: string;
  timestamp: firebase.firestore.FieldValue;
  docID?: string;
}
