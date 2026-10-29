

export class StringUtils{
    static extractPrice(rawTest: String):number{
        const match = rawTest.replace(/[^0-9.]/g, '');
        return parseFloat(match);
    }

    static generateRandomZip():string{
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
}