import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import './ModalDetail.css';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import images from '~/assets/img';
import { CreateVersion } from '~/services/VersionService ';
import moment from 'moment';

const textSize = 'text-xs';
const label = 'text-right font-bold block text-gray-700 w-1/3 pr-4';
const buttonStyle =
  'border border bg-primary-sub_bg text-13 mt-2.5 mr-1 p-1 hover:bg-[#c3c2c2] ';

const statusOptions = [
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
  { label: 'Locked', value: 'locked' },
];

const sharingOptions = [
  { label: 'Not shared', value: 'none' },
  { label: 'With subprojects', value: 'descendants' },
  { label: 'With project hierarchy', value: 'hierarchy' },
  { label: 'With project tree', value: 'tree' },
];

type ModalCreateVersionProps = {
  onClose: () => void;
  onVersionCreated: () => void;
};

type FormData = {
  name: string;
  description: string;
  status: string;
  wiki_page_title: string;
  due_date: Date;
  sharing: string;
};

const ModalCreateVersion: React.FC<ModalCreateVersionProps> = ({
  onClose,
  onVersionCreated,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const dataBody = {
      ...data,
      due_date: moment(data.due_date).format('YYYY-MM-DD'),
    };
    try {
      await CreateVersion(dataBody);
      onVersionCreated();
    } catch (error) {
      console.error('Error creating version:');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white fixed border rounded w-[600px]">
        <div className="flex justify-between items-center m-1 bg-blue-100">
          <h2
            style={{ marginRight: 'auto' }}
            className={`${textSize} p-2 text-white font-bold`}
          >
            New version
          </h2>
          <button
            className="icon bg-white w-5 h-5 rounded-sm me-1"
            onClick={onClose}
          ></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="detail p-4">
          {errors.name && (
            <p className="text-red-500 text-sm w-full border-primary-borderError bg-primary-bgError border-2 ps-4 mb-4">
              {errors.name.message}
            </p>
          )}
          <div className="border p-2 bg-primary-bg_gray">
            <div className="flex items-center mb-2">
              <div className="w-full">
                <div className="flex items-center">
                  <label className={label}>
                    Name
                    <span className="text-red-700"> *</span>
                  </label>
                  <input
                    type="text"
                    {...register('name', {
                      required: "Name can't be blank",
                      validate: (value) =>
                        value.trim() !== '' || 'Name cannot be just spaces',
                    })}
                    className="w-2/3 border rounded p-1 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <label className={label}>Description</label>
              <input
                type="text"
                {...register('description')}
                className="w-2/3 border rounded p-1 text-sm"
              />
            </div>
            <div className="flex items-center mb-2">
              <label className={label}>Status</label>
              <select
                {...register('status')}
                className="w-2/3 border rounded p-1 text-sm w-1/5"
                defaultValue={1}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center mb-2">
              <label className={label}>Wiki page</label>
              <input
                type="text"
                {...register('wiki_page_title')}
                className="w-2/3 border rounded p-1 text-sm"
              />
            </div>
            <div className="flex items-center mb-2">
              <label className={label}>Date</label>
              <div className="relative flex items-center ">
                <Controller
                  control={control}
                  name="due_date"
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      customInput={
                        <input
                          type="text"
                          name="due_date"
                          className="border border-primary-border w-full h-6 text-xs pl-2"
                          placeholder="Due Date"
                        />
                      }
                    />
                  )}
                />
                <Image
                  src={images.calendar}
                  alt="calendar icon"
                  className="absolute right-2 bottom-1/2 transform translate-y-1/2 h-4 cursor-pointer"
                  onClick={() =>
                    document
                      .querySelector<HTMLInputElement>(
                        '.react-datepicker__input-container input'
                      )
                      ?.focus()
                  }
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <label className={label}>Sharing</label>
              <div className="flex items-center w-2/3">
                <select
                  {...register('sharing')}
                  className="border rounded p-1 text-sm w-2/4"
                  defaultValue={1}
                >
                  {sharingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
            <button type="submit" className={buttonStyle}>
              Create
            </button>
            <button className={buttonStyle} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateVersion;
