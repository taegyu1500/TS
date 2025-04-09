import React from "react";
import { FunnelProps, StepProps } from "@/hook/useFunnel";
import ButtonInput from "../inputs/buttonInput";
import { ValidInput } from "../inputs/validInput";
import { TextInput } from "../inputs/textInput";
import { Button } from "../ui/button";

export interface ProfileSetupInterface {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const RegisterSetup = ({
  steps,
  nextClickHandler,
  Funnel,
  Step,
}: ProfileSetupInterface) => {
  return (
    <React.Fragment>
      <Funnel>
        <Step name="사용자 정보 선택">
          <ButtonInput
            onNext={() => nextClickHandler(steps[1])}
            label1="판매자"
            id1="Seller"
            label2="구매자"
            id2="NotSeller"
          />
        </Step>
        <Step name="로그인 정보">
          {/* 로그인 정보 폼 컨테이너 */}
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
            {/* 헤더 섹션 */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                계정 정보 입력
              </h2>
              <p className="text-gray-500">
                회원가입에 필요한 정보를 입력해주세요
              </p>
            </div>

            {/* 입력 필드 섹션 */}
            <div className="space-y-5">
              {/* 이메일 입력 */}
              <div>
                <ValidInput
                  label="이메일"
                  id="email"
                  placeholder="아이디로 쓸 이메일을 입력해주세요"
                />
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <TextInput
                  label="비밀번호"
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>

              {/* 닉네임 입력 */}
              <div>
                <TextInput
                  label="닉네임"
                  id="nickname"
                  placeholder="닉네임을 입력해주세요"
                />
              </div>
            </div>

            {/* 다음 버튼 */}
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                계정 생성하기
              </Button>

              {/* 추가 안내 텍스트 */}
              <p className="text-xs text-gray-500 text-center mt-4">
                가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다
              </p>
            </div>
          </div>
        </Step>
      </Funnel>
    </React.Fragment>
  );
};

export default RegisterSetup;
