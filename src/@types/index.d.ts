interface NodeRequire {
    <T>(path: string): T;
}

interface NodeModule {
    hot: any;
}

declare var module: NodeModule;
declare var require: NodeRequire;
declare var __DEV__: boolean;

// Material CSS/JS Extensions
interface JQuery<TElement extends Node = HTMLElement> {
    material_chip({}): void;
    collapsible(action?: string, index?: number): void;
    tabs(action?: string, id?: string): void;
}

interface Window {
    data: any;
}
