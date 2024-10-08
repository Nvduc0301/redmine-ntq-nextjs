'use client';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { RingLoader } from 'react-spinners';
import ModalCreateVersion from '~/components/common/Modal/ModalCreateVersion';
import Image from 'next/image';
import images from '~/assets/img';

import { CreateIssue, UploadFile } from '~/services/IssueService';
import { getVersionSelect, getMembersSelect } from '~/services/ProjectService';
import { IssueData } from '~/types/Issue';
import {
  defatultValueForSeverity,
  defaultValueForBugType,
  defaultValueForOptions,
  defaultValueForQc,
  IsDegree,
  optionsForBugType,
  optionsForPriority,
  optionsForQC,
  optionsForSeverity,
  optionsForStatus,
  ratio,
  selectOptions,
} from '~/types/NewIssue';
import FileUpload from './UploadFile';
import Preview from './Preview';
import { PROJECT_ID } from '~/const/MagicConstant';
import { statusOptions } from '~/utils/MetaData';
import DescriptionInput from './EditText';
import { FileObj, GroupMemberSelect, Versions } from './types';

const NewIssuePage: React.FC = () => {
  const router = useRouter();

  const [description, setDescription] = useState<string>('');
  const [assignee, setAssignee] = useState<GroupMemberSelect>();
  const [version, setVersion] = useState<Versions[] | []>([]);
  const [files, setFiles] = useState<FileObj[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueData>();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const filesWithDesc = selectedFiles.map((file) => ({
      file,
      description: '',
    }));
    setFiles((prevFiles) => [...prevFiles, ...filesWithDesc]);
  };

  const handleDescriptionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFiles = [...files];
    updatedFiles[index].description = e.target.value;
    setFiles(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };
  useEffect(() => {
    fetchVersions();
  }, [refresh]);

  const fetchVersions = async () => {
    try {
      const versions = await getVersionSelect();
      setVersion(versions || []);
    } catch (error) {
      console.error('Error fetching versions:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const members = await getMembersSelect();
      if (members) {
        setAssignee(members);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleVersionCreated = () => {
    setRefresh((prev) => prev + 1);
    handleCloseModal();
  };
  const onSubmit: SubmitHandler<IssueData> = async (data) => {
    setLoading(true);

    const formattedData = {
      ...data,
      due_date: data.due_date
        ? moment(data.due_date).format('YYYY-MM-DD')
        : undefined,
      start_date: data.start_date
        ? moment(data.start_date).format('YYYY-MM-DD')
        : undefined,
      project_id: PROJECT_ID,
      description: description,
      // custom_fields:
    };

    try {
      const uploadAllFiles = async () => {
        try {
          const uploadPromises = files.map((fileObj) =>
            UploadFile(fileObj.file)
          );
          const tokens = await Promise.all(uploadPromises);

          // Xử lý tiếp các tokens nếu cần thiết, ví dụ thêm vào formattedData nếu cần
          // formattedData.tokens = tokens;
        } catch (error) {
          console.error('Error uploading files:', error);
          throw error;
        }
      };

      await uploadAllFiles(); // Chờ đợi quá trình upload file hoàn thành

      // Tạo issue sau khi upload file thành công
      await CreateIssue(formattedData);
      router.push('/projects/fresher-_-reactjs-fresher/issues');
    } catch (error) {
      setLoading(false);
      console.error('Error creating Issue:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <h2 className="text-gray-500 text-lg text-5 font-semibold mb-2">
            New issue
          </h2>
          {errors.subject && (
            <p className="text-red-500 text-sm w-full border-red-300 bg-orange-100 border-2 ps-4 mb-4">
              {String(errors.subject.message)}
            </p>
          )}
          <div className="bg-gray-50 text-gray-700 leading-6 border border-gray-200  pl-36 pr-24">
            <p className="mb-2 mt-2">
              <label className="text-gray-500 text-xs font-semibold mb-2">
                Tracker<span className="text-red-700"> * </span>
              </label>
              <select
                {...register('tracker_id', { required: true })}
                className="border border-gray-300 w-16 h-6 text-xs"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </p>

            <div className="mb-2 flex">
              <p className="text-gray-500 text-xs font-semibold mb-2 mr-1">
                Subject<span className="text-red-700 ms-1">*</span>
              </p>
              <input
                type="text"
                className="border border-gray-300 w-full p-1 h-6 text-xs"
                {...register('subject', {
                  required: "Subject can't be blank",
                  validate: (value) =>
                    value.trim() !== '' || 'Subject cannot be just spaces',
                })}
              />
            </div>
            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />
            <div>
              <div>
                <div className="flex justify-between mr-[180px]">
                  <div className="w-1/3">
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Status
                        <span className="text-red-700"> *</span>
                      </label>
                      <select
                        className="border border-gray-300 w-auto h-6 text-xs flex-grow"
                        {...register('status_id')}
                      >
                        {optionsForStatus.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Priority
                        <span className="text-red-700"> *</span>
                      </label>
                      <select
                        {...register('priority_id')}
                        className="border border-gray-300 w-auto h-6 text-xs flex-grow"
                      >
                        {optionsForPriority.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Assignee
                      </label>

                      <select
                        {...register('assigned_to_id')}
                        className="border border-gray-300 w-auto h-6 text-xs flex-grow"
                      >
                        {assignee?.Membership.map((opt, index) => (
                          <option key={index} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Target version
                      </label>
                      <select
                        {...register('fixed_version_id')}
                        className="border border-gray-300 w-auto h-6 text-xs flex-grow"
                      >
                        {version?.map((opt, index) => (
                          <option key={index} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <Image
                        src={images.add}
                        alt="add icon"
                        className="ms-1 right-2 h-4 cursor-pointer"
                        onClick={handleOpenModal}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Parent task
                      </label>
                      <div className="relative flex items-center">
                        <input
                          {...register('parent_issue_id')}
                          type="text"
                          className="border border-gray-300 w-full h-6 text-xs pl-8"
                          placeholder="Search..."
                        />
                        <Image
                          src={images.magnifier}
                          alt="magnifier icon"
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4"
                        />
                      </div>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Start date
                      </label>
                      <div className="relative flex items-center">
                        <Controller
                          name="start_date"
                          control={control}
                          defaultValue={new Date()}
                          render={({ field }) => (
                            <DatePicker
                              selected={
                                field.value ? new Date(field.value) : null
                              }
                              onChange={(date) => field.onChange(date)}
                              minDate={new Date()}
                              customInput={
                                <input
                                  type="text"
                                  className="border border-gray-300 w-full h-6 text-xs pl-2"
                                  placeholder="Start Date"
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

                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        due date
                      </label>
                      <div className="relative flex items-center">
                        <Controller
                          control={control}
                          name="due_date"
                          render={({ field }) => (
                            <DatePicker
                              selected={
                                field.value ? new Date(field.value) : null
                              }
                              onChange={(date) => field.onChange(date)}
                              minDate={new Date()}
                              customInput={
                                <input
                                  type="text"
                                  name="due_date"
                                  className="border border-gray-300 w-full h-6 text-xs pl-2"
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
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Estimate time
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          {...register('estimated_hours')}
                          className="p-1 border border-gray-300 w-full h-6 text-xs flex-1"
                        />
                        <span className="ml-2 text-xs">Hours</span>
                      </div>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        % Done
                      </label>
                      <div className="relative flex items-center">
                        <select
                          {...register('done_ratio')}
                          className="border border-gray-300 w-16 h-6 text-xs flex-1"
                        >
                          {ratio.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mr-[180px]">
                  <div className="w-1/3">
                    <div className="mb-2 flex">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Bug Type
                        <span className="text-red-700">*</span>
                      </label>
                      <select
                        defaultValue={defaultValueForBugType}
                        // {...register("custom_field_values[12]")}
                        className="border border-gray-300 w-auto h-6 text-xs flex-grow"
                      >
                        {optionsForBugType.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Severity
                        <span className="text-red-700">*</span>
                      </label>
                      <select
                        defaultValue={defatultValueForSeverity}
                        // {...register("custom_field_values[13]")}
                        className="border border-gray-300 w-auto h-6 text-xs flex-grow"
                      >
                        {optionsForSeverity.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        QC Activity
                        <span className="text-red-700">*</span>
                      </label>
                      <select
                        defaultValue={defaultValueForQc}
                        // {...register("custom_field_values[23]")}
                        className="border border-gray-300 w-auto h-6 text-xs flex-grow"
                      >
                        {optionsForQC.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Cause Category <span className="text-red-700"> * </span>
                      </label>
                      <select
                        defaultValue={[defaultValueForOptions]}
                        // {...register("custom_field_values[25]")}
                        className="border border-gray-300 w-3/4 h-20 text-xs p-1 rounded-md"
                        multiple
                      >
                        {selectOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Is Degrade? <span className="text-red-700"> * </span>
                      </label>
                      <select
                        // {...register("custom_field_values[62]")}
                        className="border border-gray-300 w-3/4 h-6 text-xs"
                      >
                        {IsDegree.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className="text-gray-500 text-xs font-semibold mb-2 mr-1 w-28">
                        Reopen counter <span className="text-red-700"> * </span>
                      </label>
                      <input
                        type="text"
                        defaultValue={0}
                        // {...register("custom_field_values[63]")}
                        className="border border-gray-300 w-1/4 h-6 text-xs p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <FileUpload
                  files={files}
                  handleDescriptionChange={handleDescriptionChange}
                  handleRemoveFile={handleRemoveFile}
                  handleFileChange={handleFileChange}
                />
                <div>
                  <label className="labelStyle">Watchers</label>
                  <span className="grid grid-cols-6 gap-1">
                    {assignee?.Watcher.map((item, index) => (
                      <Controller
                        key={index}
                        name={`watchers.${index}`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={field.value?.checked}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                            <label className="text-xs">{item.label}</label>
                          </div>
                        )}
                      />
                    ))}
                  </span>
                </div>
                <a className="flex items-center">
                  <Image src={images.add} className="w-4 h-3 pr-1" alt="add" />
                  <p className="text-blue-300 hover:underline hover:text-[#b2290f] text-10">
                    Search for watchers to add
                  </p>
                </a>
              </div>
            </div>
          </div>
          <button
            className="border  bg-gray-200 text-13 mt-2.5 mr-1 p-1 hover:bg-gray-450"
            type="submit"
          >
            Create
          </button>
          <button className=" border bg-gray-200 text-13 mt-2.5 mr-1 p-1 hover:bg-gray-450">
            Create and continue
          </button>
        </>
      </form>
      <a className="text-blue-300 hover:underline hover:text-red-500 text-xs">
        Preview
      </a>
      <Preview description={description} />
      {isModalVisible && (
        <ModalCreateVersion
          onClose={handleCloseModal}
          onVersionCreated={handleVersionCreated}
        />
      )}
      {loading && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      )}
    </>
  );
};

export default NewIssuePage;
