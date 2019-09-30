const { createCanvas } = require('canvas');
const fs = require('fs');
const moment = require('moment');

const generateBlocks = () => {
    const firstDay = moment().subtract(1, 'year').weekday(0);
    const lastDay = moment();
    const blocks = [];
    for (let day = firstDay; day.isBefore(lastDay); day = day.add(1, 'day')) {
        blocks.push({
            date: moment(day),
            id: day.unix(),
            color: '#ebedf0',
            value: 0,
        });
    }
    return blocks;
}

module.exports = (data) => {
    const colors = ['#fb9b72', '#f27641', '#ca460f', '#952c00'];
    const max = Math.max(...data);

    const blocks = generateBlocks();

    blocks.forEach((block, index) => {
        block.value = data[index] || 0;
        if (block.value) {
            const level = Math.floor(block.value / (max / 4));
            block.color = colors[level];
        }
    });

    const canvas = createCanvas(750, 100);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 820, 100);

    blocks.forEach((block, index) => {
        const column = Math.floor(index / 7);
        const row = index % 7;
        const x = column * 14 + 5;
        const y = row * 13 + 5;
        ctx.fillStyle = block.color;
        ctx.fillRect(x, y, 10, 10);
    });

    return canvas.toBuffer('image/png');
}
