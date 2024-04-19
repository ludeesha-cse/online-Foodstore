import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {

  @Input() order!: Order;

  private readonly MARLER_ZOOM_LEVEL = 16;

  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true }) mapRef!: ElementRef;

  map!: Map;
  currentMarker!: Marker;

  constructor(private locationService: LocationService) {}

  initializeMap() {
    if (this.map) return;
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });
  }

  ngOnInit(): void {
    this.initializeMap();
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARLER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }

  // findMyLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latlng: LatLngExpression = [
  //           position.coords.latitude,
  //           position.coords.longitude
  //         ];
  //         this.map.setView(latlng, this.MARLER_ZOOM_LEVEL);
  //         this.setMarker(latlng);
  //       },
  //       (error) => {
  //         switch(error.code) {
  //           case error.PERMISSION_DENIED:
  //             console.error('User denied the request for Geolocation.');
  //             // Handle denied permission case
  //             break;
  //           case error.POSITION_UNAVAILABLE:
  //             console.error('Location information is unavailable.');
  //             // Handle unavailable location case
  //             break;
  //           case error.TIMEOUT:
  //             console.error('The request to get user location timed out.');
  //             // Handle timeout case
  //             break;
  //         }
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //     // Handle unsupported browser case
  //   }
  // }
 
  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;  // set addressLatLng
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    this.currentMarker.on('dragend', ()=>{
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng) {
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    
  }
}
