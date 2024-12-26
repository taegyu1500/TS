import React from "react";

import { FunnelProps, StepProps } from "@/hook/useFunnel";
import { TextInput } from "../inputs/textInput";
import { InputFile } from "../inputs/fileInput";
import SelectInput from "../inputs/selectInput";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-select";
import NumberInput from "../inputs/numberInput";

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
      <div className="flex items-center justify-center w-full h-full mt-5">
        <div className="w-3/4">
          <Funnel>
            <Step name="카테고리">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  상품 카테고리를 선택해주세요
                </h3>
                <SelectInput name="category" />
                <Button
                  onClick={() => nextClickHandler(steps[1])}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-5"
                >
                  다음
                </Button>
              </div>
            </Step>

            <Step name="상품 설명">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  상품 정보를 입력해주세요
                </h3>
                <div className="m-2">
                  <TextInput
                    label="상품 이름"
                    id="productName"
                    placeholder="상품 이름을 입력해주세요"
                  />
                </div>
                <Separator />
                <div className="m-2">
                  <TextInput
                    label="상품 설명"
                    id="description"
                    placeholder="상품에 대한 설명을 입력해주세요"
                  />
                </div>
                <div className="m-2">
                  <NumberInput
                    label="수량"
                    id="quantity"
                    placeholder="수량을 입력해주세요"
                  />
                </div>
                <div className="m-2">
                  <NumberInput
                    label="가격"
                    id="price"
                    placeholder="가격을 입력해주세요"
                  />
                </div>
                <Button onClick={() => nextClickHandler(steps[2])}>다음</Button>
              </div>
            </Step>
            <Step name="이미지 등록">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <InputFile name="files" />
                <Separator />
                <Button type="submit">등록</Button>
              </div>
            </Step>
          </Funnel>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterSetup;
