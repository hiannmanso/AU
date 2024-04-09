import { useGlobalContext } from "@/contexts/GlobalContext";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function ItemDetailsMenuData() {
  const { infosModal } = useGlobalContext();
  function isSmallScreen() {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20 border rounded-lg shadow-lg via-gray-300">
      {infosModal ? (
        <div className="w-[45rem] h-[30rem] flex justify-center">
          <div className="hidden sm:block w-1/2 h-full rounded-l-lg overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-l-lg"
              src={infosModal.image}
              alt="Product Image"
            />
          </div>

          <div
            className={`w-full h-full p-6 flex flex-col justify-center items-center gap-4 ${
              isSmallScreen() ? "sm:bg-opacity-50 bg-cover bg-center" : ""
            }`}
          >
            <div className="hidden sm:flex flex-row items-center rounded-full bg-primary bg-opacity-60 border px-2 py-1 mb-4 ">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p
                className={`text-brown-dark font-semibold ${inter.className} pl-2 text-white`}
              >
                {infosModal.category}
              </p>
            </div>

            <h1
              className={`text-2xl sm:text-2xl md:text-2xl  font-bold mb-2 text-center ${inter.className}`}
            >
              {infosModal.titleProduct}
            </h1>

            <h2
              className={`text-sm sm:text-base  overflow-y-scroll md:text-lg text-gray-600 mb-4 ${inter.className} text-center`}
            >
              {infosModal.description}
            </h2>

            <p
              className={`text-lg sm:text-xl md:text-2xl text-green-500 font-bold ${inter.className}`}
            >
              R$ {infosModal.price.toFixed(2)}
            </p>
          </div>
        </div>
      ) : undefined}
    </div>
  );
}
