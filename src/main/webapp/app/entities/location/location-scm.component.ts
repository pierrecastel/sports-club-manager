import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { LocationScm } from './location-scm.model';
import { LocationScmService } from './location-scm.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-location-scm',
    templateUrl: './location-scm.component.html'
})
export class LocationScmComponent implements OnInit, OnDestroy {
locations: LocationScm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private locationService: LocationScmService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.locationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.locations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LocationScm) {
        return item.id;
    }
    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
