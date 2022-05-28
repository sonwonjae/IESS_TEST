import { maxLength } from '@constants/maxSize';
import {
  ChangeEventHandler,
  memo,
  PropsWithChildren,
  SetStateAction,
} from 'react';

import * as FormItemStyled from './FormItem.style';

interface TextInputProps {
  id: string;
  type?: 'text' | 'textarea';
  placeholder: string;
  required?: boolean;
  value: string;
  setValue: (value: SetStateAction<string>) => void;
}

function TextInput({
  id,
  type = 'text',
  placeholder,
  required = false,
  value,
  setValue,
  children,
}: PropsWithChildren<TextInputProps>) {
  const changeValue: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormItemStyled.TextInputContainer>
      {type === 'text' ? (
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={changeValue}
          maxLength={maxLength}
        />
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={changeValue}
        />
      )}
      <label htmlFor={id}>{children}</label>
    </FormItemStyled.TextInputContainer>
  );
}

export default memo(TextInput);
