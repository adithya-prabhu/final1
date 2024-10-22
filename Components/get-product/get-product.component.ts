// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CartItem } from 'src/app/cart-item';
// import { Product } from 'src/app/product';
// import { CartService } from 'src/app/Services/cart.service';
// import { LoginService } from 'src/app/Services/login.service';
// import { UserService } from 'src/app/Services/user.service';

// @Component({
//   selector: 'app-get-product',
//   templateUrl: './get-product.component.html',
//   styleUrls: ['./get-product.component.css']
// })
// export class GetProductComponent implements OnInit {
//   category!: string;
//   product!: Product[];
//   name!: string;
//   page: number = 1;
//   count: number = 0;
//   tableSize: number = 7;

//   totalPrice: number = 0;
//   totalQuantity: number = 0;
//   isUser: boolean = false;

//   isAvail: boolean = false;
//   quantity: number = 1;
//   isButtonDisabled: { [productId: number]: boolean } = {};
//   constructor(private route: ActivatedRoute, private userService: UserService, private cartService: CartService, private loginService: LoginService , private router: Router) {

//   }
//   ngOnInit(): void {
//     this.category = this.route.snapshot.params['category'];
//     this.showMedicineByCategory();
//     this.updateCartStatus();
//     if(this.loginService.getUserRole() === 'USER'){
//       this.isUser = true;
//     }
//   }

//   onTableDataChange(event: any) {
//     this.page = event;
//   }



//   showMedicineByCategory() {
//     if (this.category == 'All-Medicines') {
//       this.userService.getAllMedicine().subscribe({
//         next: (data) => {
//           this.product = data;
//           console.log(this.product);
//           this.product.forEach((p) => {
//             p.img = 'data:image/jpeg;base64,' + p.productImage.imageData;
//           })
//         }, error: (error) => {
//           console.log(error);
//           alert('No Medicines Found');
//         }
//       })

//     } else {
//       this.userService.getMedicineByCategory(this.category).subscribe({
//         next: (data) => {
//           this.product = data;
//           this.product.forEach((p) => {
//             p.img = 'data:image/jpeg;base64,' + p.productImage.imageData;
//           })
//         }, error: (error) => {
//           console.log(error);
//           alert('No Medicines Found');
//         }
//       })

//     }
//   }

//   onSearch(name: string) {
//     if (name != undefined) {
//       console.log('navigating to search url');
//       let url = "/user/search/product/" + name;
//       this.router.navigateByUrl(url);
//     } else {
//       console.log('please enter a name');
//     }
//   }

//   sortByPriceLowToHigh() {
//     this.product.sort((a, b) => a.price - b.price);
//   }
//   sortByPriceHighToLow() {
//     this.product.sort((a, b) => b.price - a.price);
//   }
//   sortByNameAscending() {
//     this.product.sort((a, b) => a.name.localeCompare(b.name));
//   }
//   sortByNameDescending() {
//     this.product.sort((a, b) => b.name.localeCompare(a.name));
//   }

//   addToCart(product: Product) {
//     const cartItem = new CartItem(product);
    
//     // Initialize the disabled state for this product if not already done
//     if (this.isButtonDisabled[product.pid] === undefined) {
//         this.isButtonDisabled[product.pid] = false;
//     }

//     // Check if adding the item exceeds available quantity
//     if (this.quantity + 1 > product.totalAvailable) {
//         this.isButtonDisabled[product.pid] = true; // Disable only this product's button
//         return;
//     }

//     this.quantity = this.cartService.addToCart(cartItem);
//     console.log(this.quantity);

//     // Re-enable the button if needed
//     this.isButtonDisabled[product.pid] = false; // Adjust as needed
//   }

//   updateCartStatus() {
//     this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
//     this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/cart-item';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/Services/cart.service';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
 
@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {
  category!: string;
  product!: Product[];
  name!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
 
  totalPrice: number = 0;
  totalQuantity: number = 0;
  isUser: boolean = false;
 
  isAvail: boolean = false;
  quantity: number = 1;
  isButtonDisabled: { [productId: number]: boolean } = {};
  constructor(private route: ActivatedRoute, private userService: UserService, private cartService: CartService, private loginService: LoginService , private router: Router) {
 
  }
  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    this.showMedicineByCategory();
    this.updateCartStatus();
    if(this.loginService.getUserRole() === 'USER'){
      this.isUser = true;
    }
  }
 
  onTableDataChange(event: any) {
    this.page = event;
  }
 
 
 
  showMedicineByCategory() {
    if (this.category == 'All-Medicines') {
      this.userService.getAllMedicine().subscribe({
        next: (data) => {
          this.product = data;
          console.log(this.product);
          this.product.forEach((p) => {
            p.img = 'data:image/jpeg;base64,' + p.productImage.imageData;
          })
        }, error: (error) => {
          console.log(error);
          alert('No Medicines Found');
        }
      })
 
    } else {
      this.userService.getMedicineByCategory(this.category).subscribe({
        next: (data) => {
          this.product = data;
          this.product.forEach((p) => {
            p.img = 'data:image/jpeg;base64,' + p.productImage.imageData;
          })
        }, error: (error) => {
          console.log(error);
          alert('No Medicines Found');
        }
      })
 
    }
  }
 
  onSearch(name: string) {
    if (name != undefined) {
      console.log('navigating to search url');
      let url = "/user/search/product/" + name;
      this.router.navigateByUrl(url);
    } else {
      console.log('please enter a name');
    }
  }
 
  sortByPriceLowToHigh() {
    this.product.sort((a, b) => a.price - b.price);
  }
  sortByPriceHighToLow() {
    this.product.sort((a, b) => b.price - a.price);
  }
  sortByNameAscending() {
    this.product.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByNameDescending() {
    this.product.sort((a, b) => b.name.localeCompare(a.name));
  }
 
  addToCart(product: Product) {
    const cartItem = new CartItem(product);
   
    // Initialize the disabled state for this product if not already done
    if (this.isButtonDisabled[product.pid] === undefined) {
        this.isButtonDisabled[product.pid] = false;
    }
    
    console.log("Product available -------------", product.totalAvailable);
    // Check if adding the item exceeds available quantity
    if (this.quantity  >= product.totalAvailable) {
        this.isButtonDisabled[product.pid] = true; // Disable only this product's button

        this.cartService.addToCart(cartItem);

        return;
    }
 
    this.quantity = this.cartService.addToCart(cartItem);
    console.log(this.quantity);
 
    // Re-enable the button if needed
    this.isButtonDisabled[product.pid] = false; // Adjust as needed
  }
 
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }

  increamentQuantity(product: Product) {
    const cartItem = new CartItem(product);

      // Initialize the disabled state for this product if not already done
      if (this.isButtonDisabled[product.pid] === undefined) {
        this.isButtonDisabled[product.pid] = false;
     }
    
      console.log("Product available -------------", product.totalAvailable);
      // Check if adding the item exceeds available quantity
      if (this.quantity  >= product.totalAvailable) {
          this.isButtonDisabled[product.pid] = true; // Disable only this product's button

          this.cartService.addToCart(cartItem);

          return;
      }

      this.quantity = this.cartService.addToCart(cartItem);
      console.log(this.quantity);

      // Re-enable the button if needed
      this.isButtonDisabled[product.pid] = false; // Adjust as neede
      this.cartService.addToCart(cartItem);
  }

  decrementQuantity(product: Product) {
    const cartItem = new CartItem(product);
    if(this.isButtonDisabled[product.pid]){
      this.isButtonDisabled[product.pid] = false;
    }
    this.cartService.decrementQuantity(cartItem);
  }
 
}
