import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MemberScmDetailComponent } from '../../../../../../main/webapp/app/entities/member/member-scm-detail.component';
import { MemberScmService } from '../../../../../../main/webapp/app/entities/member/member-scm.service';
import { MemberScm } from '../../../../../../main/webapp/app/entities/member/member-scm.model';

describe('Component Tests', () => {

    describe('MemberScm Management Detail Component', () => {
        let comp: MemberScmDetailComponent;
        let fixture: ComponentFixture<MemberScmDetailComponent>;
        let service: MemberScmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MemberScmDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    MemberScmService
                ]
            }).overrideComponent(MemberScmDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MemberScmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberScmService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MemberScm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.member).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
