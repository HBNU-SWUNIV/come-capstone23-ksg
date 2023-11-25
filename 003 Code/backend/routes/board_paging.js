const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

let boards = JSON.parse(fs.readFileSync('../data/board.json', 'utf8'));

// 게시글을 id 기준으로 내림차순 정렬
boards.sort((a, b) => b.id - a.id);

app.get('/api/boardlist', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedItems = boards.slice(startIndex, endIndex);
    const totalPages = Math.ceil(boards.length / limit);

    res.json({
        items: paginatedItems,
        totalPages: totalPages
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
