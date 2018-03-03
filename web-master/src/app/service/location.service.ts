 import { Injectable } from '@angular/core';
 import { CanActivate } from '@angular/router';

 @Injectable()
 export class LocationService {
  cords;
  constructor() {}

  getCoordinates(): any {
    if (this.cords) {
      return Promise.resolve(this.cords);
    }
    if(navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((res: any) => {
          this.cords = {
            lat: res.coords.latitude,
            lon: res.coords.longitude,
          };
          resolve({
            lat: res.coords.latitude,
            lon: res.coords.longitude,
          });
        }, (err: any) => {
          reject(err);
        });
      });
    }
  }
}
