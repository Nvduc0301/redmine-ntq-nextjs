import { RootState } from "@/store/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTempShowTask } from "../tempSettingsSlice";

const ShowTaskCheckbox: React.FC = () => {
  const dispatch = useDispatch();
  const tempShowTask = useSelector((state: RootState) => state.tempSettings.tempShowTask);

  return (
    <label className="flex items-center">
      <input type="checkbox" checked={tempShowTask} onChange={(e) => dispatch(setTempShowTask(e.target.checked))} className="mr-2 mb-1" />
      Task
    </label>
  );
};

export default ShowTaskCheckbox;
