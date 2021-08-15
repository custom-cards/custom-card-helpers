import { PropertyPart } from "lit";
interface LongPressElement extends Element {
    longPress?: boolean;
    repeat?: number | undefined;
    isRepeating?: boolean | undefined;
    hasDblClick?: boolean | undefined;
}
export declare const longPressBind: (element: LongPressElement) => void;
export declare const longPress: () => (part: PropertyPart) => void;
export {};
