import { memo, PropsWithChildren, SetStateAction } from 'react';

import * as FormItemStyled from './FormItem.style';

interface ToggleInputProps {
  id: string;
  value: boolean;
  setValue: (value: SetStateAction<boolean>) => void;
}

function ToggleInput({
  id,
  value,
  setValue,
  children,
}: PropsWithChildren<ToggleInputProps>) {
  const changeValue = () => {
    setValue(!value);
  };

  return (
    <FormItemStyled.ToggleInputContainer>
      <input
        id={id}
        hidden
        type="checkbox"
        checked={value}
        onChange={changeValue}
      />
      <label htmlFor={id}>{children}</label>
    </FormItemStyled.ToggleInputContainer>
  );
}

export default memo(ToggleInput);
