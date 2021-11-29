import { JsonObj } from 'src/util/object';


export class Type {
    static fromJSON(jsonObj: JsonObj<Type>){
        if (jsonObj === undefined)
            return;
        return new Type(
            jsonObj.type
        )
    }
    constructor(
        public type?: any
    ) {}
}
