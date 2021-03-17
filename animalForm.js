import { LightningElement, wire, api, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import name from '@salesforce/schema/Animal__c.Name';
import says from '@salesforce/schema/Animal__c.Says__c';
import eats from '@salesforce/schema/Animal__c.Eats__c';
import extId from '@salesforce/schema/Animal__c.extId__c';
import createAnimals from '@salesforce/apex/AnimalComponent.createAnimals';

const COLUMNS = [
    { label: 'Name', fieldName: name.fieldApiName},
    { label: 'Eats', fieldName: eats.fieldApiName, type: 'text' },
    { label: 'Says', fieldName: says.fieldApiName, type: 'text' },
    { label: 'ExtId', fieldName: extId.fieldApiName, type: 'text' }
];


export default class AnimalTable extends LightningElement {
    @api animals; 
    columns = COLUMNS;

    createAnimal(event) {
        let row = this.template.querySelector('lightning-datatable').getSelectedRows();

        let animals = {
            data: []
        };
        
        if (row.length > 0) {
            for(let i in row) {    
                let anim = row[i];   
                animals.data.push({ 
                    "Name" : anim.Name,
                    "Eats" : anim.Eats__c,
                    "Says" : anim.Says__c,
                    "ExtlId" : anim.extId__c
                });
            } 
    
            this.createAnimals({
                 input: JSON.stringify(animalsArray)
            })
                .then(res => {
                    const evt = new ShowToastEvent({
                        title: "Sucsess!",
                        message:  res,
                        variant: 'success'
                    });
                    this.dispatchEvent(evt);
                })
                .catch(error => {
                    const evt = new ShowToastEvent({
                        title: "Error!",
                        message: 'Cant save animals to database!',
                        variant: 'error'
                    });
                    this.dispatchEvent(evt);
                }); 
        
            }        
        }
    }
