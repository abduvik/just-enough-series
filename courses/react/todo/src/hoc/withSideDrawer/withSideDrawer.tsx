import { ComponentProps, ElementType } from "react";
import { useAppState } from "../../custom-hooks/useAppState";
import classes from "./withSideDrawer.module.scss";

export const withSideDrawer =
  (Component: ElementType) => (props: ComponentProps<typeof Component>) => {
    const { appState } = useAppState();

    return appState.isDrawerOpen ? (
      <div className={classes.WithSideDrawer}>
        <Component {...props} />
      </div>
    ) : null;
  };
