import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {LocationService} from "../../services/location/location.service";
import {Location} from "../../shared/interfaces/Location";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MyErrorStateMatcher} from "../../user/login/login.component";

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

  cityFormControl = new FormControl('', [Validators.required]);
  latitudeFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  longitudeFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  @Input() location?: Location | undefined;
  isAdmin: boolean;
  roles?: string[];
  editForm: FormGroup;
  city: string;
  latitude: number;
  longitude: number;
  address: string;
  closeResult: string;
  zoom: number;
  editLocation: Location;
  editLocationId: number;
  editAddress: string;
  editCity: string;
  editLatitude: number;
  editLongitude: number;

  constructor(private tokenStorageService: TokenStorageService, private locationService: LocationService,
              private fb: FormBuilder, private modalService: NgbModal) {
    this.editForm = this.fb.group({
      cityFormControl: this.cityFormControl,
      addressFormControl: this.addressFormControl,
      latitudeFormControl: this.latitudeFormControl,
      longitudeFormControl: this.longitudeFormControl
    });
  }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.isAdmin = this.roles?.includes('ROLE_ADMIN');
    this.city = this.location.city;
    this.latitude = this.location.latitude;
    this.longitude = this.location.longitude;
    this.address = this.location.address;
    this.zoom = 8;
  }

  onDelete(locationId) {
    this.locationService.deleteLocation(locationId).subscribe(
      (response: void) => {
        console.log(response);
        window.location.reload();
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'add-location-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.editLocationId = this.location.id;
    this.editAddress = this.location.address;
    this.editCity = this.location.city;
    this.editLatitude = this.location.latitude;
    this.editLongitude = this.location.longitude;

    this.editLocation = this.location;
  }
  onUpdate($event) {
    this.editLatitude = $event.coords.lat;
    this.editLongitude = $event.coords.lng;
  }

  editOnSubmit(formData: any) {

    const id = this.editLocationId;
    const city = formData.form.value.cityFormControl;
    const address = formData.form.value.addressFormControl;
    const latitude = formData.form.value.latitudeFormControl;
    const longitude = formData.form.value.longitudeFormControl;

    console.log(id,city,address,latitude,longitude);
    this.locationService.updateLocation({id,city,address,latitude,longitude}).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

}
