let runtimeCanvas = function() {
	let block_bg_color   = ['#bdad9f', '#eee4da', '#eee1c9', '#f3b27a', '#f69664', '#f77c5f', '#f75f3b', '#edd073', '#edd073', '#edd073', '#edd073', '#edd073'];
	let block_text_color = ['', '#776e65', '#776e65', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2'];

	let ctx = null;
	let el = null;
	let width = null;
	let height = null;
	let widthInBlocks = 24;
	let heightInBlocks = 24;
	let blockSize = -1;

    let pixels = [];
    
    var crateImg = new Image();
    crateImg.src = './img/crate.png';

    var crateGreenImg = new Image();
    crateGreenImg.src = './img/crate_green.png';

    var characterImg = new Image();
    characterImg.src = './img/char.gif';

    var crossImg = new Image();
    crossImg.src = './img/cross.gif';

	function init(element) {
		if (element && el === null) {
			el = element
		}
		ctx = el.getContext('2d');
		width = el.width;
		height = el.height;
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, width, height);
		blockSize = Math.floor(width / widthInBlocks);
	}

	function drawPixel(x, y, value) {
		if (x > widthInBlocks || x < 0 || y > heightInBlocks || y < 0) {
			return;
		}
		x = parseInt(x)
		y = parseInt(y)
		pixels[widthInBlocks*x+y] = value;

        if (value > 0) {
            DrawBlock(ctx, x, y, value);
        } else {
        	ctx.fillStyle = '#cbc1b3';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            DrawBlock(ctx, x, y, value)
        }
	}

	CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
		if (width < 2 * radius) radius = width / 2;
		if (height < 2 * radius) radius = height / 2;
		this.beginPath();
		this.moveTo(x + radius, y);
		this.arcTo(x + width, y, x + width, y + height, radius);
		this.arcTo(x + width, y + height, x, y + height, radius);
		this.arcTo(x, y + height, x, y, radius);
		this.arcTo(x, y, x + width, y, radius);
		this.closePath();
		return this;
	}

	function DrawBlock(ctx, x, y, val) {
		let left = x * blockSize;
		let top = y * blockSize;
		let font_size = blockSize / 2;
		let left_offset = blockSize / 3.2;
		let padding = blockSize / 20;

		if (2**val > 999) {
			font_size = blockSize / 4;
			left_offset = blockSize / 9;
		} else if (2**val > 99) {
			font_size = blockSize / 3;
			left_offset = blockSize / 9;
		} else if (2**val > 9) {
			left_offset = blockSize / 8;
		}

		ctx.fillStyle = block_bg_color[val];
		ctx.strokeStyle = "black";
		ctx.lineWidth = "5";

		ctx.roundRect(left+padding, top+padding, blockSize-2*padding, blockSize-2*padding, blockSize/10);
		ctx.fill();

		top_offset = font_size + (blockSize - font_size)/2
		ctx.fillStyle = block_text_color[val];
		ctx.font = font_size+"pt sans-serif";
		ctx.fillText(2**val+'', left+left_offset, top+top_offset);

	}

	function getPixel(x, y) {
		x = parseInt(x)
		y = parseInt(y)
		return pixels[widthInBlocks*x+y] | 0;
	}

	function clearCanvas(size=24) {
		widthInBlocks = size;
		heightInBlocks = size;
		init();
		for (let i = 0 ; i < widthInBlocks; i++) {
			for (let j = 0; j < heightInBlocks; j++) {
				drawPixel(i, j, 0);
			}
		}
	}

	return {
		init,
		drawPixel,
		getPixel,
		clearCanvas
	};
};
