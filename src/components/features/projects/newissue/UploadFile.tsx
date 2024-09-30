import Image from 'next/image';
import React from 'react';
import images from '~/assets/img';

interface FileUploadProps {
  files: { file: File; description: string }[];
  handleDescriptionChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveFile: (index: number) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  handleDescriptionChange,
  handleRemoveFile,
  handleFileChange,
}) => {
  return (
    <div>
      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1">
        Files
      </label>
      <span className="text-xs">
        <div className="mt-4 max-w-1/2">
          {files.map((fileObj, index) => (
            <div key={index} className="mb-2 p-2 rounded-md flex items-center">
              <span
                className="text-sm mr-4 overflow-hidden whitespace-nowrap text-ellipsis"
                style={{ maxWidth: '150px' }}
                title={fileObj.file.name}
              >
                <input
                  type="text"
                  value={fileObj.file.name}
                  readOnly
                  className="bg-transparent border-none p-0 cursor-text w-full overflow-hidden p-1"
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                  title={fileObj.file.name}
                />
              </span>
              <input
                type="text"
                placeholder="Optional description"
                value={fileObj.description}
                onChange={(e) => handleDescriptionChange(index, e)}
                className="mr-4 p-1 border rounded-md flex-grow"
              />
              <button
                className="text-red-500 text-xs"
                onClick={() => handleRemoveFile(index)}
              >
                <Image src={images.remove} className="w-6 h-6" alt="Remove" />
              </button>
            </div>
          ))}
        </div>
        <div className="relative inline-block">
          <input
            type="file"
            id="fileInput"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            multiple
            onChange={handleFileChange}
          />
          <label className="inline-block px-3 py-0.5 border border-black rounded cursor-pointer bg-gray-200">
            Chọn tệp
          </label>
          <label>
            {files.length > 0
              ? ` có ${files.length} files được chọn `
              : ' Không files được chọn '}
          </label>
        </div>{' '}
        (Maximum size: 500 MB)
      </span>
    </div>
  );
};

export default FileUpload;
