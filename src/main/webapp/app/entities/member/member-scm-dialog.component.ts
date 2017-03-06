import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { MemberScm } from './member-scm.model';
import { MemberScmPopupService } from './member-scm-popup.service';
import { MemberScmService } from './member-scm.service';
@Component({
    selector: 'jhi-member-scm-dialog',
    templateUrl: './member-scm-dialog.component.html'
})
export class MemberScmDialogComponent implements OnInit {

    member: MemberScm;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private memberService: MemberScmService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['member']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData($event, member, field, isImage) {
        if ($event.target.files && $event.target.files[0]) {
            let $file = $event.target.files[0];
            if (isImage && !/^image\//.test($file.type)) {
                return;
            }
            this.dataUtils.toBase64($file, (base64Data) => {
                member[field] = base64Data;
                member[`${field}ContentType`] = $file.type;
            });
        }
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.member.id !== undefined) {
            this.memberService.update(this.member)
                .subscribe((res: MemberScm) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.memberService.create(this.member)
                .subscribe((res: MemberScm) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MemberScm) {
        this.eventManager.broadcast({ name: 'memberListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-member-scm-popup',
    template: ''
})
export class MemberScmPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private memberPopupService: MemberScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
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