'use client';

import { useRef } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

import images from '~/assets/img';
import {
  OPTION_PROJECTS,
  OPTION_ACTIVITY,
  OPTION_CATEGORY,
} from '~/const/MyPage';
import Select from '~/components/common/Select/Select';
import { MESSAGES } from './const';
import { FormValues } from './type';

const LogTimePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const datePickerRef = useRef<DatePicker>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data: ', data);
  };

  const handleMagnifierClick = () => {
    document.getElementById('issueInput')?.focus();
  };

  return (
    <div>
      <h1 className="text-gray-500 text-xl font-semibold">Spent time</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length > 0 && (
          <div className="relative text-red-800 bg-red-100 my-3 py-4 px-16 border-2 border-solid border-red-500">
            <Image
              className="absolute left-2 top-1/2 -translate-y-1/2"
              src={images.exclamation}
              alt="exclamation"
            />
            <ul className="list-disc text-start text-xs">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-2 bg-gray-400  text-xs border-1 border-solid border-gray-350 py-4 px-10 mt-3">
          <div className="flex text-end gap-2 ">
            <label className="min-w-[130px] font-bold text-gray-600 ">
              Project
            </label>
            <Controller
              name="selectedProject"
              control={control}
              defaultValue=""
              rules={{ required: MESSAGES.PROJECT_REQUIRED }}
              render={({ field }) => (
                <Select
                  className="border-1 border-solid border-gray-350 p-1"
                  ariaLabel="Project"
                  options={OPTION_PROJECTS}
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex text-end gap-2 ">
            <label className="min-w-[130px] text-gray-600 font-bold">
              Issue
            </label>
            <div className="relative z-10">
              <input
                id="issueInput"
                className="z-10 pl-5 py-1 border-1 border-solid border-gray-350 p-1"
                type="text"
                {...register('selectedIssue', {
                  required: MESSAGES.ISSUE_REQUIRED,
                })}
              />
              <Image
                onClick={handleMagnifierClick}
                className="absolute z-0 left-0.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                src={images.magnifier}
                alt="manifier"
              />
            </div>
          </div>
          <div className="flex items-center text-end gap-2 ">
            <div className="min-w-[130px]  flex justify-end items-end gap-1 font-bold">
              <label className="text-gray-600 ">Date</label>
              <span className="flex items-center text-red-700">*</span>
            </div>
            <Controller
              control={control}
              name="selectedDate"
              defaultValue={new Date()}
              render={({ field }) => (
                <div className="flex gap-1 items-center">
                  <DatePicker
                    className="border-1 border-solid border-gray-350 p-1"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    ref={datePickerRef}
                  />
                  <Image
                    src={images.calendar}
                    alt="calendar"
                    onClick={() => datePickerRef.current?.setFocus()}
                    className="cursor-pointer"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex text-end gap-2">
            <div className="min-w-[130px]  flex justify-end items-center gap-1 font-bold">
              <label className="text-gray-600 ">Hours</label>
              <span className="flex items-center text-red-700">*</span>
            </div>
            <input
              className="border-1 border-solid border-gray-350 p-1"
              type="number"
              {...register('hours', { required: MESSAGES.HOUR_REQUIRED })}
            />
          </div>
          <div className="flex text-end gap-2 ">
            <label className="min-w-[130px] text-gray-600 font-bold">
              Comment
            </label>
            <input
              className="w-full border-1 border-solid border-gray-350 p-1"
              type="text"
              {...register('comment')}
            />
          </div>
          <div className="flex text-end gap-2">
            <div className="min-w-[130px] flex justify-end items-center gap-1 font-bold">
              <label className="text-gray-600">Activity</label>
              <span className="flex items-center text-red-700">*</span>
            </div>
            <Controller
              name="selectedActivity"
              control={control}
              defaultValue=""
              rules={{ required: MESSAGES.ACTIVITY_REQUIRED }}
              render={({ field }) => (
                <Select
                  className="border-1 border-solid border-gray-350 p-1"
                  ariaLabel="Activity"
                  options={OPTION_ACTIVITY}
                  placeholder="---Please select---"
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex text-end gap-2">
            <div className="min-w-[130px] flex justify-end items-center gap-1 font-bold">
              <label className="text-gray-600">Product Category</label>
              <span className="flex items-center text-red-700">*</span>
            </div>
            <Controller
              name="selectedCategory"
              control={control}
              defaultValue=""
              rules={{ required: MESSAGES.CATEGORY_REQUIRED }}
              render={({ field }) => (
                <Select
                  className="border-1 border-solid border-gray-350 p-1"
                  ariaLabel="Category"
                  options={OPTION_CATEGORY}
                  placeholder="---Please select---"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-1 mt-3 text-xs">
          <button
            className="bg-gray-200 p-1 border-1 border-solid border-gray-700"
            type="submit"
            name="submitAndRedirect"
          >
            Create
          </button>
          <button
            className="bg-gray-200 p-1 border-1 border-solid border-gray-700"
            type="submit"
          >
            Create and continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogTimePage;
