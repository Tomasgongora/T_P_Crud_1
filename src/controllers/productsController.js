const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writejson = (products) => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8")
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render("products", {
			products, 
			toThousand,
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const {id} = req.params
		const product = products.find(product => product.id === +id)
		res.render("detail", {
		product,
		toThousand,
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, price, discount, category, description} = req.body
		const id = Math.max(...products.map(el => el.id))
        const newProduct = {
			id : id + 1,
			name,
			price,
			discount,
			category,
			description,
			image : "default-image.png"
		}
		products.push(newProduct)
		writejson(products)
		res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const {id} = req.params
		const productToEdit = products.find(product => product.id === +id)
		res.render("product-edit-form", {
			productToEdit
		})
		
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {id} = req.params
		const product = products.find(product => product.id === +id)
		if(!product){
			return res.send("No existe ese producto")
		}
		const {name, price, discount, category, description} = req.body
		products.forEach(product => {
			if(product.id == id){
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.description = description,
				product.category = category
			}
		});
		writejson(products)
		res.redirect("/products")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const productId = Number(req.params.id);

		products.forEach( product => {
			if(product.id === productId){
				const productToDestroy = products.indexOf(product);
				products.splice(productToDestroy, 1)
			}
		})
		writejson(products)
		res.send("El producto fue eliminado")
	}
};

module.exports = controller;