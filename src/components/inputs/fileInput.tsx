import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, Controller, FieldValues } from "react-hook-form";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  control: Control<FieldValues, object>;
}

export function InputFile({ id, control }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">파일 업로드</Label>
      <Controller
        control={control}
        name={id}
        render={({ field }) => <Input {...field} type="file" />}
      />
    </div>
  );
}
