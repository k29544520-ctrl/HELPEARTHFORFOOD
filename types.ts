export enum FoodType {
  RICE = 'rice',
  SOUP = 'soup',
  VEGETABLE = 'vegetable',
  MEAT = 'meat',
  FRUIT = 'fruit',
}

export interface Food {
  id: string;
  name: string;
  type: FoodType;
  imageUrl: string;
}

export type TraySlotId = 'rice' | 'soup' | 'side1' | 'side2' | 'side3' | 'side4';

export interface TrayContents {
  rice: Food | null;
  soup: Food | null;
  side1: Food | null;
  side2: Food | null;
  side3: Food | null;
  side4: Food | null;
}

export enum GameStep {
  START,
  QUEST_RICE_SOUP,
  QUEST_SIDES_INTRO,
  FILL_SIDES,
  DECORATE,
  RESULT,
}
