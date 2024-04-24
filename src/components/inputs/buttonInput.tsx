import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

interface ButtonInputProps {
  label1: string;
  id1: string;
  label2: string;
  id2: string;
  onNext: () => void;
}

const ButtonInput = ({
  label1,
  id1,
  label2,
  id2,
  onNext,
}: ButtonInputProps) => {
  const { register, setValue } = useFormContext();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setActiveButton(id);
    setValue("button", id);
    onNext();
  };

  return (
    <div>
      <Button
        key={id1}
        onClick={() => handleClick(id1)}
        style={{ backgroundColor: activeButton === id1 ? "blue" : "gray" }}
        {...register("button")}
      >
        {label1}
      </Button>
      <Button
        key={id2}
        onClick={() => handleClick(id2)}
        style={{ backgroundColor: activeButton === id2 ? "blue" : "gray" }}
        {...register("button")}
      >
        {label2}
      </Button>
    </div>
  );
};

export default ButtonInput;
