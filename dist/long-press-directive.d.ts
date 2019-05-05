import { PropertyPart } from "lit-html";
interface LongPressElement extends Element {
    longPress?: boolean;
}
export declare const longPressBind: (element: LongPressElement) => void;
export declare const longPress: () => (part: PropertyPart) => void;
export {};
