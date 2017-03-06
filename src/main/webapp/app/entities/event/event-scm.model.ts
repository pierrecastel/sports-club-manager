
const enum EventType {
    'TRAINING',
    'MATCH',
    'TOURNAMENT',
    'CODIR',
    'OTHER'

};
export class EventScm {
    constructor(
        public id?: number,
        public title?: string,
        public type?: EventType,
        public date?: any,
        public comment?: string,
        public teamId?: number,
        public participantId?: number,
    ) { }
}
