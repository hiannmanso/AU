import Image from "next/image";
import { CardItemInterface } from "../../interfaces/Card.interface";
import { useGlobalContext } from "../../contexts/GlobalContext";
export default function CardItem({ data }: { data: CardItemInterface }) {
  const { isOpenModal, setIsOpenModal, setInfosModal } = useGlobalContext();

  return (
    <div
      className="w-[250px] sm:w-[300px] h-[400px] shadow-md bg-white box-border hover:cursor-pointer"
      onClick={() => {
        setIsOpenModal(!isOpenModal);
        setInfosModal(data);
      }}
    >
      <div>
        <img
          className="w-[300px] h-[250px]"
          src={
            data.image
              ? data.image
              : "https://static.thenounproject.com/png/526867-200.png"
          }
          alt="No image available"
          width={300}
          height={250}
        />
      </div>
      <div className="p-5">
        <h1 className="font-bold h-5 overflow-hidden">{data.titleProduct}</h1>
        <h2 className="text-sm h-5 overflow-hidden my-2">{data.description}</h2>
        <p className="text-primary flex justify-end mt-10">${data.price}</p>
      </div>
    </div>
  );
}
