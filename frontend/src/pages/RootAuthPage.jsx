import { ScrollRestoration } from "react-router-dom";

const RootAuthPage = ({ children }) => {
  return (
    <>
      {children}
      <ScrollRestoration />
    </>
  );
};

export default RootAuthPage;
