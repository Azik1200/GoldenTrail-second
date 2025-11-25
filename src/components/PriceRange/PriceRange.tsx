import { useEffect, useMemo, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

type PriceRangeProps = {
  min?: number;
  max?: number;
  onChange?: (value: [number, number]) => void;
};

const PriceRange = ({ min = 0, max = 1000, onChange }: PriceRangeProps) => {
  const [value, setValue] = useState<[number, number]>([min, max]);

  const bounds = useMemo(() => {
    const normalizedMin = Number.isFinite(min) ? min : 0;
    const normalizedMax = Number.isFinite(max) ? max : normalizedMin + 1;
    const safeMax = normalizedMax > normalizedMin ? normalizedMax : normalizedMin + 1;

    return { min: normalizedMin, max: safeMax };
  }, [min, max]);

  useEffect(() => {
    setValue([bounds.min, bounds.max]);
  }, [bounds.min, bounds.max]);

  const handleInput = (v: [number, number]) => {
    setValue(v);

    if (onChange) {
      onChange(v);
    }
  };

  return (
    <div className="priceRange">
      <RangeSlider
        min={bounds.min}
        max={bounds.max}
        value={value}
        onInput={handleInput}
      />

      <div className="priceRange-values">
        От {value[0]}AZN до {value[1]}AZN
      </div>
    </div>
  );
};

export default PriceRange;
