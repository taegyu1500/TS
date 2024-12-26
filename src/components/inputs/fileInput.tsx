import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useState } from "react";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function InputFile({ name, ...props }: InputFileProps) {
  const { register } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(filePreviews);
    }
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        {...register(name)}
        type="file"
        onChange={(e) => {
          handleFileChange(e);
        }}
        multiple
        accept="image/*"
        {...props}
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        미리보기
        {previews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`미리보기 ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>
      {/* 올린 이미지 띄우기 */}
    </div>
  );
}
