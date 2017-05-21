import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { AddressScm } from './address-scm.model';
import { AddressScmService } from './address-scm.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-address-scm',
    templateUrl: './address-scm.component.html'
})
export class AddressScmComponent implements OnInit, OnDestroy {
addresses: AddressScm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private addressService: AddressScmService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.addressService.query().subscribe(
            (res: ResponseWrapper) => {
                this.addresses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAddresses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AddressScm) {
        return item.id;
    }
    registerChangeInAddresses() {
        this.eventSubscriber = this.eventManager.subscribe('addressListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
