import { Food, FoodType } from './types';

export const FOODS: Food[] = [
  // 밥 (Rice)
  { id: 'rice-1', name: '흰쌀밥', type: FoodType.RICE, imageUrl: 'https://source.unsplash.com/100x100/?white-rice-bowl' },
  { id: 'rice-2', name: '잡곡밥', type: FoodType.RICE, imageUrl: 'https://source.unsplash.com/100x100/?multigrain-rice' },
  { id: 'rice-3', name: '콩밥', type: FoodType.RICE, imageUrl: 'https://source.unsplash.com/100x100/?rice-with-beans' },

  // 국 (Soup)
  { id: 'soup-1', name: '미역국', type: FoodType.SOUP, imageUrl: 'https://source.unsplash.com/100x100/?seaweed-soup' },
  { id: 'soup-2', name: '된장국', type: FoodType.SOUP, imageUrl: 'https://source.unsplash.com/100x100/?doenjang-jjigae' },
  { id: 'soup-3', name: '계란국', type: FoodType.SOUP, imageUrl: 'https://source.unsplash.com/100x100/?egg-drop-soup' },

  // 채소 (Vegetables)
  { id: 'veg-1', name: '시금치', type: FoodType.VEGETABLE, imageUrl: 'https://source.unsplash.com/100x100/?spinach-namul' },
  { id: 'veg-2', name: '당근', type: FoodType.VEGETABLE, imageUrl: 'https://source.unsplash.com/100x100/?sliced-carrots' },
  { id: 'veg-3', name: '오이', type: FoodType.VEGETABLE, imageUrl: 'https://source.unsplash.com/100x100/?sliced-cucumber' },
  { id: 'veg-4', name: '버섯', type: FoodType.VEGETABLE, imageUrl: 'https://source.unsplash.com/100x100/?stir-fried-mushrooms' },
  { id: 'veg-5', name: '브로콜리', type: FoodType.VEGETABLE, imageUrl: 'https://source.unsplash.com/100x100/?steamed-broccoli' },
  { id: 'veg-6', name: '김치', type: FoodType.VEGETABLE, imageUrl: 'https://source.unsplash.com/100x100/?kimchi' },
  
  // 고기 (Meat)
  { id: 'meat-1', name: '불고기', type: FoodType.MEAT, imageUrl: 'https://source.unsplash.com/100x100/?bulgogi' },
  { id: 'meat-2', name: '생선구이', type: FoodType.MEAT, imageUrl: 'https://source.unsplash.com/100x100/?grilled-fish' },
  { id: 'meat-3', name: '계란말이', type: FoodType.MEAT, imageUrl: 'https://source.unsplash.com/100x100/?gyeran-mari' },
  { id: 'meat-4', name: '닭고기', type: FoodType.MEAT, imageUrl: 'https://source.unsplash.com/100x100/?fried-chicken' },
  { id: 'meat-5', name: '두부', type: FoodType.MEAT, imageUrl: 'https://source.unsplash.com/100x100/?pan-fried-tofu' },
  { id: 'meat-6', name: '새우', type: FoodType.MEAT, imageUrl: 'https://source.unsplash.com/100x100/?grilled-shrimp' },

  // 과일 (Fruit)
  { id: 'fruit-1', name: '사과', type: FoodType.FRUIT, imageUrl: 'https://source.unsplash.com/100x100/?sliced-apple' },
  { id: 'fruit-2', name: '바나나', type: FoodType.FRUIT, imageUrl: 'https://source.unsplash.com/100x100/?sliced-banana' },
  { id: 'fruit-3', name: '딸기', type: FoodType.FRUIT, imageUrl: 'https://source.unsplash.com/100x100/?strawberries' },
  { id: 'fruit-4', name: '오렌지', type: FoodType.FRUIT, imageUrl: 'https://source.unsplash.com/100x100/?sliced-orange' },
  { id: 'fruit-5', name: '포도', type: FoodType.FRUIT, imageUrl: 'https://source.unsplash.com/100x100/?grapes' },
  { id: 'fruit-6', name: '수박', type: FoodType.FRUIT, imageUrl: 'https://source.unsplash.com/100x100/?sliced-watermelon' },
];

export const DECORATIONS = [
  { id: 'deco-1', name: '반짝이', content: '✨' },
  { id: 'deco-2', name: '하트', content: '💖' },
  { id: 'deco-3', name: '별', content: '🌟' },
  { id: 'deco-4', name: '스마일', content: '😊' },
];
