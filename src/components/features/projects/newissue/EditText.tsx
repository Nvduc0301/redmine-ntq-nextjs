import React, { useRef } from 'react';
import images from '~/assets/img';
import {
  BUTTON_DATA,
  CUSTOM_FRONT,
  CUSTOM_TEXT,
  TEXT_NAME,
  TEXT_VALUE,
} from './const';

interface DescriptionInputProps {
  description: string;
  setDescription: (value: string) => void;
}
const DescriptionInput: React.FC<DescriptionInputProps> = ({
  description,
  setDescription,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (
    currentLine: string,
    formatText: string,
    format: string
  ) => {
    let prefix = '';

    if ([TEXT_NAME.H1, TEXT_NAME.H2, TEXT_NAME.H3].includes(formatText)) {
      return `${format}${currentLine.replace(/^(h1\.|h2\.|h3\.)\s*/, '')}`;
    }

    if ([TEXT_NAME.ListDot, TEXT_NAME.ListNum].includes(formatText)) {
      prefix = formatText === TEXT_NAME.ListDot ? '* ' : '# ';
    } else if (
      formatText === TEXT_NAME.Quote ||
      formatText === TEXT_NAME.RemoveQuote
    ) {
      return currentLine.startsWith('>')
        ? currentLine.replace(/^>\s*/, '')
        : `>${currentLine}`;
    }

    return `${prefix}${currentLine}`;
  };
  const updateTextValueChange = (
    TextValueChange: string,
    formatText: string,
    format: string,
    startPos: number,
    endPos: number,
    currentLineStart: number,
    currentLineEnd: number,
    currentLine: string
  ): string => {
    if (CUSTOM_FRONT.includes(formatText)) {
      const updatedLine = applyFormat(currentLine, formatText, format);
      return `${TextValueChange.slice(0, currentLineStart)}${updatedLine}${TextValueChange.slice(currentLineEnd === -1 ? TextValueChange.length : currentLineEnd)}`;
    } else if (CUSTOM_TEXT.includes(formatText)) {
      const middleIndex = format.length / 2;
      return `${TextValueChange.slice(0, startPos)}${format.slice(0, middleIndex)}${TextValueChange.slice(startPos, endPos)}${format.slice(middleIndex)}${TextValueChange.slice(endPos)}`;
    } else {
      return `${TextValueChange.slice(0, startPos)}${format}${TextValueChange.slice(startPos)}`;
    }
  };

  const handleButtonClick = (formatText: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      let TextValueChange = description || '';
      const currentLineStart =
        TextValueChange.lastIndexOf('\n', startPos - 1) + 1;
      const currentLineEnd = TextValueChange.indexOf('\n', startPos);
      const currentLine = TextValueChange.slice(
        currentLineStart,
        currentLineEnd === -1 ? TextValueChange.length : currentLineEnd
      );
      const format = TEXT_VALUE[formatText as keyof typeof TEXT_VALUE];
      TextValueChange = updateTextValueChange(
        TextValueChange,
        formatText,
        format,
        startPos,
        endPos,
        currentLineStart,
        currentLineEnd,
        currentLine
      );
      setDescription(TextValueChange);
      const formatLength =
        TEXT_VALUE[formatText as keyof typeof TEXT_VALUE]?.length;
      const cursorPos = startPos + formatLength / 2;
      setTimeout(() => {
        textarea.selectionStart = cursorPos;
        textarea.selectionEnd = cursorPos;
        textarea.focus();
      }, 0);
    }
  };

  return (
    <div className="mb-2">
      <span>
        <div className="flex flex-wrap gap-2.5">
          <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 ">
            Description
          </label>
          {BUTTON_DATA.map((button) => (
            <button
              key={button.id}
              style={{ backgroundImage: `url(${button.backgroundImage})` }}
              className="w-4 h-4 bg-cover bg-center border-none cursor-pointer mr-1 p-1 border border-gray-300 bg-gray-200 bg-no-repeat"
              onClick={() => handleButtonClick(button.formatText)}
            ></button>
          ))}
        </div>
        <div>
          <textarea
            className=" p-1 border border-gray-300 w-full h-[170px]"
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </span>
    </div>
  );
};

export default DescriptionInput;
