import React, { useState } from 'react';
import { Delete } from 'lucide-react';

type Operator = '+' | '-' | '*' | '/' | null;

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperatorClick = (op: Operator) => {
    if (operator && !waitingForNewValue && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operator);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(parseFloat(display));
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a: number, b: number, op: Operator): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEqualClick = () => {
    if (operator && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operator);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (waitingForNewValue) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  // Neobrutalist button base class
  const btnClass = "h-16 text-xl font-bold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center select-none hover:bg-opacity-90";
  
  return (
    <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-xs">
        {/* Header / Decoration */}
        <div className="mb-8 bg-[#FF6B6B] border-3 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
          <h1 className="text-2xl font-black text-black uppercase tracking-tighter text-center">
            NEO-CALC_v1
          </h1>
        </div>

        {/* Calculator Body */}
        <div className="bg-[#A3E635] border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none">
          
          {/* Display */}
          <div className="mb-6 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right h-20 flex items-center justify-end overflow-hidden">
            <span className="text-4xl font-black tracking-tight text-black truncate">
              {display}
            </span>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-3">
            
            {/* Row 1 */}
            <button onClick={handleClear} className={`${btnClass} col-span-2 bg-[#FF6B6B] text-white`}>AC</button>
            <button onClick={handleBackspace} className={`${btnClass} bg-[#FCD34D] text-black`}><Delete size={24} /></button>
            <button onClick={() => handleOperatorClick('/')} className={`${btnClass} bg-[#C4B5FD] text-black`}>÷</button>

            {/* Row 2 */}
            <button onClick={() => handleNumberClick('7')} className={`${btnClass} bg-white text-black`}>7</button>
            <button onClick={() => handleNumberClick('8')} className={`${btnClass} bg-white text-black`}>8</button>
            <button onClick={() => handleNumberClick('9')} className={`${btnClass} bg-white text-black`}>9</button>
            <button onClick={() => handleOperatorClick('*')} className={`${btnClass} bg-[#C4B5FD] text-black`}>×</button>

            {/* Row 3 */}
            <button onClick={() => handleNumberClick('4')} className={`${btnClass} bg-white text-black`}>4</button>
            <button onClick={() => handleNumberClick('5')} className={`${btnClass} bg-white text-black`}>5</button>
            <button onClick={() => handleNumberClick('6')} className={`${btnClass} bg-white text-black`}>6</button>
            <button onClick={() => handleOperatorClick('-')} className={`${btnClass} bg-[#C4B5FD] text-black`}>-</button>

            {/* Row 4 */}
            <button onClick={() => handleNumberClick('1')} className={`${btnClass} bg-white text-black`}>1</button>
            <button onClick={() => handleNumberClick('2')} className={`${btnClass} bg-white text-black`}>2</button>
            <button onClick={() => handleNumberClick('3')} className={`${btnClass} bg-white text-black`}>3</button>
            <button onClick={() => handleOperatorClick('+')} className={`${btnClass} bg-[#C4B5FD] text-black`}>+</button>

            {/* Row 5 */}
            <button onClick={() => handleNumberClick('0')} className={`${btnClass} col-span-2 bg-white text-black`}>0</button>
            <button onClick={() => handleNumberClick('.')} className={`${btnClass} bg-white text-black`}>.</button>
            <button onClick={handleEqualClick} className={`${btnClass} bg-[#67E8F9] text-black`}>=</button>
          </div>
        </div>
        
        {/* Footer Decoration */}
        <div className="mt-12 text-center font-bold text-sm">
            <span className="bg-black text-white px-2 py-1 rotate-2 inline-block">NO REFUNDS</span>
        </div>
      </div>
    </div>
  );
}
