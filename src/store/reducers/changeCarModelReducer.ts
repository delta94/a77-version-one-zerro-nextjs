import { IShopState } from '~/interfaces/IState';
import { ICar } from '~/interfaces/ICar';
import * as types from '~/store/types';

const initialState: IShopState = {
  cars: [],
  currentCar: <ICar>{},
  makes: [],
  categories: [],
};

export function changeCarModelReducer(
  state: IShopState = initialState,
  action: any
) {
  switch (action.type) {
    case types.CHANGE_CAR_MODEL:
      return {
        ...state,
        carModel: action.payload,
      };
    case types.GET_ALL_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    default:
      return state;
  }
}
