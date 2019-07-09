import { CartService } from './service/cart.service';
import { CategoriesService } from './service/categories.service';
import { AdminAuthGuardService as AdminAuthGuard } from './service/admin-auth-guard.service';
import { UserService } from './service/user.service';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './service/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from "angular-6-datatable";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrdersService } from './service/orders.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FilterPipe } from './filter.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import * as firebase from 'firebase';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailsComponent,
    FilterPipe,
    LoadingSpinnerComponent,
    ProfileComponent,
    ProductDetailsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    MatIconModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    DataTableModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products/:category', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }, {
        path: 'orders-details/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2300,
      preventDuplicates: true,
      closeButton: true,
      maxOpened: 2,
      positionClass: 'toast-bottom-right'
    }),

  ],
  providers:
    [
      AuthService,
      UserService,
      OrdersService,
      CategoriesService,
      ProductService,
      CartService,
      AuthGuard,
      AdminAuthGuard,
      AngularFireStorage,
      { provide: FirestoreSettingsToken, useValue: {} }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
