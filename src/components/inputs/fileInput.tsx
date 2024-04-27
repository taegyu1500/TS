import { useFormContext } from "react-hook-form";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function InputFile({ name, ...props }: InputFileProps) {
  const { register } = useFormContext();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <input
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
