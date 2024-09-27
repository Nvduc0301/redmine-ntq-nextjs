import React, { useRef } from 'react';
import images from '~/assets/img';
import {
  ButtonData,
  customFront,
  customText,
  textName,
  textValue,
} from '~/types/NewIssue';
const textColor = 'text-primary-text_gray';
const labelStyle = `${textColor} text-xs font-semibold mb-2 mr-1 `;

const buttonData: ButtonData[] = [
  {
    id: 1,
    backgroundImage: images.newissue_strong,
    formatText: textName.Strong,
  },
  {
    id: 2,
    backgroundImage: images.newissue_italic,
    formatText: textName.Italic,
  },
  {
    id: 3,
    backgroundImage: images.newissue_underline,
    formatText: textName.Underline,
  },
  {
    id: 4,
    backgroundImage: images.newissue_delete,
    formatText: textName.Delete,
  },
  {
    id: 5,
    backgroundImage: images.newissue_inlinecode,
    formatText: textName.InlineCode,
  },
  { id: 6, backgroundImage: images.newissue_heading1, formatText: textName.H1 },
  { id: 7, backgroundImage: images.newissue_heading2, formatText: textName.H2 },
  { id: 8, backgroundImage: images.newissue_heading3, formatText: textName.H3 },
  { id: 9, backgroundImage: images.newissue_ul, formatText: textName.ListDot },
  { id: 10, backgroundImage: images.newissue_ol, formatText: textName.ListNum },
  { id: 11, backgroundImage: images.newissue_bq, formatText: textName.Quote },
  {
    id: 12,
    backgroundImage: images.newissue_bq_remove,
    formatText: textName.RemoveQuote,
  },
  { id: 13, backgroundImage: images.newissue_pre, formatText: textName.Pre },
  { id: 14, backgroundImage: images.newissue_link, formatText: textName.Link },
  { id: 15, backgroundImage: images.newissue_img, formatText: textName.Image },
  { id: 16, backgroundImage: images.newissue_help, formatText: '' },
];
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

    if ([textName.H1, textName.H2, textName.H3].includes(formatText)) {
      return `${format}${currentLine.replace(/^(h1\.|h2\.|h3\.)\s*/, '')}`;
    }

    if ([textName.ListDot, textName.ListNum].includes(formatText)) {
      prefix = formatText === textName.ListDot ? '* ' : '# ';
    } else if (
      formatText === textName.Quote ||
      formatText === textName.RemoveQuote
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
    if (customFront.includes(formatText)) {
      const updatedLine = applyFormat(currentLine, formatText, format);
      return `${TextValueChange.slice(0, currentLineStart)}${updatedLine}${TextValueChange.slice(currentLineEnd === -1 ? TextValueChange.length : currentLineEnd)}`;
    } else if (customText.includes(formatText)) {
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
      const format = textValue[formatText as keyof typeof textValue];
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
        textValue[formatText as keyof typeof textValue]?.length;
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
          <label className={labelStyle}>Description</label>
          {buttonData.map((button) => (
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
            className=" p-1 border border-primary-border w-full h-[170px]"
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
