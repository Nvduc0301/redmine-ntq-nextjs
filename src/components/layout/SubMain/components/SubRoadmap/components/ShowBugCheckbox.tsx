import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTempShowBug } from '~/store/slices/Roadmap/tempSettingsSlice';
import { RootState } from '~/store/store';

const ShowBugCheckbox: React.FC = () => {
  const dispatch = useDispatch();
  const tempShowBug = useSelector(
    (state: RootState) => state.tempSettings.tempShowBug
  );

  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={tempShowBug}
        onChange={(e) => dispatch(setTempShowBug(e.target.checked))}
        className="mr-2 "
      />
      Bug
    </label>
  );
};

export default ShowBugCheckbox;
