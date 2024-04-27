import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";

const options = ["의류", "가전제품", "가구", "생활용품", "식품", "기타"];

interface SelectInputProps {
  name: string; // form에서 이 input 요소를 식별하는 데 사용되는 이름입니다.
}

export function SelectInput({ name, ...props }: SelectInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...props} {...field}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="카테고리 선택해주세요!" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <>
                {options.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    onClick={() => {
                      field.onChange(option);
                    }}
                  >
                    {option}
                  </SelectItem>
                ))}
              </>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}

export default SelectInput;
