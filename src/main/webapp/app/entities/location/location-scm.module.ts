import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScmSharedModule } from '../../shared';
import {
    LocationScmService,
    LocationScmPopupService,
    LocationScmComponent,
    LocationScmDetailComponent,
    LocationScmDialogComponent,
    LocationScmPopupComponent,
    LocationScmDeletePopupComponent,
    LocationScmDeleteDialogComponent,
    locationRoute,
    locationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute,
];

@NgModule({
    imports: [
        ScmSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LocationScmComponent,
        LocationScmDetailComponent,
        LocationScmDialogComponent,
        LocationScmDeleteDialogComponent,
        LocationScmPopupComponent,
        LocationScmDeletePopupComponent,
    ],
    entryComponents: [
        LocationScmComponent,
        LocationScmDialogComponent,
        LocationScmPopupComponent,
        LocationScmDeleteDialogComponent,
        LocationScmDeletePopupComponent,
    ],
    providers: [
        LocationScmService,
        LocationScmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScmLocationScmModule {}
