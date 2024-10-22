import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/user';
 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent {
  forgotCredentials = { username: '', contactnumber: '' }; // For forgot password
  isValidUser = false; // Track if user is valid for password reset
  users: User[] = [];
  username: string = '';
  constructor(private router: Router, private userservice: UserService) {
 
    userservice.allusers().subscribe((data)=>{
      this.users = data;
      console.log(this.users);
    })
 
  }
 
  onResetPassword() {
 
    this.users.forEach((user)=>{
      if(user.username === this.forgotCredentials.username && user.contactNumber === this.forgotCredentials.contactnumber){
        this.username = user.username;
        this.isValidUser = true; // Set this to true if validation is successful
      } else {
      }
    })
 
    if(this.isValidUser === false){
      alert('Invalid details. Please try again.');
    }
 
    // // Simulate user validation - replace with actual service call
    // const validUsername = 'validUser'; // Replace with actual logic
    // const validContact = '1234567890';  // Replace with actual logic
 
    // if (this.forgotCredentials.username === validUsername && this.forgotCredentials.contactnumber === validContact) {
    //   this.isValidUser = true; // Set this to true if validation is successful
    //   alert('User verified. You can now change your password.');
    //   // Optionally, navigate to change password page
    //   // this.router.navigate(['/change-password']);
    // } else {
    //   alert('Invalid details. Please try again.');
    // }
  }
 
  onChangePassword() {
    // Logic for changing the password
    this.router.navigate([`/change-password/${this.username}`])
    alert('Redirecting to change password page...'); // Replace with actual navigation
  }
}