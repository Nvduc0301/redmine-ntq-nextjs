export interface IOptionSelect {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface SelectProps {
  name?: string;
  value: string | string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IOptionSelect[];
  label?: string;
  className?: string;
  ariaLabel?: string;
  placeholder?: string;
  size?: number;
  multiple?: boolean;
  defaultValue?: string | string[];
}
