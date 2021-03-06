import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

import { MemberScm } from './member-scm.model';
import { MemberScmPopupService } from './member-scm-popup.service';
import { MemberScmService } from './member-scm.service';
import { User, UserService } from '../../shared';
import { AddressScm, AddressScmService } from '../address';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-member-scm-dialog',
    templateUrl: './member-scm-dialog.component.html'
})
export class MemberScmDialogComponent implements OnInit {

    member: MemberScm;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    addresses: AddressScm[];
    birthDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private memberService: MemberScmService,
        private userService: UserService,
        private addressService: AddressScmService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.addressService
            .query({filter: 'member-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.member.addressId) {
                    this.addresses = res.json;
                } else {
                    this.addressService
                        .find(this.member.addressId)
                        .subscribe((subRes: AddressScm) => {
                            this.addresses = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, member, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                member[field] = base64Data;
                member[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.member.id !== undefined) {
            this.subscribeToSaveResponse(
                this.memberService.update(this.member));
        } else {
            this.subscribeToSaveResponse(
                this.memberService.create(this.member));
        }
    }

    private subscribeToSaveResponse(result: Observable<MemberScm>) {
        result.subscribe((res: MemberScm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: MemberScm) {
        this.eventManager.broadcast({ name: 'memberListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackAddressById(index: number, item: AddressScm) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-member-scm-popup',
    template: ''
})
export class MemberScmPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private memberPopupService: MemberScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.memberPopupService
                    .open(MemberScmDialogComponent, params['id']);
            } else {
                this.modalRef = this.memberPopupService
                    .open(MemberScmDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
