import { CardItemInterface } from "@/interfaces/Card.interface";
import React, { createContext, useState, useContext } from "react";

interface GlobalContextType {
  optionHeader: string;
  setOptionHeader: React.Dispatch<React.SetStateAction<string>>;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  infosModal: CardItemInterface | undefined;
  setInfosModal: React.Dispatch<
    React.SetStateAction<CardItemInterface | undefined>
  >;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider: React.FC = ({ children }) => {
  const [optionHeader, setOptionHeader] = useState<string>("menu");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
  const [infosModal, setInfosModal] = useState<CardItemInterface | undefined>(
    undefined
  );

  return (
    <GlobalContext.Provider
      value={{
        optionHeader,
        setOptionHeader,
        isOpenModal,
        setIsOpenModal,
        infosModal,
        setInfosModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
