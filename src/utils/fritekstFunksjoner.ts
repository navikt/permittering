export const splittOppFritekst = (fritekst: string) => {
    const textParts: any = {};
    if (fritekst.substring(0, 1) !== '\n') {
        fritekst = '\n' + fritekst;
    }
    const blokker = fritekst.split('\n##');
    blokker.forEach(blokk => {
        if (blokk.length > 0) {
            const blokkLines = blokk.split('\n');
            const headLine = blokkLines.shift();
            if (headLine) {
                const key = headLine.trim().toLowerCase();
                textParts[key] = blokkLines.join('\n').trimStart();
            }
        }
    });
    return textParts;
};
export const mergeFritekst = (felter: any) => {
    const fritekst: string[] = [];
    Object.keys(felter).forEach(key => {
        let headline = '\n## ' + key.toUpperCase().trim();
        let body = felter[key].trimStart();
        fritekst.push(headline + '\n' + body);
    });
    return fritekst.join('');
};
