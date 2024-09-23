
import axios from "axios"
import express from "express"
const app = express();
const port = process.env.PORT || 3002;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/registered-people',async (req, res) => {
    const data = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=3A39DgbIsM-pTbWWa-TrVtc9zHhDHI2NcE6SBFkB0GXOuxeJlFhH2fECy4dKy94o0R3oMXHNH0CyYWwfxLYUc82POJE2D4Kim5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDXlhD_Sebk6HwlkdA69-usva486RdJ3u2sHDXXsjY5uGzdKLlPZahv8bmEPWfkk39frQeVGAH9JKoQWWlAaI41SXt-DB4EKLg&lib=MCsJ75VcviBxllE5tWbvYEJxeXXwTpFvz')
    console.log(data.data)
    res.render('registered-people',{tableData :data.data});
});

app.get('/problem-statements', (req, res) => {
    res.render('problem-statements');
});


app.get('/problem/:id', (req, res) => {
    
    res.send(`Problem Statement ${req.params.id} details page`);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});