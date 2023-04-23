declare function generateKeys(firstNote: string, lastNote: string): {
    key: string;
    midi: number;
    isBlack: boolean;
    x: number;
}[];
export { generateKeys };
