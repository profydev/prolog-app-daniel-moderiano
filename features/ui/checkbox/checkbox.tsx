export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

export enum CheckboxState {
  checked = "checked",
  unchecked = "unchecked",
  indeterminate = "indeterminate",
}

interface CheckboxProps {
  label: string;
  name: string;
  checkboxState: CheckboxState;
  disabled: boolean;
  size: CheckboxSize;
}

export function Checkbox({
  label,
  name,
  checkboxState = CheckboxState.unchecked,
  disabled = false,
  size = CheckboxSize.md,
}: CheckboxProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        name={name}
        id={name}
        disabled={disabled}
        checked={checkboxState === CheckboxState.checked ? true : false}
      />
    </div>
  );
}
