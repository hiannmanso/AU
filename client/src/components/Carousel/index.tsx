import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MenuCarouselProps } from "../../interfaces/Menu.interface";
import axios from "axios";

function Carousel({
  data,
  setSelectedItemData,
  inputData,
  setInputsData,
  setIsNewItem,
  type,
}: MenuCarouselProps & { type: "menus" | "products" | "categories" }) {
  const sliderRef = useRef<Slider>(null);
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  function deleteItem(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/${type}/${id}`)
        .then(function (response) {
          console.log("Item deleted successfully:", response);
        })
        .catch(function (err) {
          console.error("Error deleting item:", err);
        });
    } else {
      console.log("Deletion cancelled.");
    }
  }

  function editItemData(item: any) {
    console.log("DATAA", inputData, item);
    if (type == "menus") {
      const itemDetails = {
        name: item.name,
        description: item.description,
        type: item.type,
        id: item.id,
      };
      setInputsData(itemDetails);
      setSelectedItemData(
        "MenuProduct" in item
          ? item.MenuProduct.map((menuItem: any) => menuItem.productId)
          : []
      );
    } else if (type == "categories") {
      console.log("AQUI ENTROU", item);
      const itemDetails = {
        name: item.name,
        description: item.description,

        id: item.id,
      };
      setInputsData(itemDetails);
      setSelectedItemData(
        "Product" in item ? item.Product.map((product: any) => product.id) : []
      );
    } else if (type == "products") {
      const itemDetails = {
        name: item.name,
        description: item.description,
        category: item.categoryId,
        image: item.image,
        price: item.price,
        id: item.id,
      };
      setInputsData(itemDetails);
    }

    if (currentItem === item.id) {
      // Se o mesmo item for clicado novamente, desmarca
      setCurrentItem(null);
      setIsNewItem(true);
      setInputsData({
        name: "",
        description: "",
        type: [],
      });
      setSelectedItemData([]);
    } else {
      // Se for um novo item clicado, marca o item
      setCurrentItem(item.id);
      setIsNewItem(false);
    }
  }

  return (
    <div className="bg-whiteDefault">
      <div className="relative">
        <Slider
          ref={sliderRef}
          dots={false}
          infinite
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
        >
          {data &&
            data.map((item: any, index: number) => {
              return (
                <div key={index} className="mb-2">
                  <div
                    className={`opacity-95 px-1 py-2 m-1 rounded-lg shadow-md h-full ${
                      currentItem === item.id ? "bg-blue-100" : "bg-white"
                    }`}
                    onClick={() => {
                      editItemData(item);
                    }}
                  >
                    <h1 className="text-lg font-bold mb-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {item.name}
                    </h1>
                    {type === "menus" ? (
                      <p className="text-sm mb-1 line-clamp-2">{`Type: ${item.type}`}</p>
                    ) : type === "products" ? (
                      <p className="text-sm mb-1 line-clamp-2">{`${item.category.name}`}</p>
                    ) : type === "categories" ? (
                      <p className="text-sm mb-1 line-clamp-2">{`itens:${item.Product.length}`}</p>
                    ) : undefined}
                    <div>
                      <p
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        x
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-400 bg-opacity-65 px-2 py-1 rounded-full shadow-md text-white hover:scale-105"
          onClick={() => {
            if (sliderRef.current) {
              sliderRef.current.slickPrev();
            }
          }}
        >
          &larr;
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-slate-400 bg-opacity-65 px-2 py-1 rounded-full shadow-md text-white hover:scale-105 font-bold"
          onClick={() => {
            if (sliderRef.current) {
              sliderRef.current.slickNext();
            }
          }}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default Carousel;
