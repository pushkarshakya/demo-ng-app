import { Component, OnInit } from '@angular/core';
import { IObjectType } from './object-type';
import { ObjectTypeService } from './object-type.service';

@Component({
  selector: 'app-object-type',
  templateUrl: './object-type.component.html',
  styleUrls: ['./object-type.component.css']
})
export class ObjectTypeComponent implements OnInit {

  objectType: IObjectType = {};
  objectTypes: IObjectType[] = [];
  errorMessage = '';
  isEditMode: boolean = false;

  constructor(private objectTypeService: ObjectTypeService) { }

  ngOnInit(): void {
    this.objectTypeService.getObjectTypes().subscribe({
      next: objectTypes => {
        this.objectTypes = objectTypes;
      },
      error: (err: string) => this.errorMessage = err
    });
  }

  clear() {
    this.objectType = {};
    this.isEditMode = false;
    this.errorMessage = '';

  }

  addObjectType() {
    this.objectTypes = this.objectTypes.concat(this.objectType);
    this.clear();
  }

  edit(objectTypeId: any) {
    this.clear();

    this.objectTypeService.getObjectType(objectTypeId).subscribe({
      next: objectType => {
        console.log(objectType);
        if (objectType != undefined) {
          this.objectType = objectType;
          this.isEditMode = true;
        }
      },
      error: (err: string) => this.errorMessage = err
    });
  }

  delete(objectTypeId: any) {
    if (!confirm("Are you sure to delete this Object Type?"))
      return;

    this.clear();
    this.objectTypes = this.objectTypes.filter(item => item.objectTypeId != objectTypeId);
  }

  saveObjectType() {
    let objectType: any = this.objectTypes.find(item => item.objectTypeId == this.objectType.objectTypeId);
    if (objectType != undefined)
      objectType.objectTypeName = this.objectType.objectTypeName;
  }  

}
