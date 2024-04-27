import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function InputFile({ name, ...props }: InputFileProps) {
  const { register } = useFormContext();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        {...register(name)}
        type="file"
        onChange={(e) => {
          console.log(e.target.files);
        }}
        multiple
        accept="image/*"
        {...props}
      />
    </div>
  );
}
