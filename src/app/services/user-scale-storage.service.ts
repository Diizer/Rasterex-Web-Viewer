import { Injectable } from '@angular/core';
import { ScaleWithPageRange } from './scale-management.service';

@Injectable({ providedIn: 'root' })
export class UserScaleStorageService {
  private getKey(userId: number | string): string {
    return `user_scales_${userId}`;
  }

  getScales(userId: number | string): ScaleWithPageRange[] {
    const data = localStorage.getItem(this.getKey(userId));
    return data ? JSON.parse(data) : [];
  }

  saveScales(userId: number | string, scales: ScaleWithPageRange[]): void {
    localStorage.setItem(this.getKey(userId), JSON.stringify(scales));
  }
} 