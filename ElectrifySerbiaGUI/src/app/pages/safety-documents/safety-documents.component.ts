import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SafetyDocument } from 'src/app/models/safety-document.model';
import { CrewsService } from 'src/app/services/crews.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SafetyDocsService } from 'src/app/services/safety-docs.service';

@Component({
  selector: 'app-safety-documents',
  templateUrl: './safety-documents.component.html',
  styleUrls: ['./safety-documents.component.scss'],
})
export class SafetyDocumentsComponent implements OnInit {
  reverse: boolean = false;
  p: number = 0;
  filter: string = 'All';
  searchStatus: string = '';
  searchType: string = '';

  constructor(
    public service: SafetyDocsService,
    private modalService: NgbModal,
    private router: Router,
    public userService: RegistrationSignupService,
    public crewService: CrewsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('user') != null
    ) {
      this.userService.userData = JSON.parse(
        localStorage.getItem('user') || '{}'
      );
    }
  }

  search(){
    if(this.filter ==='All'){
      this.service.list = this.service.searchList.filter(item => item.status.match(this.searchStatus) &&
      item.type.match(this.searchType));
    }
    else if(this.filter ==='Mine'){
      this.service.list = this.service.searchList.filter(item => item.status.match(this.searchStatus) &&
      item.type.match(this.searchType) && item.creator === this.userService.userData.email);
    }
  }
  delete(item : SafetyDocument){
    if(confirm('Are you sure to delete item')){
      this.service.deleteData(item.id).subscribe(res =>{
        this.toastr.info('Succesfully deleted','Document Info');
        this.service.getData();
      });
    }
  }
  filterChange(){
    if(this.filter === "Mine"){
      this.service.list = this.service.searchList.filter(item => item.creator === this.userService.userData.email);
    }
    else{
      this.service.list = this.service.searchList;
    }
  }
  reset(){
    if(this.filter ==='All')
      this.service.list = this.service.searchList;
    else if(this.filter ==='Mine')
      this.service.list = this.service.searchList.filter(item => item.creator === this.userService.userData.email);
    this.searchType = '';
    this.searchStatus = '';

  }
  sort(header : string){
    this.reverse = !this.reverse;
    if(header==='type'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.type > b.type ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.type < b.type ? 1 : -1);
      }
    }
    else if(header==='id'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.id > b.id ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.id < b.id ? 1 : -1);
      }
    }
    else if(header==='plan'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.switchingPlan > b.switchingPlan ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.switchingPlan < b.switchingPlan ? 1 : -1);
      }
    }
    else if(header==='status'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.status > b.status ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.status < b.status ? 1 : -1);
      }
    }
    else if(header==='creator'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.creator > b.creator ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.creator < b.creator ? 1 : -1);
      }
    }
    else if(header==='crew'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.crew > b.crew ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.crew < b.crew ? 1 : -1);
      }
    }
    else if(header==='details'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.details > b.details ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.details < b.details ? 1 : -1);
      }
    }
    else if(header==='notes'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.notes > b.notes ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.notes < b.notes ? 1 : -1);
      }
    }
    else if(header==='phone'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.phone > b.phone ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.phone < b.phone ? 1 : -1);
      }
    }
    else if(header==='date'){
      if(this.reverse){
        this.service.list = this.service.list.sort((a,b) => a.date > b.date ? 1 : -1);
      }
      else{
        this.service.list = this.service.list.sort((a,b) => a.date < b.date ? 1 : -1);
      }
    }
  }
  open(content : any) {
    this.service.formData = new SafetyDocument();
    this.service.formData.creator = this.userService.userData.email;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {});
  }

  details(item : SafetyDocument){
    this.router.navigateByUrl(`safetydocs/${item.id}/new`);
  }
  save(){
    this.modalService.dismissAll('Save click');
    this.service.postData().subscribe(res => {
      this.service.getData();
      this.toastr.success('Succesfully added','Document Info');
      this.service.formData = new SafetyDocument();
    });
  }


}
