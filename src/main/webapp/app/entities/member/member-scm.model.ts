export class MemberScm {
    constructor(
        public id?: number,
        public phoneNumber?: string,
        public mobilePhoneNumber?: string,
        public photo?: any,
        public birthDate?: any,
        public job?: string,
        public showInfo?: boolean,
        public addressId?: number,
    ) {
        this.showInfo = false;
    }
}
