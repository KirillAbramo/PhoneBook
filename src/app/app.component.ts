import { Component, TemplateRef } from '@angular/core';
import { IContact } from './contact.interface';
import { Contact } from './contact.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'PhoneBook';
  searchName: string;

  order: string = 'info.name';
  reverse: boolean = false;
  sortedContacts: any[];

  contactID: number;
  contactName: string;
  contactLastName: string;
  contactPhone: string;
  contacts: Array<IContact> = [];
  editStatus: boolean;
  editIndex: number;

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private orderPipe: OrderPipe) {
    this.sortedContacts = orderPipe.transform(this.contacts, 'info.name');
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addContact() {
    const newC: IContact = new Contact(1, this.contactName, this.contactLastName, this.contactPhone);
    if (this.contacts.length > 0) {
      newC.id = this.contacts.slice(-1)[0].id + 1;
    }
    this.contacts.push(newC);
    this.contactName = '';
    this.contactLastName = '';
    this.contactPhone = '';
    this.editStatus = false;
    this.modalRef.hide()

  }
  delete(contact: IContact) {
    this.contactID = contact.id;
    const index = this.contacts.findIndex(c => c.id === this.contactID);
    this.contacts.splice(index, 1);

  }
  edit(template: TemplateRef<any>, contact: IContact) {
    this.editStatus = true;
    this.contactName = contact.contactName;
    this.contactLastName = contact.contactLastName;
    this.contactPhone = contact.contactPhone;
    this.contactID = contact.id;
    this.modalRef = this.modalService.show(template);
  }

  saveEditContact() {
    const editC: IContact = new Contact(this.contactID, this.contactName, this.contactLastName, this.contactPhone);
    const index = this.contacts.findIndex(c => c.id === this.contactID);
    this.contacts.splice(index, 1, editC);
    this.contactName = '';
    this.contactLastName = '';
    this.contactPhone = '';
    this.modalRef.hide();
    this.editStatus = false;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}



