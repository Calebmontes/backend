import express, { Request, Response } from 'express';
const app = express()
app.use(express.json())

const PORT = 3000

interface Product {
    name: string;
    category: string;
}

const products: Product[] = [
    {
        name: "Samsung Galaxy",
        category: "electronics"
    },
    {
        name: "Samsung Galaxy a32",
        category: "electronics"
    },
    {
        name: "Samsung Galaxy 22",
        category: "electronics"
    },
    {
        name: "Motorola V3",
        category: "electronics"
    },
    {
        name: "Motorola V5",
        category: "electronics"
    },
    {
        name: "Iphone 12",
        category: "electronics"
    },
    {
        name: "Skippy",
        category: "grocery store"
    },
    {
        name: "producto",
        category: "grocery store"
    }
];



app.get('/products', (req: Request, res: Response) => {
    const filter = req.query.filter as string;

    const filteredProducts = products.filter(product => product.name.includes(filter));

    const suggestedProducts: Product[] = [];
    
    if (filteredProducts.length > 0) {
        const category = filteredProducts[0].category;
        const otherProductsInCategory = products.filter(product => product.category === category && !filteredProducts.includes(product));
        suggestedProducts.push(...otherProductsInCategory.slice(0, 2));
    }

    res.json({ products: filteredProducts, suggested: suggestedProducts });
});

app.listen(PORT, () =>  { 
    console.log(`servidor corriendo en puerto ${PORT}`)
} )