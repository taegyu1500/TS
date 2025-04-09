import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import dupCheck from "../firebase/dupCheck";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder: string;
  validationType?: "email" | "nickname" | "default";
}

export function ValidInput({
  label,
  id,
  placeholder,
  validationType,
  ...props
}: TextInputProps) {
  // id를 기반으로 기본 validationType 결정
  const effectiveType =
    validationType ||
    (id === "email" ? "email" : id === "nickname" ? "nickname" : "default");

  const {
    register,
    setError,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();

  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // 입력값 변경 감지
  const value = watch(id);

  // 이메일 유효성 검사를 위한 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 값이 변경되면 중복 체크 상태 리셋
  useEffect(() => {
    if (isDuplicateChecked) {
      setIsDuplicateChecked(false);
    }
  }, [value]);

  // 값이 변경될 때마다 유효성 검사 실행 (디바운스 구현 가능)
  useEffect(() => {
    if (value) {
      trigger(id);
    }
  }, [value, id, trigger]);

  // 유효성 검사 옵션 설정
  const validationRules = () => {
    switch (effectiveType) {
      case "email":
        return {
          required: "이메일을 입력해주세요.",
          pattern: {
            value: emailRegex,
            message: "올바른 이메일 형식이 아닙니다.",
          },
          validate: {
            checked: () =>
              isDuplicateChecked || "이메일 중복 확인이 필요합니다.",
          },
        };
      case "nickname":
        return {
          required: "닉네임을 입력해주세요.",
          minLength: {
            value: 2,
            message: "닉네임은 최소 2글자 이상이어야 합니다.",
          },
          maxLength: {
            value: 20,
            message: "닉네임은 최대 20글자까지 가능합니다.",
          },
          validate: {
            checked: () =>
              isDuplicateChecked || "닉네임 중복 확인이 필요합니다.",
          },
        };
      default:
        return {
          required: "값을 입력해주세요.",
        };
    }
  };

  const checkDuplicate = async () => {
    // 현재 입력값에 대해 유효성 검사 실행
    const isValid = await trigger(id);
    if (!isValid) return; // 유효성 검사 실패시 중복 체크 중단

    setIsChecking(true);
    try {
      if (await dupCheck(value, id)) {
        setError(id, { type: "manual", message: "중복된 값입니다." });
      } else {
        setIsDuplicateChecked(true);
        // 오류 메시지 제거
        setError(id, { type: "manual", message: "" });
      }
    } catch (error) {
      console.error("Error checking duplicate:", error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          id={id}
          placeholder={placeholder}
          {...register(id, validationRules())}
          {...props}
          disabled={isDuplicateChecked}
          className={errors[id] ? "border-red-500" : ""}
        />
        <Button
          onClick={checkDuplicate}
          type="button"
          disabled={
            isChecking ||
            isDuplicateChecked ||
            (effectiveType === "email" && !emailRegex.test(value || ""))
          }
          className="whitespace-nowrap"
        >
          {isChecking
            ? "확인 중..."
            : isDuplicateChecked
            ? "확인 완료"
            : "중복 확인"}
        </Button>
      </div>

      {/* 오류 메시지 표시 */}
      {errors[id] && (
        <Alert variant="destructive" className="py-2 mt-1">
          <AlertDescription className="text-xs">
            {errors[id]?.message as string}
          </AlertDescription>
        </Alert>
      )}

      {/* 성공 메시지 표시 */}
      {isDuplicateChecked && (
        <Alert className="py-2 mt-1 bg-green-50 border-green-200">
          <AlertDescription className="text-xs text-green-700">
            사용 가능한 {effectiveType === "email" ? "이메일" : "닉네임"}
            입니다.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
