import { useFunnel } from "@/hook/useFunnel";
import GenericForm from "@/components/common/GenericForm";
import RegisterProductSetup from "@/components/formSetup/registerProductSetup";
import registerProduct from "@/components/firebase/registerProduct";
import { useNavigate } from "react-router-dom";
import { uploadFiles, deleteProduct } from "@/util/firebaseFunctions";
import { useToast } from "@/components/ui/use-toast";
import FormSteps from "@/components/formSetup/formSteps";
import { Separator } from "@/components/ui/separator";

const steps = ["카테고리", "상품 설명", "이미지 등록"];
interface FormData {
  category: string;
  productName: string;
  quantity: string;
  price: number;
  files: FileList;
  description: string;
}

const ProductRegisterPage = () => {
  const navigate = useNavigate();
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);
  const { toast } = useToast();

  const nextClickHandler = (nextStep: string) => {
    setStep(nextStep);
  };

  const handleSubmit = async (data: FormData) => {
    const { category, productName, quantity, price, files, description } = data;
    if (category === undefined) {
      toast({
        title: "카테고리 미입력",
        description: "카테고리를 입력해주세요.",
      });
      return;
    }
    const product = {
      category,
      productName,
      quantity: Number(quantity),
      price,
      name: `${productName}`,
      Images: files.length ? Array.from(files).map((file) => file.name) : [],
      description,
    };
    try {
      const id = await registerProduct(product);

      if (id) {
        try {
          await uploadFiles(files, id);
          toast({
            title: "제품 등록 성공",
            description: "제품이 성공적으로 등록되었습니다.",
          });
          navigate("/");
        } catch (uploadError) {
          console.error("파일 업로드 실패:", uploadError);
          await deleteProduct(id); // 파일 업로드 실패 시 생성된 제품 삭제
          toast({
            title: "파일 업로드 실패",
            description: "파일 업로드에 실패했습니다. 다시 시도해주세요.",
          });
        }
      }
    } catch (registerError) {
      console.error("제품 등록 실패:", registerError);
      toast({
        title: "제품 등록 실패",
        description: "제품 등록에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <div>
      <FormSteps steps={steps} currentStep={currentStep} />
      <Separator />
      <GenericForm onSubmit={handleSubmit}>
        <RegisterProductSetup
          steps={steps}
          nextClickHandler={nextClickHandler}
          Funnel={Funnel}
          Step={Step}
        />
      </GenericForm>
    </div>
  );
};

export default ProductRegisterPage;
