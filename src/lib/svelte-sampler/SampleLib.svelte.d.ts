import { SvelteComponentTyped } from "svelte";
export declare const prerender = true;
declare const __propDef: {
    props: {
        samplesPath: any;
        startNote?: string;
        endNote?: string;
        urls: {
            [note: string]: string;
        };
        theme?: 'light' | 'grey' | 'dark';
        reverbOn?: boolean;
        inputId: any;
        /**
             * Plays a MIDI file from start to finish,
             * updating the notes being played in real time.
             * @param midiFile
             */ playMidiFile?: (midiFile: any) => Promise<void>;
        stop?: () => void;
        toggleReverb?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SampleLibProps = typeof __propDef.props;
export declare type SampleLibEvents = typeof __propDef.events;
export declare type SampleLibSlots = typeof __propDef.slots;
export default class SampleLib extends SvelteComponentTyped<SampleLibProps, SampleLibEvents, SampleLibSlots> {
    get playMidiFile(): (midiFile: any) => Promise<void>;
    get stop(): () => void;
    get toggleReverb(): () => void;
}
export {};
