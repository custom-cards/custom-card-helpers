import { LocalizeFunc } from "../translations/localize";
export default function relativeTime(dateObj: Date, localize: LocalizeFunc, options?: {
    compareTime?: Date;
    includeTense?: boolean;
}): string;
