import React from "react";

interface StepsProps {
  steps: string[];
  currentStep: string;
}

const Steps: React.FC<StepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full mb-5">
      {steps.map((step, index) => {
        const isActive = steps.indexOf(currentStep) === index;
        const isCompleted = steps.indexOf(currentStep) > index;
        console.log(steps, currentStep);
        console.log(steps.indexOf(currentStep), index);
        return (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-2">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  isCompleted
                    ? "bg-blue-500 text-white border-blue-500"
                    : isActive
                    ? "bg-white text-blue-500 border-blue-500"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              >
                {isCompleted ? "✔" : index + 1}
              </div>
              {/* Step Label */}
              <span
                className={`${
                  isActive || isCompleted ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  isCompleted ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Steps;
