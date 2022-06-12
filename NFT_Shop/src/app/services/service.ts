import { Injectable } from '@angular/core';
import { AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private db: AngularFirestore) { }

  getAllUsers() {
    return new Promise<any>((resolve)=> {
      this.db.collection('User').valueChanges({ idField: 'id' }).subscribe(users => resolve(users));
    })
  }

}
