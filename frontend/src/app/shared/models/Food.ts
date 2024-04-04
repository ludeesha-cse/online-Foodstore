export class Food {
  id!: string; //! for required field
  name!: string;
  price!: number;
  tags?: string[]; // optional field - ?
  favorite!: boolean;
  stars!: number;
  imageUrl!: string;
  origins!: string[];
  cookTime!: string;
}
