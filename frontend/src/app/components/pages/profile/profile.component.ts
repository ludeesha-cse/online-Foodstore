import { UserService } from 'src/app/services/user.service';
import { Component, OnChanges } from '@angular/core';
import { IUserUpdate } from 'src/app/shared/interfaces/IUserUpdate';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IUserRegister } from 'src/app/shared/interfaces/iUserReguster';
import { ActivatedRoute, Router, CanActivateFn } from '@angular/router';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  isEditting = false;
  userName: string = '';
  userEmail: string = '';
  userAddress: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [this.userService.currentUser.name, [Validators.required, Validators.minLength(5)]],
      email: [this.userService.currentUser.email,[Validators.required, Validators.email]],
      address: [this.userService.currentUser.address, [Validators.required, Validators.minLength(5)]],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';

    this.userName = this.userService.currentUser.name;
    this.userEmail = this.userService.currentUser.email;
    this.userAddress = this.userService.currentUser.address;
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;

    const user: IUserUpdate = {
      name: fv.name,
      email: fv.email,
      id: this.userService.currentUser.id,
      address: fv.address,
    };

    // this.userService.register(user).subscribe(() => {
    //  this.router.navigateByUrl(this.returnUrl);
    // });
      
    this.userService.updateUser(user).subscribe(() => {
    this.router.navigateByUrl(this.returnUrl);
    });

    console.log(user);
    this.isEditting = false;

  }

  edit(){
    this.isEditting = true;
  }

  cancel(){
    this.isEditting = false;
  }

}
