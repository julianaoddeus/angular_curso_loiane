import { Injectable } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModelComponent } from './alert-model/alert-model.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {


  constructor(private modalService: BsModalService) { }

  showAlert(message: string, type: string){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModelComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }
  showAlertDanger(message: string) {
    this.showAlert(message, 'danger')
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, 'success')
  }
}
