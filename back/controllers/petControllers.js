const pet = require('../models/petModel');

exports.createpet = async (req, res) => {
  try {
    const { petname } = req.body;

    // Verificar si el petname ya existe
    const existingPet = await Pet.findOne({ petname });
    if (existingPet) {
      return res.status(400).json({ error: 'The petname already exists, please try another one' });
    }

    const newPet = newPet(req.body);
    const pet = await newPet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve todos los vouchers almacenados en la base de datos.
exports.getAllPets = async (req, res) => {
  try {
    const pets = await pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve 
exports.getPet = async (req, res) => {
  try {
    const pet = await pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'pet not found' });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un registro
exports.updatePet = async (req, res) => {
  try {
    const pet = await pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pet) return res.status(404).json({ error: 'pet not found' });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un registro
exports.deletePet = async (req, res) => {
  try {
    const pet = await pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ error: 'pet not found' });
    res.status(200).json({ message: 'pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

