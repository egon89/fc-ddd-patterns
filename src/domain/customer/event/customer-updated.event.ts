import EventInterface from "../../@shared/event/event.interface";

export interface UpdatedEventDto {
    id: string;
    name: string;
    address: object;
}

export default class CustomerUpdatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: UpdatedEventDto;
    
    constructor(eventData: UpdatedEventDto) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}