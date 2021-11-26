import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {ProductService} from "../../services/product/product.service";
import {CloudinaryService} from "../../services/cloudinary/cloudinary.service";
import {Router} from "@angular/router";
import {Product} from "../../shared/interfaces/Product";
import {HttpErrorResponse} from "@angular/common/http";
import {productTypeValidator} from "../../shared/validators";
import {MyErrorStateMatcher} from "../../user/login/login.component";



@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  imageUrlFormControl = new FormControl('', [Validators.required]);
  quantityFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required, productTypeValidator]);

  matcher = new MyErrorStateMatcher();

  constructor(private tokenStorage: TokenStorageService, private modalService: NgbModal,
              private productService: ProductService, private router: Router, private cloudinary: CloudinaryService,
              private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      nameFormControl: this.nameFormControl,
      descriptionFormControl: this.descriptionFormControl,
      imageUrlFormControl: this.imageUrlFormControl,
      quantityFormControl: this.quantityFormControl,
      priceFormControl: this.priceFormControl,
      typeFormControl: this.typeFormControl
    });
  }

  @Input() product: Product | undefined;
  currentUser: string;
  isAdmin: boolean;
  roles?: string[];
  closeResult = '';
  updateForm: FormGroup;
  editProduct: Product;

  editId: number;
  editName: string;
  editDescription: string;
  editImageUrl: string;
  editQuantity: number;
  editPrice: number;
  editType: string;

  types = ['SOFTWARE','HARDWARE','ACCESSORY','MISCELLANEOUS']


  ngOnInit(): void {
    const user = this.tokenStorage.getUser();
    this.roles = user.roles;

    this.isAdmin = this.roles?.includes('ROLE_ADMIN');
  }


  onDelete(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        console.log(response);
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    window.location.reload();
  }

  public onUpdateProduct(formData: any): void {

    const id = this.editId;
    const name  = formData.form.value.nameFormControl;
    const description  = formData.form.value.descriptionFormControl;
    const quantity  = formData.form.value.quantityFormControl;
    const price  = formData.form.value.priceFormControl;
    const imageUrl = formData.form.value.imageUrlFormControl;
    const type  = formData.form.value.typeFormControl;

    this.productService.updateProduct({
      id, name, description, quantity, price, imageUrl, type
    }).subscribe(
      (response: Product) => {
         window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  async uploadMainPhotoToCloud(fileInput: any): Promise<any> {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.editImageUrl = await this.cloudinary.uploadImage(fileInput.target.files[0]);
    }
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'update-car-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.editId = this.product.id;
    this.editName = this.product.name;
    this.editDescription = this.product.description;
    this.editImageUrl = this.product.imageUrl;
    this.editQuantity = this.product.quantity;
    this.editPrice = this.product.price;
    this.editType = this.product.type.type;
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.updateForm.reset(this.updateForm.value);
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.updateForm.reset(this.updateForm.value);
    } else {
      return `with: ${reason}`;
    }
  }
}
