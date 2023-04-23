import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        type: 'input' | 'output';
        value?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type DevicePickerProps = typeof __propDef.props;
export declare type DevicePickerEvents = typeof __propDef.events;
export declare type DevicePickerSlots = typeof __propDef.slots;
export default class DevicePicker extends SvelteComponentTyped<DevicePickerProps, DevicePickerEvents, DevicePickerSlots> {
}
export {};
