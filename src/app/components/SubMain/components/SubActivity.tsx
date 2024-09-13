import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "~/app/store";
import { activityItems } from "~/const/Project";
import { setFilters, FilterState } from "~/features/issues/filterSlice";

type ActivityItem = {
  id: string;
  name: keyof FilterState;
  label: string;
};

const SubActivity: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const filters = useSelector((state: RootState) => state.filter as FilterState);

  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleLabelClick = (name: string) => {
    const updatedFilters = {
      ...localFilters,
      showIssues: false,
      showChangesets: false,
      showDocuments: false,
      showFiles: false,
      showWikiEdits: false,
      showTimeEntries: false,
      [name]: true,
    };
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));

    const projectName = location.state?.projectName;
    navigate(location.pathname, { state: { projectName } });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Update Redux store with local state when "Apply" is clicked
    dispatch(setFilters(localFilters));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-[#666] text-sm mt-3.5 mb-2.5">Activity</h3>
      <ul className="text-xs">
        {activityItems.map((item: ActivityItem) => (
          <li key={item.id} className="flex items-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
            <input type="checkbox" id={item.id} name={item.name} checked={localFilters[item.name]} onChange={handleCheckboxChange} />
            <label htmlFor={item.id} onClick={() => handleLabelClick(item.name)}>
              <button type="button">{item.label}</button>
            </label>
          </li>
        ))}
      </ul>
      <input
        className="hover:bg-[#ccccbb] text-xs text-[#222222] bg-[#f2f2f2] border border-[#cccccc] py-0.5 px-1.5 my-3"
        type="submit"
        value="Apply"
      />
    </form>
  );
};

export default SubActivity;
