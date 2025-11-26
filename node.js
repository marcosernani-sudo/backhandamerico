require('dotenv').config();
// GET all products
app.get('/products', async (req, res) => {
try {
const { data, error } = await supabase.from(TABLE).select('*').order('id', { ascending: true });
if (error) throw error;
res.json(data);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});


// GET product by id
app.get('/products/:id', async (req, res) => {
const id = req.params.id;
try {
const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
if (error) return res.status(404).json({ error: 'Produto não encontrado' });
res.json(data);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});


// POST create product
app.post('/products', async (req, res) => {
const { name, price, description, category, stock } = req.body;
try {
const { data, error } = await supabase.from(TABLE).insert([{ name, price, description, category, stock }]).select();
if (error) throw error;
res.status(201).json(data[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});


// PUT update product
app.put('/products/:id', async (req, res) => {
const id = req.params.id;
const updates = req.body;
try {
const { data, error } = await supabase.from(TABLE).update(updates).eq('id', id).select();
if (error) throw error;
if (!data || data.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });
res.json(data[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});


// DELETE product
app.delete('/products/:id', async (req, res) => {
const id = req.params.id;
try {
const { data, error } = await supabase.from(TABLE).delete().eq('id', id).select();
if (error) throw error;
if (!data || data.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });
res.json({ deleted: true, product: data[0] });
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`BackEnd rodando na porta ${PORT}`));