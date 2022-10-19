import { createContext, useContext, useState } from "react";

const initialState = {
  showEdit: false,
  editTodoId: -1,
};

const AppState = createContext<any>({});

export const useAppState = () => useContext(AppState);

export const withAppState = (Component: any) => {
  return (props: any) => {
    const appState = useAppState();
    return <Component appState={appState} {...props} />;
  };
};

export const AppStateProvider = ({ children }: any) => {
  const [appState, setAppState] = useState(initialState);

  const state = { ...appState };

  const setState = (updatedState: any) => {
    setAppState((currentState) => ({
      ...currentState,
      ...updatedState,
    }));
  };

  return (
    <AppState.Provider value={{ state, setState }}>
      {children}
    </AppState.Provider>
  );
};
