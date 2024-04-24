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
          {/* FormProvider 컴포넌트를 추가하여 ValidInput 컴포넌트와 TextInput 컴포넌트가 동일한 폼을 공유하도록 합니다. */}
          <ValidInput
            label="이메일"
            id="email"
            placeholder="아이디로 쓸 이메일을 입력해주세요"
          />
          <TextInput
            label="비밀번호"
            id="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <TextInput
            label="닉네임"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
          />
          <Button type="submit">다음</Button>{" "}
          {/* 다음 버튼을 추가하여 이 버튼을 클릭하면 handleSubmit 함수가 호출되도록 합니다. */}
        </Step>
      </Funnel>
    </React.Fragment>
  );
};

export default RegisterSetup;
