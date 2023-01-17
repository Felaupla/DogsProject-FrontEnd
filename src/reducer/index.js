import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  GET_DETAIL,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.allDogs; //Using state.allDogs againts state.dogs, every time I apply a filter, state.dogs will change, but I'll still have all the dogs saved in my state.allDogs, so I'll be able to change filters without having to reload the page.
      const temperamentFiltered =
        action.payload === "all"
          ? allDogs
          : allDogs.filter((el) => {
              if (typeof el.temperament === "string")
                return el.temperament.includes(action.payload);
              if (Array.isArray(el.temperament)) {
                let temps = el.temperament.map((el) => el.name);
                return temps.includes(action.payload);
              }
              return true;
            });
      return {
        ...state,
        dogs: temperamentFiltered,
      };
    case FILTER_BY_ORIGIN:
      const all = state.allDogs;
      const originFiltered =
        action.payload === "all"
          ? all
          : action.payload === "created"
          ? all.filter((el) => el.createdInDb)
          : all.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: originFiltered,
      };
    case SORT_BY_NAME:
      const sortedName =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedName,
      };

    case SORT_BY_WEIGHT:
      const sortedWeight =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              return parseInt(a.weight) - parseInt(b.weigh);
            })
          : state.dogs.sort(function (a, b) {
              return parseInt(b.weight) - parseInt(a.weight);
            });
      return {
        ...state,
        dogs: sortedWeight,
      };

    case "POST_DOG":
      return {
        ...state,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
