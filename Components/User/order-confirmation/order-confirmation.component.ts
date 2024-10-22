import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderSummary } from 'src/app/order-summary';
import { UserService } from 'src/app/Services/user.service';
import emailjs from 'emailjs-com';
import { ProductQuantity } from 'src/app/product-quantity';
import { PdfService } from 'src/app/Services/pdf.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  oid!: number;
  orderInvoice: OrderSummary = new OrderSummary();
  user: any;
  email: any;
  message: string='';

  productquantity: any;
  paidAmount: any;
  paymentMode: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private pdfService: PdfService) { }
  ngOnInit(): void {
    this.oid = this.route.snapshot.params['oid'];
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user) {
      this.email = this.user.username;
    }
    this.getOrderConfirmation();
  }

  getOrderConfirmation() {
    this.userService.getOrderById(this.oid).subscribe({
      next: (data) => {
        this.orderInvoice = data;

        this.paymentMode = this.orderInvoice.paymentMode;
        this.paidAmount = this.orderInvoice.paidAmount;
        this.orderInvoice.products.forEach((p) => {
          p.product.img = 'data:image/jpeg;base64,' + p.product.productImage.imageData;
        })
        
        this.sendEmail();
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  sendEmail() {
    this.message = `-----------Order Confirmation------------- \n Hi, ${this.user.firstName} ${this.user.lastName}. Thank you for your order through our services.\n
                    We hope you have pleasant experience while ordering. Here are your order details for confirmation.\n

                    Amount Paid:
                    ${this.paidAmount}

                    Payment Mode:
                    ${this.paymentMode}

                    You can expect our order within 24 hours.
                    Thank you.
                    `;

    console.log(this.message);

    console.log("from email --------", this.email)
    const templateParams = {
      to_name: this.user.firstName + " " + this.user.lastName,
      to_email: this.user.username,
      message: this.message
    };

    emailjs.send('service_zomn1rs', 'template_95oweyk', templateParams, 'knSvgpVvREQW3ObMr')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });
  }

  saveAsPdf(){
    console.log(this.orderInvoice);
    this.pdfService.generatePdf(this.orderInvoice);
  }

}
