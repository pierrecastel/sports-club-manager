import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScmSharedModule } from '../../shared';
import { ScmAdminModule } from '../../admin/admin.module';
import {
    EventScmService,
    EventScmPopupService,
    EventScmComponent,
    EventScmDetailComponent,
    EventScmDialogComponent,
    EventScmPopupComponent,
    EventScmDeletePopupComponent,
    EventScmDeleteDialogComponent,
    eventRoute,
    eventPopupRoute,
    EventScmResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eventRoute,
    ...eventPopupRoute,
];

@NgModule({
    imports: [
        ScmSharedModule,
        ScmAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EventScmComponent,
        EventScmDetailComponent,
        EventScmDialogComponent,
        EventScmDeleteDialogComponent,
        EventScmPopupComponent,
        EventScmDeletePopupComponent,
    ],
    entryComponents: [
        EventScmComponent,
        EventScmDialogComponent,
        EventScmPopupComponent,
        EventScmDeleteDialogComponent,
        EventScmDeletePopupComponent,
    ],
    providers: [
        EventScmService,
        EventScmPopupService,
        EventScmResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScmEventScmModule {}
