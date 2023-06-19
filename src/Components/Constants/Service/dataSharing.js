import { truncate } from 'lodash';
import{ ReplaySubject} from 'rxjs';
import jwt_decode from "jwt-decode";

const activity =new ReplaySubject();

export const dataSharing = {

    setRole: function setRole(data) {
        activity.next(data)
    },
    getRole: function getRole(){
       return activity.asObservable();
    }
  
};



