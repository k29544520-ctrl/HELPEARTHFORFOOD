import React, { useState, useCallback } from 'react';
import { Food, TrayContents, TraySlotId, FoodType, GameStep } from './types';
import { FOODS, DECORATIONS } from './constants';
import FoodItem from './components/FoodItem';
import Tray from './components/Tray';

const initialTray: TrayContents = {
  rice: null,
  soup: null,
  side1: null,
  side2: null,
  side3: null,
  side4: null,
};

const ToriCharacter = ({ mood }: { mood: 'happy' | 'normal' | 'thinking' }) => {
  const imageUrls = {
    happy: 'https://source.unsplash.com/150x150/?happy-squirrel',
    normal: 'https://source.unsplash.com/150x150/?cute-squirrel',
    thinking: 'https://source.unsplash.com/150x150/?sad-squirrel',
  };
  return <img src={imageUrls[mood]} alt="다람쥐 토리" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg border-4 border-amber-300" />;
};

function App() {
  const [trayContents, setTrayContents] = useState<TrayContents>(initialTray);
  const [draggedFood, setDraggedFood] = useState<Food | null>(null);
  const [isBalanced, setIsBalanced] = useState<boolean | null>(null);
  const [gameStep, setGameStep] = useState<GameStep>(GameStep.START);
  const [decorations, setDecorations] = useState<{[key: string]: {top: number, left: number, content: string}[]}>({});
  const [missingMessage, setMissingMessage] = useState<string>('');

  const handleDragStart = (food: Food) => {
    setDraggedFood(food);
  };

  const handleDrop = (slotId: TraySlotId) => {
    if (!draggedFood) return;

    const isSideDishSlot = slotId.startsWith('side');
    const isValidDrop = 
        (draggedFood.type === FoodType.RICE && slotId === 'rice') ||
        (draggedFood.type === FoodType.SOUP && slotId === 'soup') ||
        (isSideDishSlot && ![FoodType.RICE, FoodType.SOUP].includes(draggedFood.type));
    
    if(isValidDrop) {
      setTrayContents(prev => {
        if (prev[slotId]) return prev;
        
        const newTray = { ...prev };
        Object.keys(newTray).forEach(key => {
            const k = key as TraySlotId;
            if (newTray[k]?.id === draggedFood.id) {
                newTray[k] = null;
            }
        });

        return {
          ...newTray,
          [slotId]: draggedFood,
        };
      });
    }
    setDraggedFood(null);
  };
  
  const handleDecorationDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const decoId = e.dataTransfer.getData("decorationId");
    const deco = DECORATIONS.find(d => d.id === decoId);
    if (!deco) return;

    const trayRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - trayRect.left;
    const y = e.clientY - trayRect.top;
    
    const slotId = (e.target as HTMLElement).closest('[data-slot-id]')?.getAttribute('data-slot-id') as TraySlotId | undefined;

    if (slotId && trayContents[slotId]) {
        setDecorations(prev => ({
            ...prev,
            [slotId]: [
                ...(prev[slotId] || []),
                {top: y, left: x, content: deco.content}
            ]
        }));
    }
  }

  const checkBalance = () => {
    const sides = [trayContents.side1, trayContents.side2, trayContents.side3, trayContents.side4].filter(Boolean) as Food[];
    const hasVeg = sides.some(f => f.type === FoodType.VEGETABLE);
    const hasMeat = sides.some(f => f.type === FoodType.MEAT);
    const hasFruit = sides.some(f => f.type === FoodType.FRUIT);
    
    const isMealBalanced = hasVeg && hasMeat && hasFruit;
    setIsBalanced(isMealBalanced);

    if (!isMealBalanced) {
        const missing = [];
        if (!hasVeg) missing.push('채소');
        if (!hasMeat) missing.push('고기/생선');
        if (!hasFruit) missing.push('과일');
        setMissingMessage(`(앗, ${missing.join(', ')} 반찬이 빠진 것 같아!)`);
    } else {
        setMissingMessage('');
    }
    setGameStep(GameStep.RESULT);
  };

  const resetGame = () => {
    setTrayContents(initialTray);
    setIsBalanced(null);
    setDecorations({});
    setMissingMessage('');
    setGameStep(GameStep.START);
  };
  
  const removeFromTray = (slotId: TraySlotId) => {
     setTrayContents(prev => ({...prev, [slotId]: null}));
     setDecorations(prev => {
        const newDecorations = {...prev};
        delete newDecorations[slotId];
        return newDecorations;
     });
  };

  const renderFoodList = (types: FoodType[], title: string, gridCols: string = 'grid-cols-3') => (
    <div className="bg-white/70 p-4 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-center text-amber-700 mb-4">{title}</h3>
      <div className={`grid ${gridCols} gap-4`}>
        {FOODS.filter(f => types.includes(f.type)).map(food => (
          <FoodItem key={food.id} food={food} onDragStart={handleDragStart} />
        ))}
      </div>
    </div>
  );

  const StoryBubble = ({ text }: { text: string }) => (
    <div className="relative bg-white p-4 rounded-xl shadow-md mb-4 max-w-lg mx-auto">
        <p className="text-center text-lg text-gray-700">{text}</p>
        <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
    </div>
  );

  const renderStep = () => {
    switch(gameStep) {
      case GameStep.START:
        return (
          <div className="text-center bg-white/80 p-10 rounded-2xl shadow-xl flex flex-col items-center">
            <h1 className="text-4xl font-bold text-green-700 mb-4">숲속 친구 토리를 도와주세요!</h1>
            <ToriCharacter mood="thinking" />
            <p className="text-lg text-gray-600 my-6">"안녕! 나는 다람쥐 토리야. 🐿️<br/>요즘 기운이 하나도 없어서 걱정이야...<br/>튼튼하고 건강해질 수 있도록 영양 가득한 식판을 만들어 줄 수 있을까?"</p>
            <button
              onClick={() => setGameStep(GameStep.QUEST_RICE_SOUP)}
              className="px-8 py-4 bg-orange-500 text-white font-bold text-2xl rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
            >
              좋아, 내가 도와줄게!
            </button>
          </div>
        );
      case GameStep.QUEST_RICE_SOUP:
        return (
          <div className="w-full text-center">
            <ToriCharacter mood="normal" />
            <StoryBubble text="가장 먼저, 뱃속을 든든하게 채워줄 따뜻한 밥과 국이 필요해!" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {renderFoodList([FoodType.RICE], '밥을 골라주세요')}
              {renderFoodList([FoodType.SOUP], '국을 골라주세요')}
            </div>
             <div className="text-center mt-8">
              <button 
                onClick={() => setGameStep(GameStep.QUEST_SIDES_INTRO)} 
                disabled={!trayContents.rice || !trayContents.soup}
                className="px-6 py-3 bg-blue-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                반찬 고르러 가기
              </button>
            </div>
          </div>
        );
       case GameStep.QUEST_SIDES_INTRO:
        return (
          <div className="text-center bg-white/80 p-10 rounded-2xl shadow-xl flex flex-col items-center">
            <ToriCharacter mood="normal" />
            <p className="text-lg text-gray-600 my-6">"와, 정말 든든하겠다! 고마워! 🥰<br/>이제 알록달록 힘이 나는 반찬들을 채워줘.<br/>숲속에는 맛있는 채소, 고기, 과일이 아주 많아. 골고루 담아주면 더 좋아!"</p>
            <button
              onClick={() => setGameStep(GameStep.FILL_SIDES)}
              className="px-8 py-4 bg-green-500 text-white font-bold text-2xl rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              좋아, 찾아볼게!
            </button>
          </div>
        );
      case GameStep.FILL_SIDES:
        return (
          <div className="w-full text-center">
            <ToriCharacter mood="normal" />
            <StoryBubble text="어떤 반찬을 골라줄까? 보기만 해도 군침이 도는걸!" />
            <div className="mt-4">
              {renderFoodList([FoodType.VEGETABLE, FoodType.MEAT, FoodType.FRUIT], '토리의 힘을 되찾아줄 신비한 재료들', 'grid-cols-3 sm:grid-cols-6')}
            </div>
            <div className="text-center mt-8">
              <button 
                onClick={() => setGameStep(GameStep.DECORATE)}
                className="px-6 py-3 bg-pink-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-pink-600 transition"
              >
                다 골랐어! 예쁘게 꾸며볼까?
              </button>
            </div>
          </div>
        );
       case GameStep.DECORATE:
        return (
          <div className="w-full text-center">
             <ToriCharacter mood="happy" />
             <StoryBubble text="우와! 정말 맛있겠다! 마지막으로 반짝반짝 마법가루를 뿌려서 더 특별한 식판으로 만들어줘!" />
             <div className="bg-white/70 p-4 rounded-xl shadow-lg mt-4 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-center text-purple-700 mb-4">꾸미기 스티커</h3>
                <div className="flex justify-center items-center gap-4">
                  {DECORATIONS.map(deco => (
                    <div 
                      key={deco.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("decorationId", deco.id)}
                      className="text-4xl cursor-grab p-2 rounded-full bg-purple-200 hover:bg-purple-300 transition"
                      title={deco.name}
                    >
                      {deco.content}
                    </div>
                  ))}
                </div>
            </div>
             <div className="text-center mt-8">
              <button 
                onClick={checkBalance}
                className="px-8 py-4 bg-green-500 text-white font-bold text-2xl rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
              >
                마법 완성! 맛있게 먹어!
              </button>
            </div>
          </div>
        );
      case GameStep.RESULT:
        return (
           <div className="text-center bg-white/80 p-10 rounded-2xl shadow-xl flex flex-col items-center">
             {isBalanced ? (
               <>
                 <ToriCharacter mood="happy" />
                 <h2 className="text-3xl font-bold text-green-600 my-4">고마워! 최고의 꼬마 요리사야!</h2>
                 <p className="text-lg text-gray-700">네가 만들어준 영양 만점 식단 덕분에 힘이 불끈 솟아났어!<br/>이제 숲속에서 제일가는 건강 다람쥐가 될 거야! 🎉</p>
               </>
             ) : (
               <>
                 <ToriCharacter mood="thinking" />
                 <h2 className="text-3xl font-bold text-red-500 my-4">정말 맛있어 보여! 하지만...</h2>
                 <p className="text-lg text-gray-700">골고루 먹어야 더 튼튼해진대.<br/>다시 한번만 식판을 꾸며줄 수 있을까?</p>
                 <p className="text-md text-red-600 font-bold mt-2">{missingMessage}</p>
               </>
             )}
             <div className="flex gap-4 mt-8">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-blue-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-blue-600 transition"
                >
                  새로 만들기
                </button>
                { !isBalanced && 
                  <button
                    onClick={() => setGameStep(GameStep.FILL_SIDES)}
                    className="px-6 py-3 bg-yellow-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-yellow-600 transition"
                  >
                    반찬 다시 고르기
                  </button>
                }
             </div>
           </div>
        );
    }
  };


  return (
    <div className="min-h-screen bg-cover bg-center p-4 sm:p-8 flex flex-col items-center" style={{backgroundImage: "url('https://source.unsplash.com/1920x1080/?green-forest-background')"}}>
        <main className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8">
            <Tray 
              contents={trayContents} 
              onDrop={handleDrop} 
              onDecorationDrop={handleDecorationDrop}
              onRemoveItem={removeFromTray}
              decorations={decorations}
            />

            <div className="w-full max-w-4xl">
              {renderStep()}
            </div>
        </main>
    </div>
  );
}

export default App;
