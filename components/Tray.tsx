
import React from 'react';
import { TrayContents, TraySlotId, Food } from '../types';

interface TraySlotProps {
  slotId: TraySlotId;
  content: Food | null;
  onDrop: (slotId: TraySlotId) => void;
  onRemoveItem: (slotId: TraySlotId) => void;
  className?: string;
  label: string;
  decorations: {top: number, left: number, content: string}[];
}

const TraySlot: React.FC<TraySlotProps> = ({ slotId, content, onDrop, onRemoveItem, className, label, decorations }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(slotId);
  };
  
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemoveItem(slotId);
  }

  return (
    <div
      data-slot-id={slotId}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative bg-gray-200/80 rounded-lg flex items-center justify-center transition-colors border-2 border-dashed border-gray-400 ${content ? 'border-solid border-amber-500' : ''} ${className}`}
    >
      {!content ? (
        <span className="text-gray-500 font-bold">{label}</span>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-1">
          <img src={content.imageUrl} alt={content.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full" />
          <span className="text-sm mt-1 font-semibold text-gray-800 text-center">{content.name}</span>
           <button 
                onClick={handleRemove}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold leading-none hover:bg-red-600 transition-opacity opacity-50 hover:opacity-100"
                title="빼기"
            >
                X
            </button>
        </div>
      )}
      {decorations.map((deco, index) => (
          <div key={index} className="absolute text-2xl pointer-events-none" style={{ top: `calc(${deco.top}px - 14px)`, left: `calc(${deco.left}px - 14px)` }}>
              {deco.content}
          </div>
      ))}
    </div>
  );
};


interface TrayProps {
    contents: TrayContents;
    onDrop: (slotId: TraySlotId) => void;
    onDecorationDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onRemoveItem: (slotId: TraySlotId) => void;
    decorations: {[key: string]: {top: number, left: number, content: string}[]};
}

const Tray: React.FC<TrayProps> = ({ contents, onDrop, onDecorationDrop, onRemoveItem, decorations }) => {
    return (
        <div 
          className="bg-amber-100 p-4 rounded-3xl shadow-2xl w-full max-w-3xl aspect-[4/2.5] grid grid-cols-4 grid-rows-2 gap-3"
          onDrop={onDecorationDrop}
          onDragOver={(e) => e.preventDefault()}
        >
            <TraySlot slotId="rice" content={contents.rice} onDrop={onDrop} onRemoveItem={onRemoveItem} label="밥" className="col-span-2 row-span-1" decorations={decorations.rice || []}/>
            <TraySlot slotId="soup" content={contents.soup} onDrop={onDrop} onRemoveItem={onRemoveItem} label="국" className="col-span-2 row-span-1" decorations={decorations.soup || []}/>
            <TraySlot slotId="side1" content={contents.side1} onDrop={onDrop} onRemoveItem={onRemoveItem} label="반찬1" className="col-span-1 row-span-1" decorations={decorations.side1 || []}/>
            <TraySlot slotId="side2" content={contents.side2} onDrop={onDrop} onRemoveItem={onRemoveItem} label="반찬2" className="col-span-1 row-span-1" decorations={decorations.side2 || []}/>
            <TraySlot slotId="side3" content={contents.side3} onDrop={onDrop} onRemoveItem={onRemoveItem} label="반찬3" className="col-span-1 row-span-1" decorations={decorations.side3 || []}/>
            <TraySlot slotId="side4" content={contents.side4} onDrop={onDrop} onRemoveItem={onRemoveItem} label="반찬4" className="col-span-1 row-span-1" decorations={decorations.side4 || []}/>
        </div>
    );
};


export default Tray;
