import { Type } from './type.model';


export class Poke {
    constructor(
        public id?: number,
        public name?: string,
        public types?: Array<Type>,
        public image?: any,
        public stats?: any,
        public weight?: number,
        public height?: number
    ) {}
}
