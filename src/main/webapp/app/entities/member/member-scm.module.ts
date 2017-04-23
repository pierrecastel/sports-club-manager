import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScmSharedModule } from '../../shared';
import {
    MemberScmService,
    MemberScmPopupService,
    MemberScmComponent,
    MemberScmDetailComponent,
    MemberScmDialogComponent,
    MemberScmPopupComponent,
    MemberScmDeletePopupComponent,
    MemberScmDeleteDialogComponent,
    memberRoute,
    memberPopupRoute,
} from './';

const ENTITY_STATES = [
    ...memberRoute,
    ...memberPopupRoute,
];

@NgModule({
    imports: [
        ScmSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MemberScmComponent,
        MemberScmDetailComponent,
        MemberScmDialogComponent,
        MemberScmDeleteDialogComponent,
        MemberScmPopupComponent,
        MemberScmDeletePopupComponent,
    ],
    entryComponents: [
        MemberScmComponent,
        MemberScmDialogComponent,
        MemberScmPopupComponent,
        MemberScmDeleteDialogComponent,
        MemberScmDeletePopupComponent,
    ],
    providers: [
        MemberScmService,
        MemberScmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScmMemberScmModule {}
