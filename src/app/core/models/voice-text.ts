import { BaseModel } from "./base-model";

export class VoiceText extends BaseModel<VoiceText>{
      text: string;
      from: VoiceTextFrom;
}

export enum VoiceTextFrom {
      Numbers = "Numbers",
      Alphabets = "Alphabets",
      EnglishWords = "EnglishWords",
      EnglishWordsWithImg = "EnglishWordsWithImg"
}