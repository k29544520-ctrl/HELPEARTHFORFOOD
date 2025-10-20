
import React from 'react';
import { Food } from '../types';

interface FoodItemProps {
  food: Food;
  onDragStart: (food: Food) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ food, onDragStart }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('foodId', food.id);
    onDragStart(food);
  };
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md cursor-grab active:cursor-grabbing transition-transform transform hover:scale-105"
      title={food.name}
    >
      <img src={food.imageUrl} alt={food.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-amber-300" />
      <span className="mt-2 text-sm text-center font-semibold text-gray-700">{food.name}</span>
    </div>
  );
};

export default FoodItem;
