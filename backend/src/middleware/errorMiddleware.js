const handleError = (err, req, res, next) => {
    console.log("error handler ran...")
    res.status(err.status || 500).json({
        message: err.message || "An error occurred...",
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
};

module.exports = handleError;
