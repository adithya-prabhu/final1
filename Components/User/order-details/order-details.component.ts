import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cart-item';
import { OrderDetails } from 'src/app/order-details';
import { OrderItem } from 'src/app/order-item';
import { CartService } from 'src/app/Services/cart.service';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails: OrderDetails = new OrderDetails();
  cartItems: CartItem[] = [];
  orderItem: OrderItem[] = [];
  paidAmount: number = 0;
  username!: string;
  user: any;
  email: any;
  message: string = '';
  termsAccepted: boolean = false;
  cardDetails = {
    name: '',
    cardNumber: '',
    cvv: ''
  };

  nameError: string | null = '';
  cardNumberError: string | null = '';
  cvvError: string | null = '';


  constructor(private cartService: CartService, private loginService: LoginService, private userService: UserService) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.cartItems = this.cartService.cartItems;
    for (let cartItems of this.cartItems) {
      let items: OrderItem = new OrderItem();
      items.pid = cartItems.pid;
      items.quantity = cartItems.quantity;
      this.orderItem.push(items);
    }
    this.cartService.totalPrice.subscribe(data => this.paidAmount = data);
    this.username = this.loginService.getUserDetails().username;
    this.cartService.calculateTotalPrice();
    this.orderDetails.username = this.username;
    this.orderDetails.paidAmount = this.paidAmount;
    this.orderDetails.paymentMode = "CARD-PAYMENT";
    this.orderDetails.cartItem = this.orderItem;

    this.message = `-----------Order Confirmation------------- \n Hi, ${this.user.firstName} ${this.user.lastName}. Thank you for your order through our services.\n
                    We hope you have pleasant experience while ordering. Here are your order details for confirmation.\n
                    Products Ordered:
                    ${this.orderDetails.cartItem}

                    Amount Paid:
                    ${this.orderDetails.paidAmount}

                    Payment Mode:
                    ${this.orderDetails.paymentMode}

                    You can expect our order within 24 hours.
                    Thank you.
                    `
  }

  onSubmit() {

    this.clearErrors();

    // Validate Name
    if (!this.validateName(this.cardDetails.name)) {
      this.nameError = 'Please enter a valid name (5-50 alphabetic characters).';
    }

    // Validate Card Number
    if (!this.validateCardNumber(this.cardDetails.cardNumber)) {
      this.cardNumberError = 'Please enter a valid card number (16 digits).';
    }

    // Validate CVV
    if (!this.validateCVV(this.cardDetails.cvv)) {
      this.cvvError = 'Please enter a valid CVV (3 digits).';
    }

    // Check if there are any errors before proceeding
    if (!this.nameError && !this.cardNumberError && !this.cvvError) {
      console.log('Form Submitted!', this.cardDetails);
      // Add your payment logic here
    }

    this.userService.createOrder(this.orderDetails).subscribe({
      next: (data) => {
        window.location.href = "/order-confirmation/invoice/" + data.oid;
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  validateName(name: string): boolean {
    const regex = /^[A-Za-z]{5,50}$/;
    return regex.test(name);
  }

  validateCardNumber(cardNumber: string): boolean {
    const regex = /^\d{16}$/;
    return regex.test(cardNumber);
  }

  validateCVV(cvv: string): boolean {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  }

  clearErrors() {
    this.nameError = null;
    this.cardNumberError = null;
    this.cvvError = null;
  }

}
