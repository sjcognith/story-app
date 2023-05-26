import React, { Component, ChangeEvent } from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class Input extends Component<InputProps> {
  render() {
    const { placeholder, value, type, onChange } = this.props;

    return (
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="w-full p-4 text-lg border-2 border-neutral-500 rounded-md outline-none text-black focus:border-sky-700 focus:border-2 transition"
      />
    );
  }
}

export default Input;
