import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { FunnelProps, StepProps } from "@/hook/useFunnel";
import ButtonInput from "../inputs/buttonInput";
import { ValidInput } from "../inputs/validInput";
import { TextInput } from "../inputs/textInput";
import { InputFile } from "../inputs/fileInput";

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
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  return (
    <React.Fragment>
      <Funnel>
        <Step name="카테고리">
          <ButtonInput
            onNext={() => nextClickHandler(steps[1])}
            label1="판매자"
            id1="Seller"
            label2="구매자"
            id2="NotSeller"
          />
        </Step>
        <Step name="상품 설명">
          <ValidInput
            label="이메일"
            id="email"
            placeholder="아이디로 쓸 이메일을 입력해주세요"
          />
          <TextInput
            label="수량"
            id="quantity"
            placeholder="수량을 입력해주세요"
          />
        </Step>
        <Step name="이미지 등록">
          {fields.map((field, index) => (
            <div key={field.id}>
              <InputFile control={control} id={`files.${index}`} />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({})}>
            Add File
          </button>
        </Step>
      </Funnel>
    </React.Fragment>
  );
};

export default RegisterSetup;
