import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/cart-item';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  medicineName!: string;
  name!: string;
  product!: Product[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  quantity: number = 1;
  isButtonDisabled: { [productId: number]: boolean } = {};
  constructor(private route: ActivatedRoute, private userService: UserService, private cartService: CartService, private router: Router) {
  }
  ngOnInit(): void {
    this.medicineName = this.route.snapshot.params['name'];
    console.log(this.medicineName);
    this.getProductByName();

  }

  getProductByName() {
    this.userService.getMedicineByName(this.medicineName).subscribe({
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

  onTableDataChange(event: any) {
    this.page = event;
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
    // const cartItem = new CartItem(product);
    // this.cartService.addToCart(cartItem);

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

  goBack() {
    this.router.navigate(['get/all/class/All-Medicines']);
  }

}
