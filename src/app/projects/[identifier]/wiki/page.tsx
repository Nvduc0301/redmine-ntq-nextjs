'use client';

import Link from 'next/link';
import Image from 'next/image';

import images from '~/assets/img';
import FileUpload from '~/utils/UploadFile';
import { useState } from 'react';
const buttonStyle =
  'border border bg-primary-sub_bg text-13 mt-2.5 mr-1 p-1 hover:bg-[#c3c2c2] ';
const Wiki = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [files, setFiles] = useState<{ file: File; description: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).map((file) => ({
        file,
        description: '',
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDescriptionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = [...files];
    newFiles[index].description = event.target.value;
    setFiles(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5 ">
        <h2 className="text-xl text-[#555] font-medium">Wiki</h2>
        <div className="flex items-center gap-1 text-11">
          <Link
            href="/projects/fresher-_-reactjs-fresher/wiki/Wiki/edit"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <Image src={images.edit} alt="edit" />
            <span>Edit</span>
          </Link>
          <Link
            href="/watchers/watch?object_id=112&amp;object_type=wiki_page"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <Image src={images.favowiki} alt="favowiki" />
            <span>Watch</span>
          </Link>
          <Link
            href="/projects/fresher-_-reactjs-fresher/wiki/Wiki"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <Image src={images.remove} alt="remove" />
            <span>Delete</span>
          </Link>
          <Link
            href="/projects/fresher-_-reactjs-fresher/wiki/Wiki/history"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <Image src={images.history} alt="history" />
            <span>History</span>
          </Link>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-1 text-xs">
          <Link
            className="flex item-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
            href="/attachments/download/43934/12345.jpg"
          >
            <Image src={images.attachment} alt="attachment" />
            <span>12345.jpg</span>
          </Link>
          <span className="">(47.6 KB)</span>
          <Link
            href="/attachments/43934/12345.jpg"
            className="w-4"
            rel="attachments"
            title="12345.jpg"
          >
            <Image src={images.preview} alt="preview" />
          </Link>
          <span className="text-[#888]">
            Dung Nguyen Van 6 (Internship), 07/15/2024 02:04 PM
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Link
            className="flex item-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
            href="/attachments/download/43934/12345.jpg"
          >
            <Image src={images.attachment} alt="attachment" />
            <span>ui-icons.png</span>
          </Link>
          <span className="">- sssss (4.44 KB)</span>
          <Link
            href="/attachments/43934/12345.jpg"
            className="w-4"
            rel="attachments"
            title="12345.jpg"
          >
            <Image src={images.preview} alt="preview" />
          </Link>
          <span className="text-[#888]">
            Son (internship) Nguyen Hoang Huu, 07/29/2024 09:41 AM
          </span>
        </div>

        <div className="flex items-center gap-1 w-fit m-2.5 p-1.5 border border-[#ccc]">
          <Link
            href="/attachments/43934/12345.jpg"
            className=""
            rel="thumbnails"
            title="12345.jpg"
          >
            <Image alt="12345" src={images.imgwiki} width="180" />
          </Link>
          <Link
            href="/attachments/43996/ui-icons.png"
            className=""
            rel="thumbnails"
            title="ui-icons.png-sssss"
          >
            <Image alt="Ui-icons" src={images.iconswiki} width="180" />
          </Link>
        </div>

        <Link
          className="flex item-center gap-1 my-3 text-xs text-[#169] hover:underline hover:text-[#b2290f]"
          href="#"
          onClick={() => setShowUpload(true)}
        >
          New file
        </Link>
        {showUpload && (
          <>
            <FileUpload
              files={files}
              handleDescriptionChange={handleDescriptionChange}
              handleRemoveFile={handleRemoveFile}
              handleFileChange={handleFileChange}
            />
            <button className={buttonStyle} type="submit">
              Add
            </button>
            <button className={buttonStyle}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Wiki;
