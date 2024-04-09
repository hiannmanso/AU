import React, { ChangeEvent } from "react";

interface FormProps<T extends Record<string, any>> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  formFields: {
    [key: string]: {
      type: "text" | "select" | "number";
      options?: { name: string; id: string }[];
      placeholder?: string;
    };
  };
  multiplies: boolean;
}

function Form<T extends Record<string, any>>({
  formData,
  setFormData,
  formFields,
  multiplies,
}: FormProps<T>) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const parsedValue =
      formFields[name]?.type === "number" ? parseFloat(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    if (multiplies) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOptions[0] || "",
      }));
    }
  }

  return (
    <div className="bg-white flex flex-col">
      <div className="bg-white p-4">
        {Object.entries(formFields).map(([fieldName, fieldConfig]) => {
          if (fieldConfig.type === "text" || fieldConfig.type === "number") {
            return (
              <input
                key={fieldName}
                type={fieldConfig.type}
                name={fieldName}
                placeholder={fieldConfig.placeholder}
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-blue-300"
                value={formData[fieldName as keyof T] || ""}
                onChange={handleInputChange}
              />
            );
          } else if (fieldConfig.type === "select" && fieldConfig.options) {
            return (
              <select
                key={fieldName}
                name={fieldName}
                className="w-full h-14 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-blue-300 overflow-y-hidden"
                value={
                  multiplies
                    ? (formData[fieldName as keyof T] as string[]) || []
                    : (formData[fieldName as keyof T] as string) || ""
                }
                onChange={handleSelectChange}
                multiple={multiplies}
              >
                {fieldConfig.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Form;
