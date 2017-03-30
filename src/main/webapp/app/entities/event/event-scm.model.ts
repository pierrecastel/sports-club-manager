
const enum EventType {
    'TRAINING',
    'MATCH',
    'TOURNAMENT',
    'CODIR',
    'OTHER'

};

const enum EventState {
    'INIT',
    'OPEN',
    'CLOSED',
    'ENDED',
    'CANCELED'

};
export class EventScm {
    constructor(
        public id?: number,
        public title?: string,
        public type?: EventType,
        public date?: any,
        public state?: EventState,
        public numberOfPlaces?: number,
        public isHome?: boolean,
        public comment?: string,
        public teamId?: number,
        public locationId?: number,
        public participantId?: number,
    ) { }
}
