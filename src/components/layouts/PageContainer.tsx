import { ReactNode } from "react";
import classes from "./PageContainer.module.css";

interface ChildrenProps {
  children?: ReactNode;
}

const PageContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <div className={classes.pageContainer}>{children}</div>;
};

export default PageContainer;
