import { useGlobalContext } from "@/contexts/GlobalContext";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function ItemDetailsMenuData({}) {
  const { infosModal, setInfosModal, isOpenModal, setIsOpenModal } =
    useGlobalContext();
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-white z-20 flex justify-center items-center border rounded-lg shadow-lg">
      {infosModal ? (
        <>
          <div className="bg-slate-600 h-full w-full">
            <Image
              className="w-full h-full"
              src={infosModal.image}
              width={1000}
              height={1000}
              alt="Picture of the author"
            />
          </div>
          <div className=" flex flex-col justify-center h-full ">
            <div className="flex flex-row w-fit items-center rounded-full bg-primary bg-opacity-60 border px-2 py-1">
              <div className="w-2 h-2 bg-primary rounded-full "></div>

              <p
                className={`text-brown-dark font-semibold ${inter.className} pl-2`}
              >
                {infosModal.category}
              </p>
            </div>

            <h1
              className={`text-2xl text-gray-800 font-bold mb-2 ${inter.className}`}
            >
              {infosModal.titleProduct}
            </h1>

            <h2 className={`text-sm text-gray-600 mb-4 ${inter.className}`}>
              {infosModal.description}
            </h2>

            <p
              className={`text-green-500 text-lg font-bold  ${inter.className}`}
            >
              R$ {infosModal.price.toFixed(2)}
            </p>
          </div>
        </>
      ) : undefined}
    </div>
  );
}
