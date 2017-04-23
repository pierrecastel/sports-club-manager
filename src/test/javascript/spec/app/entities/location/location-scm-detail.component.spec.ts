import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { ScmTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LocationScmDetailComponent } from '../../../../../../main/webapp/app/entities/location/location-scm-detail.component';
import { LocationScmService } from '../../../../../../main/webapp/app/entities/location/location-scm.service';
import { LocationScm } from '../../../../../../main/webapp/app/entities/location/location-scm.model';

describe('Component Tests', () => {

    describe('LocationScm Management Detail Component', () => {
        let comp: LocationScmDetailComponent;
        let fixture: ComponentFixture<LocationScmDetailComponent>;
        let service: LocationScmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ScmTestModule],
                declarations: [LocationScmDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LocationScmService,
                    EventManager
                ]
            }).overrideComponent(LocationScmDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocationScmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationScmService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LocationScm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.location).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
