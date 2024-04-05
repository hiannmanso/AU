import { Inter } from "next/font/google";
import { useState } from "react";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Header() {
  const [optionHeader, setOptionHeader] = useState("menu");
  const [options, setOptions] = useState([
    "All",
    "Breakfast",
    "Lunch",
    "Coctails",
    "Dinner",
    "COISA AQ",
  ]);
  const [optionSelected, setOptionSelected] = useState("All");
  return (
    <div className="w-screen h-32 flex flex-col items-center justify-between pt-11 shadow-sm overflow-x-auto">
      <div className="font-bold text-4xl tracking-widest flex flex-row items-center gap-3 ">
        <div
          className={
            optionHeader == "menu"
              ? `flex flex-col items-center`
              : "flex flex-col items-center  opacity-10 hover:opacity-100 cursor-pointer text-2xl transition-opacity"
          }
          onClick={() => {
            setOptionHeader("menu");
            setOptions(["All", "Breakfast", "Lunch", "Coctails", "Dinner"]);
            setOptionSelected("All");
          }}
        >
          <h1 className={`${inter.className} pb-0`}>Menu</h1>
          <span
            className={`inline-block border-b-2 border-primary ${
              optionHeader === "settings" ? "w-0" : "w-4/6"
            } pt-1 transition-width duration-500`}
          ></span>
        </div>
        <div
          className={
            optionHeader == "settings"
              ? `flex flex-col items-center`
              : "flex flex-col items-center  opacity-10 hover:opacity-100 cursor-pointer text-2xl transition-opacity"
          }
          onClick={() => {
            setOptionHeader("settings");
            setOptions(["Product", "Category", "Menu"]);
            setOptionSelected("Product");
          }}
        >
          <h1 className={`${inter.className} pb-0`}>Settings</h1>
          <span
            className={`inline-block border-b-2 border-primary ${
              optionHeader === "menu" ? "w-0" : "w-4/6"
            } pt-1 transition-width duration-500`}
          ></span>
        </div>
      </div>
      <div className="flex flex-row gap-0 sm:gap-4 text-sm text-primary font-bold ">
        {options ? (
          options.map((option, index) => {
            return (
              <div
                key={index}
                className={
                  optionSelected === option
                    ? "bg-primary text-white px-2 pt-1 rounded-sm border-r-amber-50 transition-opacity transition delay-100"
                    : "px-2 pt-1 opacity-80 hover:cursor-pointer hover:opacity-100 transition-opacity transition delay-100"
                }
                onClick={() => {
                  setOptionSelected(option);
                }}
              >
                <h2>{option}</h2>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
