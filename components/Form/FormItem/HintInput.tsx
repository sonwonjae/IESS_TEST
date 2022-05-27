import {
  ChangeEventHandler,
  KeyboardEventHandler,
  memo,
  PropsWithChildren,
  SetStateAction,
} from 'react';

import * as FormItemStyled from './FormItem.style';
import { DeleteButton } from '@components/Common';

interface HintInputProps {
  hint: string;
  setHint: (hint: SetStateAction<string>) => void;
  hints: string[];
  setHints: (hint: SetStateAction<string[]>) => void;
  checkChangedHints: (hints: string[]) => void;
}

function HintInput({
  hint,
  setHint,
  hints,
  setHints,
  checkChangedHints,
  children,
}: PropsWithChildren<HintInputProps>) {
  const changeHint: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHint(e.target.value);
  };
  const addHints: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setHint('');
      const newHints = new Set(hints);
      newHints.delete(hint);
      newHints.add(hint);

      const resultHints = [...newHints];
      setHints(resultHints);
      checkChangedHints(resultHints);
    }
  };

  return (
    <>
      <FormItemStyled.TextInputContainer>
        <label htmlFor="hint">{children}</label>
        <input
          id="hint"
          type="text"
          placeholder="답변 연상에 도움되는 힌트를 작성하세요."
          value={hint}
          onChange={changeHint}
          onKeyDown={addHints}
        />
        <FormItemStyled.Hints>
          {hints.map((hint) => {
            const deleteHint = () => {
              const resultHints = hints.filter(
                (hintsInHint) => hintsInHint !== hint
              );
              setHints(resultHints);
              checkChangedHints(resultHints);
            };
            return (
              <li key={hint}>
                <FormItemStyled.Hint>{hint}</FormItemStyled.Hint>
                <DeleteButton onClick={deleteHint} />
              </li>
            );
          })}
        </FormItemStyled.Hints>
      </FormItemStyled.TextInputContainer>
    </>
  );
}

export default memo(HintInput);
