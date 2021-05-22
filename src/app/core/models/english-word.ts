import { BaseModel } from "./base-model";

export class EnglishWords extends BaseModel<EnglishWords> {
      data: Array<EnglishWord>;
}

export class EnglishWord extends BaseModel<EnglishWord> {
      alphabet: string;
      items: Array<string>;
}