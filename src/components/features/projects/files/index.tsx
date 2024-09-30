import Link from 'next/link';
import images from '~/assets/img';
import Image from 'next/image';

const FilesPage = () => {
  return (
    <div>
      <h2 className="text-xl text-gray-500 mb-2.5 font-medium">Files</h2>
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-blue-800 hover:underline hover:text-red-600 border border-gray-350">
              <Link
                href="/projects/fresher-_-reactjs-fresher/files?sort=filename%3Adesc"
                className="sort asc"
              >
                File
              </Link>
            </th>
            <th className="text-blue-800 hover:underline hover:text-red-600 border border-gray-350">
              <Link href="/projects/fresher-_-reactjs-fresher/files?sort=created_on%3Adesc%2Cfilename">
                Date
              </Link>
            </th>
            <th className="text-blue-800 hover:underline hover:text-red-600 border border-gray-350">
              <Link href="/projects/fresher-_-reactjs-fresher/files?sort=size%3Adesc%2Cfilename">
                Size
              </Link>
            </th>
            <th className="text-blue-800 hover:underline hover:text-red-600 border border-gray-350">
              <Link href="/projects/fresher-_-reactjs-fresher/files?sort=downloads%3Adesc%2Cfilename">
                D/L
              </Link>
            </th>
            <th className="border border-gray-350">MD5</th>
            <th className="border border-gray-350"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="file odd">
            <td className="text-blue-800 hover:underline hover:text-red-600 border border-gray-350 text-center">
              <Link href="/attachments/download/43995/ui-icons.png" title="">
                ui-icons.png
              </Link>
            </td>
            <td className="border border-gray-350 text-center">
              07/29/2024 08:34 AM
            </td>
            <td className="border border-gray-350 text-center">4.44 KB</td>
            <td className="border border-gray-350 text-center">1</td>
            <td className="border border-gray-350 text-center">
              7a9bc1a997e59f957fe466059ca9b5b6
            </td>
            <td className="border border-gray-350 text-center">
              <Link
                href="/attachments/43995"
                data-confirm="Are you sure?"
                data-method="delete"
                rel="nofollow"
              >
                <Image alt="Delete" src={images.remove} />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FilesPage;
