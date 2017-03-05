/**
 * Created by novliza86 on 3.9.2016.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {parentRouting} from "./parent.routes";
import {ParentPage} from "./paren-page.component";
import {ControlPanelComponent} from "../control-panel/control-panel.component";
import {ParentService} from "./parent.service";
@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    parentRouting
  ],
  bootstrap: [ParentPage],
  providers:[ParentService]
})
export class ParentsModule { }
