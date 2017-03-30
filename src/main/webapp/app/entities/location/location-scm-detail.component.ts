import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LocationScm } from './location-scm.model';
import { LocationScmService } from './location-scm.service';

@Component({
    selector: 'jhi-location-scm-detail',
    templateUrl: './location-scm-detail.component.html'
})
export class LocationScmDetailComponent implements OnInit, OnDestroy {

    location: LocationScm;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private locationService: LocationScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['location']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.locationService.find(id).subscribe(location => {
            this.location = location;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
