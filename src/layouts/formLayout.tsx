import { useForm } from "react-hook-form";
import GenericForm from "@/components/common/GenericForm";
import { useFunnel } from "@/hook/useFunnel";
import { Input } from "@/components/ui/input";

type FieldData = {
  name: string;
  type: string;
  placeholder: string;
};

type FormFields = {
  [K in FieldData["name"]]: string;
};

type FormLayoutProps = {
  fields: FieldData[];
  steps: string[];
};

const FormLayout = ({ fields }: FormLayoutProps) => {
  const { Funnel, Step } = useFunnel("defaultStep");
  const {
    register,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <GenericForm onSubmit={onSubmit}>
      <Funnel>
        {fields.map((field) => (
          <Step key={field.name} name={field.name}>
            <div>
              <label>{field.name}</label>
              <div>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, { required: true })}
                />
              </div>
              {errors[field.name] && <span>{field.placeholder}</span>}
            </div>
          </Step>
        ))}
      </Funnel>
    </GenericForm>
  );
};

export default FormLayout;
