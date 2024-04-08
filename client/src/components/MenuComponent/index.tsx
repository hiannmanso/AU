import CardItem from "../CardItem";

export default function MenuComponent() {
  return (
    <div className="m-auto w-4/5 py-14 px-10 flex flex-wrap gap-6 items-center justify-start">
      <CardItem
        data={{
          titleProduct: "Title Pizza",
          description:
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit... There is no one who loves pain itself,who seeks after it and wants to have it, simply because it is pain..",
          image:
            "https://t3.ftcdn.net/jpg/06/27/23/56/360_F_627235669_iz0O2leKYRzjxAKdFP7odpp9eCOZREtN.jpg",
          price: 20.0,
          category: "Lunch",
        }}
      />
      <CardItem
        data={{
          titleProduct: "Title Pizza",
          description:
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit... There is no one who loves pain itself,who seeks after it and wants to have it, simply because it is pain..",
          image:
            "https://img.freepik.com/fotos-gratis/hamburguer-saboroso-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1063.jpg?size=626&ext=jpg",
          price: 20.0,
          category: "Lunch",
        }}
      />
    </div>
  );
}
