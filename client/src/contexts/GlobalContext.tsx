import React, { createContext, useState, useContext, ReactNode } from "react";
import { CardItemInterface } from "@/interfaces/Card.interface";

interface GlobalContextType {
  optionHeader: string;
  setOptionHeader: React.Dispatch<React.SetStateAction<string>>;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  infosModal: CardItemInterface | undefined;
  setInfosModal: React.Dispatch<
    React.SetStateAction<CardItemInterface | undefined>
  >;
  menuOptions: any;
  setMenuOptions: React.Dispatch<React.SetStateAction<any>>;
  optionSelected: string;
  setOptionSelected: React.Dispatch<React.SetStateAction<string>>;
  listedProducts: any[];
  setListedProducts: React.Dispatch<React.SetStateAction<any>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [optionHeader, setOptionHeader] = useState<string>("menu");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [infosModal, setInfosModal] = useState<CardItemInterface | undefined>(
    undefined
  );
  const [menuOptions, setMenuOptions] = useState("");
  const [optionSelected, setOptionSelected] = useState("");
  const [listedProducts, setListedProducts] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        optionHeader,
        setOptionHeader,
        isOpenModal,
        setIsOpenModal,
        infosModal,
        setInfosModal,
        menuOptions,
        setMenuOptions,
        optionSelected,
        setOptionSelected,
        listedProducts,
        setListedProducts,
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
