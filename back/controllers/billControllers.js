const bill = require('../models/billModel');

exports.createbill = async (req, res) => {
  try {
    const { billname } = req.body;

    // Verificar si el billname ya existe
    const existingBill = await Bill.findOne({ billname });
    if (existingBill) {
      return res.status(400).json({ error: 'The billname already exists, please try another one' });
    }

    const newBill = newBill(req.body);
    const bill = await newBill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve todos los vouchers almacenados en la base de datos.
exports.getAllBills = async (req, res) => {
  try {
    const bills = await bill.find();
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve 
exports.getBill = async (req, res) => {
  try {
    const bill = await bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: 'bill not found' });
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un registro
exports.updateBill = async (req, res) => {
  try {
    const bill = await bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bill) return res.status(404).json({ error: 'bill not found' });
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un registro 
exports.deleteBill = async (req, res) => {
  try {
    const bill = await bill.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ error: 'bill not found' });
    res.status(200).json({ message: 'bill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

