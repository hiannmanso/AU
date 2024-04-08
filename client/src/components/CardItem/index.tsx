import Image from "next/image";
import { CardItemInterface } from "../../interfaces/Card.interface";
import { useGlobalContext } from "../../contexts/GlobalContext";
export default function CardItem({ data }: { data: CardItemInterface }) {
  const { isOpenModal, setIsOpenModal, setInfosModal } = useGlobalContext();
  return (
    <div
      className="w-[250px] sm:w-[300px] h-[450px] shadow-md bg-white box-border hover:cursor-pointer md:hover:scale-110"
      onClick={() => {
        setIsOpenModal(!isOpenModal);
        setInfosModal(data);
      }}
    >
      <div>
        <Image
          className="w-[300px] h-[250px]"
          src={data.image}
          width={300}
          height={250}
          alt="Picture of the author"
        />
      </div>
      <div className="p-5">
        <h1 className="font-bold">{data.titleProduct}</h1>
        <h2 className="text-sm overflow-y-hidden h-28 my-2">
          {data.description}
        </h2>
        <p className="text-primary flex justify-end">${data.price}</p>
      </div>
    </div>
  );
}
