const { createCanvas } = require('canvas');
const moment = require('moment');

const generateBlocks = () => {
    const firstDay = moment().subtract(1, 'year').weekday(0);
    const lastDay = moment();
    const blocks = [];
    for (let day = firstDay; day.isBefore(lastDay); day = day.add(1, 'day')) {
        blocks.push({
            date: moment(day),
            id: day.unix(),
            value: 0,
        });
    }
    return blocks;
}

module.exports = (data) => {
    data = data.slice(0, data.length - 1).map(item => parseInt(item, 10));
    const colors = ['#FFEE4A', '#FFC500', '#FE9602', '#952c00'];
    const sum = data.reduce((p, item) => p + item, 0);
    const average = Math.floor(sum / data.length);
    
    const blocks = generateBlocks();

    const thred1 = average / 3 * 2;
    const thred2 = average / 3 * 3;
    const thred3 = average / 3 * 4;
    const thred4 = average / 3 * 5;

    blocks.forEach((block, index) => {
        const key = data.length - blocks.length + index;
        block.value = key >= 0 && key < data.length ? data[key] : 0;
        if (block.value >= thred1 && block.value < thred2) {
            block.color = colors[0];
        } else if (block.value >= thred2 && block.value < thred3) {
            block.color = colors[1];
        } else if (block.value >= thred3 && block.value < thred4) {
            block.color = colors[2];
        } else if (block.value > thred4) {
            block.color = colors[3];
        }
        if (!block.color) {
            block.color = '#ebedf0';
        }
    });

    const canvas = createCanvas(775, 110);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 820, 110);

    ctx.fontStyle = 'bold 12px Arial';
    ctx.fillStyle = '#767676';
    ctx.fillText('Mon', 5, 38);
    ctx.fillText('Wed', 5, 62);
    ctx.fillText('Fri', 5, 88);

    blocks.forEach((block, index) => {
        const column = Math.floor(index / 7);
        const row = index % 7;
        const x = column * 14 + 5 + 25;
        const y = row * 13 + 15;
        ctx.fillStyle = block.color;
        ctx.fillRect(x, y, 10, 10);
        if (
            row === 0 && column > 0
            && blocks[index - 7].date.month() !== blocks[index].date.month()
        ) {
            ctx.fontStyle = 'bold 12px Arial';
            ctx.fillStyle = '#767676';
            ctx.fillText(
                ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][block.date.month()],
                x, 10
            )
        }
    });

    return canvas.toBuffer('image/png');
}
