import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService , DataUtils } from 'ng-jhipster';

import { MemberScm } from './member-scm.model';
import { MemberScmService } from './member-scm.service';

@Component({
    selector: 'jhi-member-scm-detail',
    templateUrl: './member-scm-detail.component.html'
})
export class MemberScmDetailComponent implements OnInit, OnDestroy {

    member: MemberScm;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private memberService: MemberScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['member']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMembers();
    }

    load(id) {
        this.memberService.find(id).subscribe((member) => {
            this.member = member;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMembers() {
        this.eventSubscriber = this.eventManager.subscribe('memberListModification', (response) => this.load(this.member.id));
    }
}
