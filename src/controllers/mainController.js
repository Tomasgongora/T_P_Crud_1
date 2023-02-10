const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		const ofertas = products.filter(product => product.category == "in-sale")
		const visitados = products.filter(product => product.category == "visited")
		res.render("index", {
			ofertas,
			visitados,
			toThousand,
			
		})
	},
	search: (req, res) => {
		// Do the magic
		const {keywords} = req.query
		const results = products.filter(product => product.name.toLowerCase() == keywords.toLowerCase())
		//res.send(keywords)
		res.render("results",{
			keywords,
			results,
			toThousand,
		})
	},
};

module.exports = controller;
