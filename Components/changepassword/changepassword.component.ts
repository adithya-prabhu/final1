import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service'; // Update the path as needed
 
@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router, private aroute: ActivatedRoute) {}
 
  public username: string = this.aroute.snapshot.params['username'];
 
  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
 
    // Call the service to change the password
    this.authService.changePassword(this.username, this.newPassword).subscribe({
      next: (response) => {
        alert('Password changed successfully!');
        this.router.navigate(['/user/login']); // Redirect to login or wherever needed
      },
      error: (error) => {
        console.error(error);
        alert('An error occurred while changing the password. Please try again.');
      }
    });
  }
}