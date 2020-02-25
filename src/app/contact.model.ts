import { IContact } from "./contact.interface";

export class Contact implements IContact {
    constructor(
       public id: number,
       public contactName: string,
       public contactLastName: string,
       public contactPhone: string, 
    ){}
}