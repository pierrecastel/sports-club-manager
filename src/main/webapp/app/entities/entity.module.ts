import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ScmAddressScmModule } from './address/address-scm.module';
import { ScmEventScmModule } from './event/event-scm.module';
import { ScmMemberScmModule } from './member/member-scm.module';
import { ScmTeamScmModule } from './team/team-scm.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ScmAddressScmModule,
        ScmEventScmModule,
        ScmMemberScmModule,
        ScmTeamScmModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScmEntityModule {}
