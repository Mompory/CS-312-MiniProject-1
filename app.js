const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;
const blogs = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { blogs: blogs });
});

app.post('/create', (req, res) => {
    const blog = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        date: new Date()
    };
    blogs.push(blog);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const blogId = req.params.id;
    const blog = blogs[blogId];
    res.render('edit', { blog: blog, id: blogId });
});

app.post('/edit/:id', (req, res) => {
    const blogId = req.params.id;
    blogs[blogId] = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        date: blogs[blogId].date
    };
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const blogId = req.params.id;
    blogs.splice(blogId, 1);
    res.redirect('/');
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
