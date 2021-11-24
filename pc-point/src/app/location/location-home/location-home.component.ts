import {AfterContentInit, Component, OnInit} from '@angular/core';
import {LocationService} from "../../services/location/location.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {Location} from "../../shared/interfaces/Location"
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-location-home',
  templateUrl: './location-home.component.html',
  styleUrls: ['./location-home.component.css']
})
export class LocationHomeComponent implements OnInit, AfterContentInit{

  latitude: number;
  longitude: number;
  selectedValue: number;
  zoom: number;
  isAdmin: boolean;
  roles?: string[];
  closeResult = '';

  markers?: Location[];
  cities?: string[];
  locations?: Location[];

  addLat: number;
  addLong: number;
  addForm: FormGroup;


  updateSelect(e){
    this.selectedValue = e.target.value;
    console.log(this.selectedValue);
    this.getLocationsByCity(e.target.value);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'add-location-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  constructor(private locationService: LocationService, private tokenStorageService: TokenStorageService,
              private modalService: NgbModal, private fb: FormBuilder, private router: Router ) {
    this.addForm = this.fb.group({
      city: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getLocations();
    this.getCities();
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.isAdmin = this.roles?.includes('ROLE_ADMIN');


  }

 ngAfterContentInit() {
    this.setCurrentLocation();
  }


  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.longitude);
        this.zoom = 8;
      });
    }
  }

  onUpdate($event) {
    this.addLat = $event.coords.lat;
    this.addLong = $event.coords.lng;
    console.log($event);
  }

  private getLocations() {
    this.locationService.getAllLocations().subscribe((response: Location[]) => {
        this.markers = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  private getCities() {
    this.locationService.getAllCities().subscribe(
      (response: string[]) => {
        this.cities = response;
      }
    );
  }

  private getLocationsByCity(city: string) {
    this.locationService.getLocationsByCity(city).subscribe(
      (response: Location[]) => {
        this.markers = response;
        this.locations = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    } else {
      return `with: ${reason}`;
    }
  }

  addOnSubmit(formData: any) {
    console.log(formData.value);
    this.locationService.addNewLocation(formData.value).subscribe(
      response => {
        this.getLocations();
        this.getCities();
        formData.reset();
        // this.router.navigateByUrl('/home').finally(() => window.location.reload());
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        formData.reset();
      }
    );

  }

}
