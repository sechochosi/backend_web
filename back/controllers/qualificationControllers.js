const qualification = require('../models/qualificationModel');

exports.createqualification = async (req, res) => {
  try {
    const { qualificationname } = req.body;

    // Verificar si el qualificationname ya existe
    const existingQualification = await Qualification.findOne({ qualificationname });
    if (existingQualification) {
      return res.status(400).json({ error: 'The qualificationname already exists, please try another one' });
    }

    const newQualification = newQualification(req.body);
    const qualification = await newQualification.save();
    res.status(201).json(qualification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve todos los vouchers almacenados en la base de datos.
exports.getAllQualifications = async (req, res) => {
  try {
    const qualifications = await qualification.find();
    res.status(200).json(qualifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve 
exports.getqualification = async (req, res) => {
  try {
    const qualification = await qualification.findById(req.params.id);
    if (!qualification) return res.status(404).json({ error: 'qualification not found' });
    res.status(200).json(qualification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un registro
exports.updateQualification = async (req, res) => {
  try {
    const qualification = await qualification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!qualification) return res.status(404).json({ error: 'qualification not found' });
    res.status(200).json(qualification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un registro
exports.deleteQualification = async (req, res) => {
  try {
    const qualification = await qualification.findByIdAndDelete(req.params.id);
    if (!qualification) return res.status(404).json({ error: 'qualification not found' });
    res.status(200).json({ message: 'qualification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

