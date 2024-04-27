import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder: string;
}

export function TextInput({
  label,
  id,
  placeholder,
  ...props
}: TextInputProps) {
  const { register } = useFormContext(); // useFormContext 훅을 사용하여 register 함수를 가져옵니다.

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={id == "password" ? "password" : "text"}
        id={id}
        placeholder={placeholder}
        {...register(id)}
        {...props}
      />
      {/* register 함수를 Input 컴포넌트에 전달합니다. */}
    </div>
  );
}
