import React from 'react';

const SubProject = () => {
  return (
    <form className="flex flex-col ">
      <h3 className="text-black-200 font-semibold text-sm mt-3.5 mb-2.5">
        Projects
      </h3>
      <label className="text-black-500 text-xs" htmlFor="view">
        <input id="view" type="checkbox" className="mr-2" />
        View closed projects
      </label>
      <input
        type="submit"
        value="Apply"
        className="w-max my-3 text-xs border border-gray-700 bg-gray-250 text-black-700 py-0.5 px-1.5"
      />
    </form>
  );
};

export default SubProject;
