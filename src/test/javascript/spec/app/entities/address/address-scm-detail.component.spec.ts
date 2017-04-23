import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { ScmTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AddressScmDetailComponent } from '../../../../../../main/webapp/app/entities/address/address-scm-detail.component';
import { AddressScmService } from '../../../../../../main/webapp/app/entities/address/address-scm.service';
import { AddressScm } from '../../../../../../main/webapp/app/entities/address/address-scm.model';

describe('Component Tests', () => {

    describe('AddressScm Management Detail Component', () => {
        let comp: AddressScmDetailComponent;
        let fixture: ComponentFixture<AddressScmDetailComponent>;
        let service: AddressScmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ScmTestModule],
                declarations: [AddressScmDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AddressScmService,
                    EventManager
                ]
            }).overrideComponent(AddressScmDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressScmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressScmService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AddressScm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.address).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
