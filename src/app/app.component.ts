import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpService } from './http.service';
import { ToastrService } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet,
            MatInputModule, 
            MatSelectModule, 
            MatCheckboxModule, 
            MatRadioModule, 
            ReactiveFormsModule, 
            MatButtonModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatNativeDateModule
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Anjali-first-ang';
  formbuild= inject(FormBuilder);
  classes: any[] = [];
  toastrService=inject(ToastrService);
  studentForm: FormGroup= this.formbuild.group({
    name:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    age:[null, [Validators.required,Validators.pattern("^[0-9]*$")]],
    class:[null, Validators.required],
    address:['India'],
    gender:['', Validators.required],
    isActive:[true],
  })

  httpService=inject(HttpService);
  ngOnInit(){
    this.httpService.getClasses().subscribe((result:any) =>{
      this.classes = result;
      console.log(this.classes);
    })
  }

  saveForm(){
    var formValues=this.studentForm.value;
    console.log("Form Submitted!", formValues);
    this.httpService.addStudent(formValues).subscribe(()=>{
      this.toastrService.success("Success", "Student Saved");
      this.studentForm.reset();
    })
  }
}
