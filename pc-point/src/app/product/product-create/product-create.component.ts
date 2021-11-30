import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {
  fileExtensionValidator,
  productTypeValidator,
  dimensionValidator
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
  imageFileFormControl = new FormControl(null, [Validators.required, dimensionValidator,
    fileExtensionValidator('jpg,jpeg,png')]);

  matcher = new MyErrorStateMatcher();

  form: FormGroup;
  pictureUrl: string;
  currentUser: any;
  author: string;
  invalidHeight: boolean;
  invalidWidth: boolean;

  constructor(private productService: ProductService, private router: Router,
              private fb: FormBuilder, private cloudinary: CloudinaryService,
              private tokenStorage: TokenStorageService, private location: Location) {
    this.form = this.fb.group({
      nameFormControl: this.nameFormControl,
      descriptionFormControl: this.descriptionFormControl,
      imageUrlFormControl: this.imageUrlFormControl,
      quantityFormControl: this.quantityFormControl,
      priceFormControl: this.priceFormControl,
      typeFormControl: this.typeFormControl,
      imageFileFormControl: this.imageFileFormControl
    });
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.author = this.currentUser.username;
  }

  async createOnSubmit(formData: any): Promise<any> {
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
      if (fileInput.target.files[0]) {
        const file = fileInput.target.files[0];
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = async (rs) => {
            const width = rs.currentTarget['width'];
            const height = rs.currentTarget['height'];
            this.invalidHeight = height > 550 || height < 400;
            this.invalidWidth = width > 550 || width < 400;
            if (!this.invalidHeight && !this.invalidWidth) {
              this.pictureUrl = await this.cloudinary.uploadImage(fileInput.target.files[0]);
            }
          };
        };
      }
    }
  }

  back() {
    this.location.back();
  }


}
