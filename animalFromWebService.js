import { LightningElement, track, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAnimalFromStartToEndId from '@salesforce/apex/AnimalComponent.getAnimalFromWebSirvice';

export default class GetAnimal extends LightningElement {

    @track minExtId;
    @track maxExtId;
    @api receivedData;

    changeHandler(event) {
        if (event.target.name == 'minExtId') {
            this.minExtId = event.target.value;
        } else if (event.target.name == 'maxExtId') {
            this.maxExtId = event.target.value;
        }
    }

    handleClick(event) {
        if (this.minExtId > 0 && this.maxExtId > 0) {
            getAnimalFromWebSirvice({
                minExtId: this.minExtId,
                maxExtId: this.maxExtId
            })
                .then(res => {
                    this.receivedData = res;
                })
                .catch(error => {
                    const evt = new ShowToastEvent({
                        title: "Error!",
                        message: 'Cant get animals!',
                        variant: 'error'
                    });
                    this.dispatchEvent(evt);
                });
        }
    }
}
