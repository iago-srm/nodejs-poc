export interface ProductConstructorParams {
    id: string,
    name: string,
    description: string,
    image: string,
    category: string,
    specialOffer: string,
    discount: number
}

export class Product {
    public id: string;
    private name: string;
    private description: string;
    private image: string;
    private category: string;
    private specialOffer: string;
    private discount: number;
    

    constructor(args: Partial<ProductConstructorParams>) {
        this.id = args.id || "";
        this.name = args.name || "";
        this.description = args.description|| "";
        this.image = args.image || "";
        this.category = args.category || "";
        this.specialOffer = args.specialOffer || "";
        this.discount = args.discount || 0;

    }

    validateDiscount() {
        if(this.discount > 100) throw new Error();
    }

}