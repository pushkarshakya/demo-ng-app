import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IObjectType } from './object-type';
import { ObjectTypeService } from './object-type.service';

@Component({
  selector: 'app-object-type',
  templateUrl: './object-type.component.html',
  styleUrls: ['./object-type.component.css']
})
export class ObjectTypeComponent implements OnInit {
  objectTypeForm: FormGroup;
  objectType: IObjectType = {};
  objectTypes: IObjectType[] = [];
  errorMessage = '';
  isEditMode: boolean = false;

  constructor(private objectTypeService: ObjectTypeService) {
    this.objectTypeForm = this.getEmptyForm();
  }

  getEmptyForm(): FormGroup {
    return new FormGroup({
      objectTypeId: new FormControl(this.objectType.objectTypeId),
      objectTypeName: new FormControl(this.objectType.objectTypeName, [Validators.required]),
      description: new FormControl(this.objectType.description, [Validators.required]),
      level: new FormControl(this.objectType.level, [Validators.required, Validators.pattern("^[1-5]")])
    });
  }

  get objectTypeId() { return this.objectTypeForm.get('objectTypeId') as FormControl; }
  get objectTypeName() { return this.objectTypeForm.get('objectTypeName') as FormControl; }
  get description() { return this.objectTypeForm.get('description') as FormControl; }
  get level() { return this.objectTypeForm.get('level') as FormControl; }

  ngOnInit(): void {
    this.clear();
    this.refreshObjectTypeList();
  }

  refreshObjectTypeList() {
    this.objectTypeService.getObjectTypes().subscribe({
      next: objectTypes => {
        this.objectTypes = objectTypes;
      },
      error: (err: HttpErrorResponse) => { this.handleError(err); },
    });
  }

  clear() {
    this.objectType = {};
    this.objectTypeForm.reset();
    this.isEditMode = false;
    this.errorMessage = '';
  }

  addObjectType() {
    this.objectTypeService.insertObjectType(this.objectType).subscribe({
      error: (err: HttpErrorResponse) => { this.handleError(err); },
      complete: () => {
        this.clear();
        this.refreshObjectTypeList();
      }
    });
  }

  edit(objectTypeId: any) {
    this.objectTypeService.getObjectType(objectTypeId).subscribe({
      next: objectType => {
        if (objectType != undefined) {
          this.objectType = objectType;
          this.isEditMode = true;
        }
      },
      error: (err: HttpErrorResponse) => { this.handleError(err); }
    });
  }

  delete(objectTypeId: any) {
    if (!confirm("Are you sure to delete this Object Type?"))
      return;

    this.objectTypeService.deleteObjectType(objectTypeId).subscribe({
      error: (err: HttpErrorResponse) => { this.handleError(err); },
      complete: () => {
        this.clear();
        this.refreshObjectTypeList();
      }
    });
  }

  saveObjectType() {
    this.objectTypeService.updateObjectType(this.objectType).subscribe({
      error: (err: HttpErrorResponse) => { this.handleError(err); },
      complete: () => {
        this.refreshObjectTypeList();
      }
    });
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      this.errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      this.errorMessage = JSON.stringify(err.error) + ' ' + err.message;
    }
    console.error(this.errorMessage);
  }
}
