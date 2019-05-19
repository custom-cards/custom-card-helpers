import { LocalizeFunc } from "../translations/localize";
export declare function relativeTime(dateObj: Date, localize: LocalizeFunc, options?: {
    compareTime?: Date;
    includeTense?: boolean;
}): string;
