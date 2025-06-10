export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Validar el cuerpo de la solicitud contra el esquema proporcionado
        next();
    } catch (error) {
        return res
            .status(400)
            .json(error.errors.map((error) => error.message)); // Si hay un error de validación, enviar un mensaje de error
    }
}