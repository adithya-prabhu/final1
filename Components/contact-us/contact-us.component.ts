import { Component } from '@angular/core';
import emailjs from 'emailjs-com';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  name: string = '';
  email: string = '';
  message: string = '';

  constructor() {}

  ngOnInit(): void {
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // if (user) {
    //   this.email = user.username;
    // }
  }

  sendEmail(e: Event) {
    e.preventDefault();
    console.log("from email --------", this.email)
    const templateParams = {
      to_name: "Admin",
      to_email: this.email,
      message: this.message,
      name: this.name
    };

    emailjs.send('service_zomn1rs', 'template_95oweyk', templateParams, 'knSvgpVvREQW3ObMr')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Feedback sent successfully....");
        this.name = '';
        this.email = '';
        this.message = '';
      }, (err) => {
        console.error('FAILED...', err);
      });
  }

}
