import { ExctractedFilterFieldENG, ExctractedFilterFieldRU } from "./types";

interface ReviewProps {
  author: string;
  publishedAt: string;
  score: string;
  text: string;
}
export interface ProductProps {
  id: string;
  categories: CategoryTypes[];
  price: string;
  score: string;
  title: string;
  description: string;
  reviews: ReviewProps[];
  photos: string[];
  publishedAt?: string;
}

export interface SliderValuesProps {
  min: number;
  max: number;
}

export interface FilterValueProps {
  price: SliderValuesProps;
  score: SliderValuesProps;
  categories: CategoryTypes[];
  sortingType: string;
  query: string;
}

export type CategoryTypes =
  | "Игрушки для детей"
  | "Настольные игры"
  | "Модели и конструкторы"
  | "Творчество и рукоделие"
  | "Автозапчасти"
  | "Автохимия"
  | "Аксессуары для автомобилей"
  | "Мотоциклы и скутеры"
  | "Косметика"
  | "Парфюмерия"
  | "Уход за кожей"
  | "Здоровое питание"
  | "Витамины и добавки"
  | "Спортивная одежда"
  | "Спортивное оборудование"
  | "Туризм и активный отдых"
  | "Велосипеды"
  | "Игры на свежем воздухе"
  | "Мебель"
  | "Кухонные принадлежности"
  | "Декор"
  | "Садовые инструменты"
  | "Товары для животных"
  | "Мужская одежда"
  | "Женская одежда"
  | "Детская одежда"
  | "Обувь"
  | "Аксессуары"
  | "Смартфоны"
  | "Ноутбуки"
  | "Телевизоры"
  | "Аудио и видео"
  | "Гаджеты";

export type TranslatedFfiltersProps = {
  [key in ExctractedFilterFieldRU]: ExctractedFilterFieldENG;
};
