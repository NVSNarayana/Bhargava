import { BaseModel } from "./base-model";

export class EnglishWords extends BaseModel<EnglishWords> {
      data: Array<EnglishWord>;
}

export class EnglishWord extends BaseModel<EnglishWord> {
      alphabet: string;
      items: Array<EnglishWordItem>;
}

export class EnglishWordItem extends BaseModel<EnglishWordItem> {
      text: string;
      img: string;
}

export class EnglishWordWithImg extends BaseModel<EnglishWordWithImg> {
      alphabet: string;
      text: string;
      img: string;
}