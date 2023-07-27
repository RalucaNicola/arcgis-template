import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageItem, isItemInLocalStorage } from '../../../utils/LocalStorage';
import { displayInfoModalDefault } from '../../../config';

export interface InfoModalOptions {
  visible?: boolean;
}

const initialValue = isItemInLocalStorage('modalVisibleOnStart')
  ? getLocalStorageItem('modalVisibleOnStart') === 'true'
  : displayInfoModalDefault;

const initialState = {
  visible: initialValue
};

const modalOptionsSlice = createSlice({
  name: 'infoModalOptions',
  initialState,
  reducers: {
    setInfoModalOptions(state, param: PayloadAction<InfoModalOptions>) {
      state.visible = param.payload.visible;
    }
  }
});

export const { setInfoModalOptions } = modalOptionsSlice.actions;
export default modalOptionsSlice.reducer;
