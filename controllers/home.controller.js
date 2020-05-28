var exports = module.exports = {};

exports.showHomepage = (req, res) => {
    return res.render('index', { title: 'Express' });
};
