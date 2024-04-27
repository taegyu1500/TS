import React from "react";

import { FunnelProps, StepProps } from "@/hook/useFunnel";
import { TextInput } from "../inputs/textInput";
import { InputFile } from "../inputs/fileInput";
import SelectInput from "../inputs/selectInput";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-select";

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
        <Step name="카테고리">
          <SelectInput name="category" />
          <Button onClick={() => nextClickHandler(steps[1])}>다음</Button>
        </Step>
        <Step name="상품 설명">
          <TextInput
            label="상품 설명"
            id="description"
            placeholder="상품에 대한 설명을 입력해주세요"
          />
          <TextInput
            label="수량"
            id="quantity"
            placeholder="수량을 입력해주세요"
          />
          <TextInput
            label="가격"
            id="price"
            placeholder="가격을 입력해주세요"
          />
          <Button onClick={() => nextClickHandler(steps[2])}>다음</Button>
        </Step>
        <Step name="이미지 등록">
          <InputFile name="files" />
          <Separator />
          <Button type="submit">등록</Button>
        </Step>
      </Funnel>
    </React.Fragment>
  );
};

export default RegisterSetup;
