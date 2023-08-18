import { ConfigProviderState, Action } from "./ConfigProvider";

export const ConfigProviderReducer = (state: ConfigProviderState, action: Action): ConfigProviderState => {
  switch (action.type) {
    case 'SET_PROMPT':
      return {
        ...state,
        prompt: action.payload,
      };
    case 'SET_RESPONSE':
      return {
        ...state,
        response: action.payload,
      };
    case 'SET_WORKSPACE_ID':
      return {
        ...state,
        workspaceId: action.payload,
      };
    case 'SET_ORGANIZATION_ID':
      return {
        ...state,
        organizationId: action.payload,
      };
    case 'SET_INDUSTRY':
      return {
        ...state,
        industry: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};