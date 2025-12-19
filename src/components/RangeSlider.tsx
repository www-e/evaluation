import React, { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  defaultValue?: [number, number];
  onChange?: (values: [number, number]) => void;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  defaultValue = [min, max],
  onChange,
  className = ""
}) => {
  const [values, setValues] = useState<[number, number]>(defaultValue);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    const updatedValues: [number, number] = [newMin, values[1]];
    if (newMin > values[1]) {
      updatedValues[1] = newMin;
      updatedValues[0] = values[1];
    }
    setValues(updatedValues);
    onChange?.(updatedValues);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    const updatedValues: [number, number] = [values[0], newMax];
    if (newMax < values[0]) {
      updatedValues[0] = newMax;
      updatedValues[1] = values[0];
    }
    setValues(updatedValues);
    onChange?.(updatedValues);
  };

  // Calculate positions for the track fill and thumbs
  const minPercent = ((values[0] - min) / (max - min)) * 100;
  const maxPercent = ((values[1] - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-5">
        {/* Track */}
        <div className="absolute h-[5px] w-full top-1/2 -translate-y-1/2 bg-red-950 rounded-xl"></div>
        
        {/* Fill between thumbs */}
        <div 
          className="absolute h-[5px] top-1/2 -translate-y-1/2 bg-red-950 rounded-xl"
          style={{ 
            left: `${minPercent}%`, 
            width: `${maxPercent - minPercent}%` 
          }}
        ></div>
        
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={values[0]}
          onChange={handleMinChange}
          className="absolute w-full h-5 top-1/2 -translate-y-1/2 -ml-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-2xl [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-red-950 [&::-webkit-slider-thumb]:shadow-[0px_6px_10px_0px_rgba(128,170,168,0.38)]"
        />
        
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={values[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-5 top-1/2 -translate-y-1/2 -ml-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-2xl [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-red-950 [&::-webkit-slider-thumb]:shadow-[0px_6px_10px_0px_rgba(128,170,168,0.38)]"
        />
      </div>
    </div>
  );
};

export default RangeSlider;