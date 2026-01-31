const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const readFile = () => {
    try {
        const fileData = fs.readFileSync('data.json');
        return JSON.parse(fileData);
    } catch (error) {
        console.log(error);
        return false;
    }
}

app.get('/get-data', async (req, res) => {
    try {
        const data = readFile();
        if (data) {
            return res.status(200).json({ data });
        } else {
            return res.status(400).json({ message: "currently no data in db", data: [] })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send('got error');
    }
})

app.post('/post-data', async (req, res) => {
    try {
        let data = readFile();
        if (data) {
            let arr = data.users;
            arr.push(req.body);
            let jsonData = JSON.stringify({ users: arr });
            const response = fs.writeFileSync('data.json', jsonData);
            return res.status(200).json({ data: JSON.parse(jsonData) });
        } else {
            let firstData = JSON.stringify({ users: [req.body] })
            const response = fs.writeFileSync('data.json', firstData);
            return res.status(400).json({ message: "currently no data in db", data: [] })
        }
    } catch (error) {

    }
})

app.put('/update', async (req, res) => {
    try {
        let data = readFile();
        if (data) {
            let arr = data.users;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].email == req.body.email) {
                    arr[i].name = req.body.name;
                }
            }

            let jsonData = JSON.stringify({ users: arr });
            const response = fs.writeFileSync('data.json', jsonData);
            return res.status(200).json({ data: JSON.parse(jsonData) });
        } else {
            return res.status(400).json({ message: "currently no data in db", data: [] })
        }
    } catch (error) {

    }
})

app.listen(5000, () => {
    console.log('app is running on 5000')
})
