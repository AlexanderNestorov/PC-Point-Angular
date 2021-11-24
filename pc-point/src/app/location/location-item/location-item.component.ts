import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {LocationService} from "../../services/location/location.service";
import {Location} from "../../shared/interfaces/Location";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

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

  constructor(private tokenStorageService: TokenStorageService, private locationService: LocationService,
              private fb: FormBuilder, private modalService: NgbModal) {
    this.editForm = this.fb.group({
      city: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      address: ['', Validators.required]
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
    this.editLocation = this.location;
  }
  onUpdate($event) {
    this.editLocation.latitude = $event.coords.lat;
    this.editLocation.longitude = $event.coords.lng;
    console.log(this.editLocation);
    console.log($event);
  }

  editOnSubmit(location: Location) {
    console.log(location);
    this.locationService.updateLocation(location).subscribe(
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
