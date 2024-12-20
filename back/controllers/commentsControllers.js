const comments = require('../models/commentsModel');

exports.createComments = async (req, res) => {
  try {
    const { commentsname } = req.body;

    // Verificar si el commentsname ya existe
    const existingComments = await Comments.findOne({ commentsname });
    if (existingComments) {
      return res.status(400).json({ error: 'The commentsname already exists, please try another one' });
    }

    const newComments = newComments(req.body);
    const comments = await newComments.save();
    res.status(201).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve todos los vouchers almacenados en la base de datos.
exports.getAllCommentss = async (req, res) => {
  try {
    const commentss = await comments.find();
    res.status(200).json(commentss);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene y devuelve 
exports.getComments = async (req, res) => {
  try {
    const comments = await comments.findById(req.params.id);
    if (!comments) return res.status(404).json({ error: 'comments not found' });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un registro
exports.updateComments = async (req, res) => {
  try {
    const comments = await comments.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!comments) return res.status(404).json({ error: 'comments not found' });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un registro
exports.deleteComments = async (req, res) => {
  try {
    const comments = await comments.findByIdAndDelete(req.params.id);
    if (!comments) return res.status(404).json({ error: 'comments not found' });
    res.status(200).json({ message: 'comments deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

