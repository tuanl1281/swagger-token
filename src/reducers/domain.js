import types from 'actions/types';

const INITIAL_STATE = {
  selectedDomain: undefined,
  domainList: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SELECT_DOMAIN:
      return {
        ...state,
        selectedDomain: action.payload,
      };
    case types.CREATE_DOMAIN: {
      const newestDomain = action.payload;
      const newestDomainList = Array
        .from(state.domainList);

        return {
        ...state,
        domainList: [...newestDomainList, newestDomain],
      };
    }
    case types.UPDATE_DOMAIN: {
      const newestDomain = action.payload;
      const newestDomainList = Array
        .from(state.domainList)
        .reduce((result, element) => {
          if (element?.id === newestDomain?.id) {
            return [...result, newestDomain];
          }
          return [...result, element];
        }, []);

      return {
        ...state,
        domainList: newestDomainList,
      };
    }
    case types.DELETE_DOMAIN: {
      const newestDomain = action.payload;
      const newestDomainList = Array
        .from(state.domainList)
        .filter((element) => element?.id !== newestDomain?.id);
      return {
        ...state,
        domainList: newestDomainList,
      };
    }
    case types.CREATE_TOKEN: {
      const newestToken = action.payload;
      const newestDomainList = Array
      .from(state.domainList)
      .reduce((result, element) => {
        if (element?.id === newestToken?.domainId) {
          const newestDomain = {
            ...element,
            tokenList: [...element.tokenList, newestToken],
          };
          return [...result, newestDomain];
        }
        return [...result, element];
      }, []);

      return {
        ...state,
        domainList: newestDomainList,
      };
    }
    case types.UPDATE_TOKEN: {
      const newestToken = action.payload;
      const newestDomainList = Array
      .from(state.domainList)
      .reduce((result, element) => {
        if (element?.id === newestToken?.domainId) {
          const newestTokenList = Array
          .from(element.tokenList)
          .reduce((_result, _element) => {
            if (_element?.id === newestToken?.id) {
              return [..._result, newestToken];
            }
            return [..._result, _element];
          }, []);

          const newestDomain = {
            ...element,
            tokenList: newestTokenList,
          };
          return [...result, newestDomain];
        }
        return [...result, element];
      }, []);

      return {
        ...state,
        domainList: newestDomainList,
      };
    }
    case types.DELETE_TOKEN: {
      const newestToken = action.payload;
      const newestDomainList = Array
      .from(state.domainList)
      .reduce((result, element) => {
        if (element?.id === newestToken?.domainId) {
          const newestTokenList = Array
          .from(element.tokenList)
          .filter((_element) => _element?.id !== newestToken?.id);

          const newestDomain = {
            ...element,
            tokenList: newestTokenList,
          };
          return [...result, newestDomain];
        }
        return [...result, element];
      }, []);

      return {
        ...state,
        domainList: newestDomainList,
      };
    }
    case types.SET_FAVORITE_TOKEN: {
      const newestToken = action.payload;
      const newestDomainList = Array
      .from(state.domainList)
      .reduce((result, element) => {
        if (element?.id === newestToken?.domainId) {
          const newestTokenList = Array
          .from(element.tokenList)
          .reduce((_result, _element) => {
            if (_element?.id === newestToken?.id) {
              return [..._result, { ...newestToken, isFavorite: true }];
            }
            return [..._result, { ..._element, isFavorite: false }];
          }, []);

          const newestDomain = {
            ...element,
            tokenList: newestTokenList,
          };
          return [...result, newestDomain];
        }
        return [...result, element];
      }, []);

      return {
        ...state,
        domainList: newestDomainList,
      };
    }
    default:
      return state;
  }
}
