import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { AddressScm } from './address-scm.model';
import { AddressScmService } from './address-scm.service';

@Component({
    selector: 'jhi-address-scm-detail',
    templateUrl: './address-scm-detail.component.html'
})
export class AddressScmDetailComponent implements OnInit, OnDestroy {

    address: AddressScm;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private addressService: AddressScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['address']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddresses();
    }

    load(id) {
        this.addressService.find(id).subscribe((address) => {
            this.address = address;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddresses() {
        this.eventSubscriber = this.eventManager.subscribe('addressListModification', (response) => this.load(this.address.id));
    }
}
