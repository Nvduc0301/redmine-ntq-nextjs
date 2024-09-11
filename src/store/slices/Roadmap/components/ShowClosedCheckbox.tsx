
import { RootState } from "@/store/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTempShowClosed } from "../tempSettingsSlice";

const ShowClosedCheckbox: React.FC = () => {
  const dispatch = useDispatch();
  const tempShowClosed = useSelector((state: RootState) => state.tempSettings.tempShowClosed);

  return (
    <label className="flex items-end">
      <input
        type="checkbox"
        checked={tempShowClosed}
        onChange={(e) => dispatch(setTempShowClosed(e.target.checked))}
        className="mr-2 mt-3 flex items-center"
      />
      Show completed versions
    </label>
  );
};

export default ShowClosedCheckbox;
