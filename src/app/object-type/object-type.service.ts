import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IObjectType } from "./object-type";

@Injectable({
    providedIn: 'root'
})
export class ObjectTypeService {
    constructor(private http: HttpClient) { }

    getObjectTypes(): Observable<IObjectType[]> {
        return this.http.get<IObjectType[]>(environment.objectTypeApiUrl + '/GetAll');
    }

    getObjectType(objectTypeId: number): Observable<IObjectType | undefined> {
        return this.http.get<IObjectType>(environment.objectTypeApiUrl+ '/Get/' + objectTypeId);
    }

    insertObjectType(objectType: IObjectType) {
        return this.http.post(environment.objectTypeApiUrl + "/Insert", objectType);
    }

    updateObjectType(objectType: IObjectType) {
        return this.http.put(environment.objectTypeApiUrl + "/Update/" + objectType.objectTypeId, objectType);
    }

    deleteObjectType(objectTypeId: any) {
        return this.http.delete(environment.objectTypeApiUrl + "/Delete/" + objectTypeId);
    }
}
