import {Component, OnInit, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {UserBase} from "../shared/user.interface";
import {Router} from "@angular/router";
import {DataService} from "../shared/data.service";
import {PatientBase, ActivitiesProgram, patientActivity, ParentContact} from "../shared/patien.interface";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {HttpService} from "../shared/http.service";


@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  providers: [DataService],
  encapsulation: ViewEncapsulation.None
})
export class ControlPanelComponent implements OnChanges {
  @Input() data:UserBase;
  program:ActivitiesProgram;
  closeResult: string;
  currentContact:ParentContact;
  currentFeedback:any;
  currentFamily:any;
  dontResponse:boolean =false;
  constructor( private router:Router, private dataService:DataService, private modalService: NgbModal, private httpService:HttpService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.data) {
      console.log('data: ', this.data);
    }
  }
  onParentSelect(parent) {
    this.dataService.setPatient(parent);
    this.router.navigate(['/parent', parent.patientID]);
  }
  addFamily() {
    let parent = new PatientBase;
    this.dataService.setPatient(parent);
    this.router.navigate(['/parent', 'new']);
  }

  // navigate to program page
  changeProgram(parent) {
    this.dataService.setPatient(parent);
    console.log('change program: ', parent);
    this.router.navigate(['parent/program-page/', parent.patientID]);
  }

  //show patient  contact info
  openModal(content, patient:PatientBase) {
    this.currentContact = patient.contact;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //show patient  contact info
  deleteModalfun(deleteModal, patient:PatientBase) {
    this.currentFamily = patient;
    this.modalService.open(deleteModal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  //show patient feedback
  openFeedback(response, patient:PatientBase) {
    this.currentFamily = patient;
     if(this.currentFamily.program[0].patientActivityList.filter(activity => activity.activityRestponce).length === 0){
      this.dontResponse = true;
     }else {
       this.dontResponse =false;
     }
    this.modalService.open(response).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteFamily() {
    this.httpService.deleteFamily(this.currentFamily.patientID).subscribe(
      res => {
        let pIndex = this.data.patients.findIndex(dataPatient => dataPatient.patientID === this.currentFamily.patientID);
        this.data.patients.splice(pIndex, 1);
        this.currentFamily = null;
      }
    )
  }

}
