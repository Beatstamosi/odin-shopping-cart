import { useState } from "react";

function useQuantity(initial = 1) {
  const [quantity, setQuantity] = useState(initial);

  const increase = () => setQuantity((prev) => prev + 1);

  const decrease = () => setQuantity((prev) => (prev - 1 <= 1 ? 1 : prev - 1));

  return { quantity, increase, decrease };
}

export default useQuantity;
