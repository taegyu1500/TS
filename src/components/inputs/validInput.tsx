import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import dupCheck from "../firebase/dupCheck";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder: string;
}

export function ValidInput({
  label,
  id,
  placeholder,
  ...props
}: TextInputProps) {
  const { register, setError, watch } = useFormContext(); // useFormContext 훅에서 watch 함수를 가져옵니다.
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 체크의 결과를 저장하는 상태를 추가합니다.

  const checkDuplicate = async () => {
    const value = watch(id);
    console.log(value, id);
    try {
      if (await dupCheck(value, id)) {
        setError(id, { type: "manual", message: "중복된 값입니다." });
      } else {
        setIsDuplicateChecked(true);
        console.log("중복되지 않은 값입니다.");
      }
    } catch (error) {
      console.error("Error checking duplicate:", error);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="text"
        id={id}
        placeholder={placeholder}
        {...register(id)}
        {...props}
        disabled={isDuplicateChecked} // 중복 체크가 완료되었을 때 Input 컴포넌트를 비활성화합니다.
      />
      <Button onClick={checkDuplicate} type="button">
        중복 체크
      </Button>{" "}
      {/* 중복 체크 버튼을 추가합니다. */}
    </div>
  );
}
