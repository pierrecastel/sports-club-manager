import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { LocationScm } from './location-scm.model';
import { LocationScmService } from './location-scm.service';

@Component({
    selector: 'jhi-location-scm-detail',
    templateUrl: './location-scm-detail.component.html'
})
export class LocationScmDetailComponent implements OnInit, OnDestroy {

    location: LocationScm;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private locationService: LocationScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['location']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLocations();
    }

    load(id) {
        this.locationService.find(id).subscribe((location) => {
            this.location = location;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', (response) => this.load(this.location.id));
    }
}
