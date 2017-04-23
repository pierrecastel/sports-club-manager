import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScmSharedModule } from '../../shared';
import { ScmAdminModule } from '../../admin/admin.module';
import {
    TeamScmService,
    TeamScmPopupService,
    TeamScmComponent,
    TeamScmDetailComponent,
    TeamScmDialogComponent,
    TeamScmPopupComponent,
    TeamScmDeletePopupComponent,
    TeamScmDeleteDialogComponent,
    teamRoute,
    teamPopupRoute,
} from './';

const ENTITY_STATES = [
    ...teamRoute,
    ...teamPopupRoute,
];

@NgModule({
    imports: [
        ScmSharedModule,
        ScmAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TeamScmComponent,
        TeamScmDetailComponent,
        TeamScmDialogComponent,
        TeamScmDeleteDialogComponent,
        TeamScmPopupComponent,
        TeamScmDeletePopupComponent,
    ],
    entryComponents: [
        TeamScmComponent,
        TeamScmDialogComponent,
        TeamScmPopupComponent,
        TeamScmDeleteDialogComponent,
        TeamScmDeletePopupComponent,
    ],
    providers: [
        TeamScmService,
        TeamScmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScmTeamScmModule {}
