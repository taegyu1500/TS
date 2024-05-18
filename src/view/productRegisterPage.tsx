import { useFunnel } from "@/hook/useFunnel";
import GenericForm from "@/components/common/GenericForm";
import RegisterProductSetup from "@/components/formSetup/registerProductSetup";
import registerProduct from "@/components/firebase/registerProduct";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "@/components/firebase/uploadFile";

const steps = ["카테고리", "상품 설명", "이미지 등록"];
interface FormData {
  category: string;
  description: string;
  quantity: string;
  price: number;
  files: FileList;
}

const ProductRegisterPage = () => {
  const Navigate = useNavigate();
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const nextClickHandler = (nextStep: string) => {
    setStep(nextStep);
  };

  const handleSubmit = async (data: FormData) => {
    console.log(data);
    const { category, description, quantity, price, files } = data;
    console.log(files);
    if (category === undefined) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    const product = {
      category,
      description,
      quantity: Number(quantity),
      price,
      name: `[${category}] ${description}`,
      Images: files.length ? Array.from(files).map((file) => file.name) : [],
    };

    const id = await registerProduct(product);

    if (id) {
      await uploadFiles(files, id);
      Navigate("/main");
    }
  };

  return (
    <GenericForm onSubmit={handleSubmit}>
      <RegisterProductSetup
        steps={steps}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
      />
    </GenericForm>
  );
};

export default ProductRegisterPage;
