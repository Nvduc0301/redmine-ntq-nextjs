import React from 'react';
import { textValue } from '~/types/NewIssue';

interface PreviewProps {
  description: string;
}

const Preview: React.FC<PreviewProps> = ({ description }) => {
  const renderDescription = (desc: string) => {
    const lines = desc.split('\n').map((line, index) => {
      if (line.startsWith(textValue.H1))
        return (
          <h1 className="text-2xl font-bold" key={index}>
            {line.slice(textValue.H1.length)}
          </h1>
        );
      if (line.startsWith(textValue.H2))
        return (
          <h2 className="text-xl font-semibold" key={index}>
            {line.slice(textValue.H2.length)}
          </h2>
        );
      if (line.startsWith(textValue.H3))
        return (
          <h3 className="text-lg font-medium" key={index}>
            {line.slice(textValue.H3.length)}
          </h3>
        );
      if (line.startsWith(textValue.ListNum))
        return (
          <li className="list-decimal ml-4" key={index}>
            {line.slice(textValue.ListNum.length)}
          </li>
        );
      if (line.startsWith(textValue.Quote))
        return (
          <blockquote
            className="border-l-4 border-gray-400 pl-4 italic"
            key={index}
          >
            {line.slice(textValue.Quote.length)}
          </blockquote>
        );

      // Handling inline formats using regex
      let formattedLine = line;
      if (
        formattedLine.startsWith(textValue.ListDot) &&
        !formattedLine.slice(textValue.ListDot.length).trim().endsWith('*')
      ) {
        return (
          <li className="list-disc ml-4" key={index}>
            {formattedLine.slice(textValue.ListDot.length)}
          </li>
        );
      }
      // Bold (Strong)
      formattedLine = formattedLine.replace(
        /\*([^*]+)\*/g,
        (match, p1) => `<strong class="font-bold">${p1}</strong>`
      );

      // Italic
      formattedLine = formattedLine.replace(
        /_([^_]+)_/g,
        (match, p1) => `<em class="italic">${p1}</em>`
      );

      // Underline
      formattedLine = formattedLine.replace(
        /\+([^+]+)\+/g,
        (match, p1) => `<span class="underline decoration-solid">${p1}</span>`
      );

      // Strikethrough (Delete)
      formattedLine = formattedLine.replace(
        /-([^-]+)-/g,
        (match, p1) => `<del class="line-through">${p1}</del>`
      );

      // Inline Code
      formattedLine = formattedLine.replace(
        /@([^@]+)@/g,
        (match, p1) => `<code class="bg-gray-200 p-1 font-mono">${p1}</code>`
      );

      // Preformatted Text
      formattedLine = formattedLine.replace(
        /<pre>([^<]+)<\/pre>/g,
        (match, p1) =>
          `<pre class="bg-gray-200 p-2 font-mono whitespace-pre-wrap">${p1}</pre>`
      );

      // Links
      formattedLine = formattedLine.replace(
        /\[\[([^\]]+)\]\]/g,
        (match, p1) =>
          `<a href="${p1}" class="text-red-500 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">${p1}</a>`
      );

      // Images
      formattedLine = formattedLine.replace(
        /!([^!]+)!/g,
        (match, p1) => `<img src="${p1}"  class="max-w-full h-auto" />`
      );

      return (
        <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
    return <div>{lines}</div>;
  };

  return (
    <fieldset className="preview mt-4 p-4 border border-gray-300 bg-gray-50">
      <legend className="text-sm font-medium">Description</legend>
      {renderDescription(description)}
    </fieldset>
  );
};

export default Preview;
