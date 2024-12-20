const carer = require('../models/carerModel');

exports.createcarer = async (req, res) => {
  try {
    const { carername } = req.body;

    // Verificar si el carername ya existe
    const existingCarer = await Carer.findOne({ carername });
    if (existingCarer) {
      return res.status(400).json({ error: 'The carername already exists, please try another one' });
    }

    const newCarer = newCarer(req.body);
    const carer = await newCarer.save();
    res.status(201).json(carer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve todos los vouchers almacenados en la base de datos.
exports.getAllCarers = async (req, res) => {
  try {
    const carers = await carer.find();
    res.status(200).json(carers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve 
exports.getCarer = async (req, res) => {
  try {
    const carer = await carer.findById(req.params.id);
    if (!carer) return res.status(404).json({ error: 'carer not found' });
    res.status(200).json(carer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un registro
exports.updateCarer = async (req, res) => {
  try {
    const carer = await carer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!carer) return res.status(404).json({ error: 'carer not found' });
    res.status(200).json(carer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un registro 
exports.deleteCarer = async (req, res) => {
  try {
    const carer = await carer.findByIdAndDelete(req.params.id);
    if (!carer) return res.status(404).json({ error: 'carer not found' });
    res.status(200).json({ message: 'carer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

