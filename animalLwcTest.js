import { LightningElement, track } from 'lwc';
import getAnimalByExternalId from '@salesforce/apex/AnimalComponent.getAnimalByExternalId';
export default class AnimalModel extends LightningElement {
  @track objects;
  searchAnimals(event) {
    
    var id = this.template.querySelector('lightning-input').value;
    getAnimalByExternalId({externalId : id}).then(result => {
          console.log(result);
          this.objects = result;
        })
  }
}
