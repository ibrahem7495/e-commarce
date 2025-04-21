import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/model/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  cartItems :Cart[];

  constructor(private fb: FormBuilder,private cartService:CartService) {
    this.cartItems=[];
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      paymentMethod: ['card', Validators.required],
    });
  }
  ngOnInit(): void {
  this.getCartItems();
  }
getCartItems(){
this.cartItems = this.cartService.items
}
  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Order submitted', this.checkoutForm.value);
      alert('Thank you for your purchase!');
      this.checkoutForm.reset();
    }
  }
}
