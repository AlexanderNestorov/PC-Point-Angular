import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {
  emailValidator,
  fileExtensionValidator,
  productTypeValidator,
  rePasswordValidator
} from "../../shared/validators";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product/product.service";
import {Router} from "@angular/router";
import {CloudinaryService} from "../../services/cloudinary/cloudinary.service";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {Location} from '@angular/common';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {MyErrorStateMatcher} from "../../shared/MyErrorStateMatcher";



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  imageUrlFormControl = new FormControl('', [Validators.required]);
  quantityFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required, productTypeValidator]);

  matcher = new MyErrorStateMatcher();

  form: FormGroup;
  pictureUrl: string;
  currentUser: any;
  author: string;

  constructor(private productService: ProductService, private router: Router,
              private fb: FormBuilder, private cloudinary: CloudinaryService,
              private tokenStorage: TokenStorageService, private location: Location) {
    this.form = this.fb.group({
      nameFormControl: this.nameFormControl,
      descriptionFormControl: this.descriptionFormControl,
      imageUrlFormControl: this.imageUrlFormControl,
      quantityFormControl: this.quantityFormControl,
      priceFormControl: this.priceFormControl,
      typeFormControl: this.typeFormControl
    });
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.author = this.currentUser.username;
    console.log(this.form);
  }

  async createOnSubmit(formData: any): Promise<any> {
    console.log(formData.value);

    console.log(formData);
    const name = formData.form.value.nameFormControl;
    const description = formData.form.value.descriptionFormControl;
    const imageUrl = formData.form.value.imageUrlFormControl;
    const quantity = formData.form.value.quantityFormControl;
    const price = formData.form.value.priceFormControl;
    const type = formData.form.value.typeFormControl;

    this.productService.addNewProduct({
      name,
      description,
      imageUrl,
      quantity,
      price,
      type
    }).subscribe(
      response => {
        console.log(response);
        formData.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        formData.reset();
      }
    );

    this.router.navigateByUrl('/all').finally(() => window.location.reload());
  }

  async uploadMainPhotoToCloud(fileInput: any): Promise<any> {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.pictureUrl = await this.cloudinary.uploadImage(fileInput.target.files[0]);
    }
  }

  back() {
    this.location.back();
  }
}
