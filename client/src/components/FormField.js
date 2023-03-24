import React from "react";

const FormField = ({
  labelName,
  name,
  type,
  value,
  isSurpriseMe,
  handleChange,
  placeholder,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-900">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold bg-[#ececf1] px-2 py-1 rounded-[5px] text-black text-sm"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        className="bg-gray-50 text-gray-800 text-sm rounded-lg border border-gray-300 focus:outline-[#4649ff] outline-none block w-full p-3"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;

// 4-08-2022 chatter
