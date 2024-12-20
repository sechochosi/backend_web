const voucher = require('../models/voucherModel');

exports.createVoucher = async (req, res) => {
  try {
    const { vouchername } = req.body;

    // Verificar si el vouchername ya existe
    const existingVoucher = await Voucher.findOne({ vouchername });
    if (existingVoucher) {
      return res.status(400).json({ error: 'The vouchername already exists, please try another one' });
    }

    const newVoucher = new Voucher(req.body);
    const voucher = await newVoucher.save();
    res.status(201).json(voucher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve todos los vouchers almacenados en la base de datos.
exports.getAllVouchers = async (req, res) => {
  try {
    const vouchers = await voucher.find();
    res.status(200).json(vouchers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve 
exports.getVoucher = async (req, res) => {
  try {
    const voucher = await voucher.findById(req.params.id);
    if (!voucher) return res.status(404).json({ error: 'voucher not found' });
    res.status(200).json(voucher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un registro
exports.updateVoucher = async (req, res) => {
  try {
    const voucher = await voucher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!voucher) return res.status(404).json({ error: 'voucher not found' });
    res.status(200).json(voucher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un registro
exports.deleteVoucher = async (req, res) => {
  try {
    const voucher = await voucher.findByIdAndDelete(req.params.id);
    if (!voucher) return res.status(404).json({ error: 'voucher not found' });
    res.status(200).json({ message: 'voucher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

