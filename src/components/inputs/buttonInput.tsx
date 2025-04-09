import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ButtonInputProps {
  title?: string;
  description?: string;
  label1: string;
  id1: string;
  label2: string;
  id2: string;
  icons?: {
    icon1?: React.ReactNode;
    icon2?: React.ReactNode;
  };
  onNext: () => void;
}

const ButtonInput = ({
  title = "옵션을 선택하세요",
  description = "아래 두 옵션 중 하나를 선택해 주세요.",
  label1,
  id1,
  label2,
  id2,
  icons,
  onNext,
}: ButtonInputProps) => {
  const { register, setValue } = useFormContext();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);

  const handleClick = (id: string) => {
    setActiveButton(id);
    setValue("button", id);
    onNext();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
      {/* 헤더 섹션 */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>

      {/* 버튼 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 첫 번째 버튼 */}
        <div
          className="transition-transform duration-200"
          style={{
            transform: isPressed1
              ? "scale(0.98)"
              : isHovering1
              ? "scale(1.02)"
              : "scale(1)",
          }}
        >
          <button
            type="button"
            onClick={() => handleClick(id1)}
            onMouseEnter={() => setIsHovering1(true)}
            onMouseLeave={() => {
              setIsHovering1(false);
              setIsPressed1(false);
            }}
            onMouseDown={() => setIsPressed1(true)}
            onMouseUp={() => setIsPressed1(false)}
            className={`w-full p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center text-center h-full
              ${
                activeButton === id1
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            {...register("button")}
          >
            {/* 아이콘 영역 */}
            <div className="text-4xl mb-3">
              {icons?.icon1 || (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center transition-all duration-200">
                  {activeButton === id1 ? (
                    <CheckCircle2 className="text-blue-600" size={28} />
                  ) : (
                    <span className="text-xl">{label1.charAt(0)}</span>
                  )}
                </div>
              )}
            </div>

            {/* 라벨 */}
            <span className="font-medium text-lg">{label1}</span>
          </button>
        </div>

        {/* 두 번째 버튼 */}
        <div
          className="transition-transform duration-200"
          style={{
            transform: isPressed2
              ? "scale(0.98)"
              : isHovering2
              ? "scale(1.02)"
              : "scale(1)",
          }}
        >
          <button
            type="button"
            onClick={() => handleClick(id2)}
            onMouseEnter={() => setIsHovering2(true)}
            onMouseLeave={() => {
              setIsHovering2(false);
              setIsPressed2(false);
            }}
            onMouseDown={() => setIsPressed2(true)}
            onMouseUp={() => setIsPressed2(false)}
            className={`w-full p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center text-center h-full
              ${
                activeButton === id2
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            {...register("button")}
          >
            {/* 아이콘 영역 */}
            <div className="text-4xl mb-3">
              {icons?.icon2 || (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center transition-all duration-200">
                  {activeButton === id2 ? (
                    <CheckCircle2 className="text-blue-600" size={28} />
                  ) : (
                    <span className="text-xl">{label2.charAt(0)}</span>
                  )}
                </div>
              )}
            </div>

            {/* 라벨 */}
            <span className="font-medium text-lg">{label2}</span>
          </button>
        </div>
      </div>

      {/* 도움말 텍스트 추가 (선택 사항) */}
      {!activeButton && (
        <div className="mt-6 text-center text-sm text-gray-400">
          옵션을 선택하여 계속 진행하세요
        </div>
      )}
    </div>
  );
};

export default ButtonInput;
