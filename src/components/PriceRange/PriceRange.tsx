import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const PriceRange = () => {
  const [value, setValue] = useState<[number, number]>([0, 1000]);

  return (
    <div className="priceRange">
      <RangeSlider
        min={0}
        max={100}
        value={value}
        onInput={(v: [number, number]) => setValue(v)}
      />

      <div className="priceRange-values">
        От {value[0]}AZN до {value[1]}AZN
      </div>
    </div>
  );
};

export default PriceRange;
