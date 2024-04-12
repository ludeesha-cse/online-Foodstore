import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { Observable } from 'rxjs';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL+ foodId);
  }

  // getAll(): Food[] {
  //   return sample_foods;
  // }

  // getAllFoodsBySearchTerm(searchText: string) {
  //   return this.getAll().filter((food) =>
  //     food.name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // }

  // getAllTags(): Tag[] {
  //   return sample_tags;
  // }

  // getAllFoodsByTag(tag: string): Food[] {
  //   return tag === 'All'
  //     ? this.getAll()
  //     : this.getAll().filter((food) => food.tags?.includes(tag));
  // }

  // getFoodById(foodId: string): Food {
  //   return this.getAll().find(food => food.id == foodId) ?? new Food();
  // }
}
