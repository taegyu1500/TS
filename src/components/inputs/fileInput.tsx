import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export function InputFile({ id }: InputFileProps) {
  const { register } = useFormContext(); // useFormContext 훅을 사용하여 register 함수를 가져옵니다.

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">파일 업로드</Label>
      <Input id={id} type="file" {...register(id)} />{" "}
      {/* register 함수를 Input 컴포넌트에 전달합니다. */}
    </div>
  );
}
