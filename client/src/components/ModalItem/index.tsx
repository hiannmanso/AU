import { useGlobalContext } from "@/contexts/GlobalContext";
import { CardItemInterface } from "@/interfaces/Card.interface";
import React, { useState } from "react";

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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white z-20 flex justify-center items-center border rounded-lg shadow-lg">
            <h1 className="text-gray-800">Modal Content</h1>
          </div>
        </>
      )}
    </>
  );
}
