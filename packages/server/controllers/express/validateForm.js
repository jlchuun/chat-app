const validateForm = (schema) => {
    return (req, res, next) => {
        const formData = req.body;
        schema
            .validate(formData)
            .catch(err => {
                res.status(422).send();
                console.log(err.errors);
            })
            .then(valid => {
                if (valid) {
                    console.log("Good data")
                    next();
                } else {
                    res.status(422).send();
                }
            });
    }
}

module.exports = validateForm;