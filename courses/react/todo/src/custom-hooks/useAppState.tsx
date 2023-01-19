import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AppStateType = {
  editTodoId: number;
  isDrawerOpen: boolean;
};

const initialState: AppStateType = {
  editTodoId: -1,
  isDrawerOpen: false,
};

export type AppStateContextType = {
  appState: AppStateType;
  setAppState: Dispatch<SetStateAction<AppStateType>>;
};

export const AppState = createContext<AppStateContextType>({
  appState: initialState,
  setAppState: () => {},
});

export const useAppState = () => useContext(AppState);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState(initialState);

  return (
    <AppState.Provider value={{ appState, setAppState }}>
      {children}
    </AppState.Provider>
  );
};
