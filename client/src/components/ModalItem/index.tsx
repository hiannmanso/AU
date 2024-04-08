import { useGlobalContext } from "@/contexts/GlobalContext";
import { CardItemInterface } from "@/interfaces/Card.interface";
import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import ItemDetailsMenuData from "./ItemDetailsMenuData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function ModalItem() {
  const { infosModal, setInfosModal, isOpenModal, setIsOpenModal } =
    useGlobalContext();
  console.log(infosModal);
  return (
    <>
      {isOpenModal && (
        <>
          <div
            className="fixed inset-0 z-20 backdrop-filter backdrop-blur-sm"
            onClick={() => setIsOpenModal(!isOpenModal)}
          ></div>
          <ItemDetailsMenuData />
        </>
      )}
    </>
  );
}
