import {
  initialPriceState,
  initialScoreState,
} from "../pages/productList/components/filterList/constant/constant";
import {
  CategoryTypes,
  FilterValueProps,
  ProductProps,
  TranslatedFfiltersProps,
} from "../props";

export const initialProductList: ProductProps[] = [
  {
    id: "0",
    categories: [],
    price: "0",
    score: "0.0",
    title: "",
    description: "",
    reviews: [],
    photos: [],
  },
];

export const initialFilterListProps: FilterValueProps = {
  price: initialPriceState,
  score: initialScoreState,
  categories: [],
  sortingType: "unsorted",
  query: "",
};

export const categorySheet: CategoryTypes[] = [
  "Игрушки для детей",
  "Настольные игры",
  "Модели и конструкторы",
  "Творчество и рукоделие",
  "Автозапчасти",
  "Автохимия",
  "Аксессуары для автомобилей",
  "Мотоциклы и скутеры",
  "Косметика",
  "Парфюмерия",
  "Уход за кожей",
  "Здоровое питание",
  "Витамины и добавки",
  "Спортивная одежда",
  "Спортивное оборудование",
  "Туризм и активный отдых",
  "Велосипеды",
  "Игры на свежем воздухе",
  "Мебель",
  "Кухонные принадлежности",
  "Декор",
  "Садовые инструменты",
  "Товары для животных",
  "Мужская одежда",
  "Женская одежда",
  "Детская одежда",
  "Обувь",
  "Аксессуары",
  "Смартфоны",
  "Ноутбуки",
  "Телевизоры",
  "Аудио и видео",
  "Гаджеты",
];

export const TranslatedFilters: TranslatedFfiltersProps = {
  категории: "categories",
  цена: "price",
  оценка: "score",
};
