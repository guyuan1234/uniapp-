import { toPx, CHAR_WIDTH_SCALE_MAP, base64ToPath, pathToBase64, isNumber  } from './utils'
import { GD } from './gradient'
let id = 0
let cache = {}
export class Draw {
	constructor(context, canvas, use2dCanvas = false, isH5PathToBase64 = false) {
		this.ctx = context
		this.canvas = canvas || null
		this.use2dCanvas = use2dCanvas
		this.isH5PathToBase64 = isH5PathToBase64
	}
	roundRect(x, y, w, h, r, fill = false, stroke = false, ) {
		if (r < 0) return
		const {ctx} = this
		ctx.beginPath()
		if(!r) {
			ctx.rect(x, y, w, h)
		} else if(typeof r === 'number' && [0,1,-1].includes(w - r * 2) &&  [0, 1, -1].includes(h - r * 2)) {
			ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 2)
		} else {
			let {
				borderTopLeftRadius: tl = r || 0,
				borderTopRightRadius: tr = r || 0,
				borderBottomRightRadius: br = r || 0,
				borderBottomLeftRadius: bl = r || 0
			} = r || {r,r,r,r}
			ctx.beginPath()
			// 右下角
			ctx.arc(x + w - br, y + h - br, br, 0, Math.PI * 0.5)
			ctx.lineTo(x + bl, y + h)
			// 左下角
			ctx.arc(x + bl, y + h - bl, bl, Math.PI * 0.5, Math.PI)
			ctx.lineTo(x, y + tl)
			// 左上角
			ctx.arc(x + tl, y + tl, tl, Math.PI, Math.PI * 1.5)
			ctx.lineTo(x + w - tr, y)
			// 右上角
			ctx.arc(x + w - tr, y + tr, tr, Math.PI * 1.5, Math.PI * 2)
			ctx.lineTo(x + w, y - br)
			
		}
		ctx.closePath()
		if (stroke) ctx.stroke()
		if (fill) ctx.fill()
	}
	measureText(text, fontSize) {
		const { ctx } = this
		// #ifndef APP-PLUS
		return ctx.measureText(text).width
		// #endif
		// #ifdef APP-PLUS
		// app measureText为0需要累加计算0
		return text.split("").reduce((widthScaleSum, char) => {
			let code = char.charCodeAt(0);
			let widthScale = CHAR_WIDTH_SCALE_MAP[code - 0x20] || 1;
			return widthScaleSum + widthScale;
		  }, 0) * fontSize;
		// #endif
	}
	setFont({fontFamily: ff = 'sans-serif', fontSize: fs = 14, fontWeight: fw = 'normal' , textStyle: ts = 'normal'}) {
		let ctx = this.ctx
		// 设置属性
		// #ifndef MP-TOUTIAO
		// fw = fw == 'bold' ? 'bold' : 'normal'
		// ts = ts == 'italic' ? 'italic' : 'normal'
		// #endif
		// #ifdef MP-TOUTIAO
		fw = fw == 'bold' ? 'bold' : ''
		ts =  ts == 'italic' ? 'italic' : ''
		// #endif
		// fs = toPx(fs)
		ctx.font = `${ts} ${fw} ${fs}px ${ff}`;
	}
	setTransform(box, {transform}) {
		const {ctx} = this
		const {
			scaleX = 1,
			scaleY = 1,
			translateX = 0,
			translateY = 0,
			rotate = 0,
			skewX = 0,
			skewY = 0
		} = transform || {}
		let {
			left: x,
			top: y,
			width: w,
			height: h
		} = box
		
		ctx.scale(scaleX, scaleY)
		//  transform(scaleX, 0, 0, scaleY, 0, 0)
		ctx.translate(
			w * (scaleX > 0 ? 1 : -1) / 2 + (x + translateX) / scaleX,  
			h * (scaleY > 0 ? 1 : -1) / 2 + (y + translateY) / scaleY) 
		
		if(rotate) {
			ctx.rotate(rotate * Math.PI / 180)
			// ctx.transform( Math.cos(a), Math.sin(a), -Math.sin(a),  Math.cos(a), 0, 0);
		}
		if(skewX || skewY) {
			ctx.transform(1, Math.tan(skewY * Math.PI/180), Math.tan(skewX * Math.PI/180), 1 , 0, 0)
			// ctx.transform(1, tanx, tany, 1, 0, 0);
		}
	}
	setBackground(bd, w, h) {
		const {ctx} = this
		if (!bd) {
			// #ifndef MP-TOUTIAO || MP-BAIDU
			ctx.setFillStyle('transparent')
			// #endif
			// #ifdef MP-TOUTIAO || MP-BAIDU
			ctx.setFillStyle('rgba(0,0,0,0)')
			// #endif
		} else if(GD.isGradient(bd)) {
			GD.doGradient(bd, w, h, ctx);
		} else {
			ctx.setFillStyle(bd)
		}
	}
	setShadow({boxShadow: bs = []}) {
		const {ctx} = this
		if (bs.length) {
			const [x, y, b, c] = bs
			ctx.setShadow(x, y, b, c)
		}
	}
	setBorder(box, style) {
		const {ctx} = this
		let {
			left: x,
			top: y,
			width: w,
			height: h
		} = box
		const {border, borderBottom, borderTop, borderRight, borderLeft, borderRadius: r, opacity = 1} = style;
		const {
			borderWidth : bw = 0,
			borderStyle : bs,
			borderColor : bc,
		} = border || {}
		const {
			borderBottomWidth : bbw = bw,
			borderBottomStyle : bbs = bs,
			borderBottomColor : bbc= bc,
		} = borderBottom || {}
		const {
			borderTopWidth: btw = bw,
			borderTopStyle: bts = bs,
			borderTopColor: btc = bc,
		} = borderTop || {}
		const {
			borderRightWidth: brw = bw,
			borderRightStyle: brs = bs,
			borderRightColor: brc = bc,
		} = borderRight || {}
		const {
			borderLeftWidth: blw = bw,
			borderLeftStyle: bls = bs,
			borderLeftColor: blc  = bc,
		} = borderLeft || {}
		
		let {
			borderTopLeftRadius: tl = r || 0,
			borderTopRightRadius: tr = r || 0,
			borderBottomRightRadius: br = r || 0,
			borderBottomLeftRadius: bl = r || 0
		} = r || {r,r,r,r}
		if(!borderBottom && !borderLeft && !borderTop && !borderRight && !border) return;
		const _borderType = (w, s, c) => {
			if (s == 'dashed') {
				// #ifdef MP
				ctx.setLineDash([Math.ceil(w * 4 / 3), Math.ceil(w * 4 / 3)])
				// #endif
				// #ifndef MP
				ctx.setLineDash([Math.ceil(w * 6), Math.ceil(w * 6)])
				// #endif
			} else if (s == 'dotted') {
				ctx.setLineDash([w, w])
			}
			ctx.setStrokeStyle(c)
		}
		const _setBorder = (x1, y1, x2, y2, x3, y3, r1, r2, p1, p2, p3,  bw, bs, bc) => {
			ctx.save()
			this.setOpacity(style)
			this.setTransform(box, style)
			ctx.lineWidth = bw
			_borderType(bw, bs, bc)
			ctx.beginPath()
			ctx.arc(x1, y1, r1, Math.PI * p1, Math.PI * p2)
			ctx.lineTo(x2, y2)
			ctx.arc(x3, y3, r2, Math.PI * p2, Math.PI * p3)
			ctx.stroke()
			ctx.restore()
		}
	
		if(border) {
			ctx.save()
			this.setOpacity(style)
			this.setTransform(box, style)
			_borderType(bw, bs, bc)
			this.roundRect(-w/2, -h/2, w, h, r, false, bc ? true : false)
			ctx.restore()
		}
		x = -w/2
		y = -h/2
		if(borderBottom) {
			_setBorder(x + w - br, y + h - br, x + bl, y + h, x + bl, y + h - bl, br, bl, 0.25, 0.5, 0.75, bbw, bbs, bbc)
		}
		if(borderLeft) {
			// 左下角
			_setBorder(x + bl, y + h - bl, x, y + tl, x + tl, y + tl, bl, tl, 0.75, 1, 1.25, blw, bls, blc)
		}
		if(borderTop) {
			// 左上角
			_setBorder(x + tl, y + tl, x + w - tr, y, x + w - tr, y + tr, tl, tr, 1.25, 1.5, 1.75, btw, bts, btc)
		}
		if(borderRight) {
			// 右上角
			_setBorder(x + w - tr, y + tr, x + w, y + h - br, x + w - br, y + h - br, tr, br, 1.75, 2, 0.25, btw, bts, btc)
		}
	}
	setOpacity({opacity = 1}) {
		this.ctx.setGlobalAlpha(opacity)
	}
	drawView(box, style) {
		const {ctx} = this
		const {
			left: x,
			top: y,
			width: w,
			height: h
		} = box
		let {
			borderRadius = 0,
			border,
			borderTop,
			borderBottom,
			borderLeft,
			borderRight,
			color = '#000000',
			backgroundColor: bg,
			rotate,
			shadow
		} = style || {}
		ctx.save()
		this.setOpacity(style)
		this.setTransform(box, style)
		this.setShadow(style)
		this.setBackground(bg, w, h)
		this.roundRect(-w/2, -h/2, w, h, borderRadius, true, false)
		ctx.restore()
		this.setBorder(box, style)
	}
	async drawImage(img, box, style) {
		await new Promise(async (resolve, reject) => {
			const {ctx} = this
			const canvas = this.canvas
			const {
				borderRadius = 0,
				mode,
				backgroundColor: bg,
			} = style
			let {
				left: x,
				top: y,
				width: w,
				height: h
			} = box
			ctx.save()
			this.setOpacity(style)
			this.setTransform(box, style)
			this.setBackground(bg, w, h)
			this.setShadow(style)
			x = -w/2
			y = -h/2
			this.roundRect(x, y, w, h, borderRadius, true, false)
			ctx.clip()
			const _modeImage = (img) => {
				// 获得图片原始大小
				let rWidth = img.width
				let rHeight = img.height
				let startX = 0
				let startY = 0
				// 绘画区域比例
				const cp = w / h
				// 原图比例
				const op = rWidth / rHeight
				if (cp >= op) {
					rHeight = rWidth / cp;
					// startY = Math.round((h - rHeight) / 2)
				} else {
					rWidth = rHeight * cp;
					startX = Math.round(((img.width || w) - rWidth) / 2)
				}
				if (mode === 'scaleToFill' || !img.width) {
					ctx.drawImage(img.src, x, y, w, h);
				} else {
					// 百度小程序 开发工具 顺序有问题 暂不知晓真机
					// #ifdef MP-BAIDU
					ctx.drawImage(img.src, x, y, w, h, startX, startY, rWidth, rHeight)
					// #endif
					// #ifndef MP-BAIDU
					ctx.drawImage(img.src, startX, startY, rWidth, rHeight, x, y, w, h)
					// #endif
				}
			}
			const _drawImage = (img) => {
				if (this.use2dCanvas) {
					const Image = canvas.createImage()
					Image.onload = () => {
						img.src = Image
						_modeImage(img)
						_restore()
					}
					Image.onerror = () => {
						console.error(`createImage fail: ${img}`)
						reject(new Error(`createImage fail: ${img}`))
					}
					Image.src = img.src
				} else {
					_modeImage(img)
					_restore()
				}
			}
			const _restore = () => {
				setTimeout(() => {
					ctx.restore()
					this.setBorder(box, style)
					resolve(true)
				}, 1000/30)
				 
			}
			 _drawImage(img)
		})
	}
	drawText(text, box, style, rules) {
		const {ctx} = this
		let {
			left: x,
			top: y,
			width: w,
			height: h,
			offsetLeft: ol = 0
		} = box
		let {
			color = '#000000',
			lineHeight = '1.4em',
			fontSize = 14,
			fontWeight,
			fontFamily,
			textStyle,
			textAlign = 'left',
			verticalAlign: va = 'top',
			backgroundColor: bg,
			maxLines,
			textDecoration: td
		} = style
		lineHeight = this.getLineHeight(lineHeight, fontSize)
		
		if (!text) return
		ctx.save()
		this.setOpacity(style)
		this.setTransform(box, style)
		x = -w/2
		y = -h/2
		ctx.setTextBaseline(va)
		this.setFont({fontFamily, fontSize, fontWeight, textStyle})
		ctx.setTextAlign(textAlign)
		if(bg) {
			this.setBackground(bg, w, h)
			this.roundRect(x, y, w, h, 1, bg)
		 }
		this.setShadow(style)
		ctx.setFillStyle(color)
		let rulesObj = {};
		if(rules) {
			if (rules.word.length > 0) {
				for (let i = 0; i < rules.word.length; i++) {
					let startIndex = 0,
						index;
					while ((index = text.indexOf(rules.word[i], startIndex)) > -1) {
						rulesObj[index] = { 
							reset: true
						};
						for (let j = 0; j < rules.word[i].length; j++) {
							rulesObj[index + j] = { 
								reset: true
							};
						}
						startIndex = index + 1;
					}
				}
			}
		}
		// 水平布局
		switch (textAlign) {
			case 'left':
				break
			case 'center':
				x += 0.5 * w
				break
			case 'right':
				x += w
				break
			default:
				break
		}
		const textWidth = this.measureText(text, fontSize)
		const actualHeight = Math.ceil(textWidth / w) * lineHeight
		let paddingTop = Math.ceil((h - actualHeight) / 2)
		if (paddingTop < 0) paddingTop = 0
		// 垂直布局
		switch (va) {
			case 'top':
				break
			case 'middle':
				y += fontSize / 2
				break
			case 'bottom':
				
				y += fontSize 
				break
			default:
				break
		}
		// 绘线
		const _drawLine = (x, y, textWidth) => {
			const { system } = uni.getSystemInfoSync()
			if(/win|mac/.test(system)){
				y += (fontSize / 3)
			}
			// 垂直布局
			switch (va) {
				case 'top':
					break
				case 'middle':
					y -= fontSize / 2 
					break
				case 'bottom':
					y -= fontSize
					break
				default:
					break
			}
			let to = x
			switch (textAlign) {
				case 'left':
					x = x
					to+= textWidth
					break
				case 'center':
					x = x - textWidth / 2
					to = x + textWidth
					break
				case 'right':
					to = x
					x = x - textWidth
					break
				default:
					break
			}
			
			if(td) {
				ctx.setLineWidth(fontSize / 13);
				ctx.beginPath();
				
				if (/\bunderline\b/.test(td)) {
					y -= inlinePaddingTop * 0.8
					ctx.moveTo(x, y);
					ctx.lineTo(to, y);
				}
				
				if (/\boverline\b/.test(td)) {
					y += inlinePaddingTop
					ctx.moveTo(x, y - lineHeight);
					ctx.lineTo(to, y - lineHeight);
				}
				if (/\bline-through\b/.test(td)) {
					ctx.moveTo(x , y - lineHeight / 2 );
					ctx.lineTo(to, y - lineHeight /2 );
				}
				ctx.closePath();
				ctx.setStrokeStyle(color);
				ctx.stroke();
			}
		}
		const _reset = (text, x, y) => {
			const rs = Object.keys(rulesObj)
			for (let i = 0; i < rs.length; i++) {
				const item = rulesObj[rs[i]]
				// ctx.globalCompositeOperation = "destination-out";
				ctx.save();
				// ctx.clearRect(item.x, item.y, item.w, item.h)
				ctx.setFillStyle(rules.color);
				if(item.char) {
					ctx.fillText(item.char, item.x , item.y)
				}
				ctx.restore();
			}
		}
		const _setText = (isReset, char) => {
			if(isReset) {
				const t1 = this.measureText('\u0020', fontSize)
				const t2 = this.measureText('\u3000', fontSize)
				const t3 = this.measureText(char, fontSize)
				let _char = ''
				let _num = 1
				if(t3 == t2){
					_char ='\u3000'
					_num = 1
				} else {
					_char = '\u0020'
					_num = Math.ceil(t3 / t1)
				}
				return new Array(_num).fill(_char).join('')
			} else {
				return char
			}
		}
		const _setRulesObj = (text, index, x, y) => {
			rulesObj[index].x = x
			rulesObj[index].y = y
			rulesObj[index].char = text
		}
		const inlinePaddingTop = Math.ceil((lineHeight - fontSize) / 2)
		// 不超过一行
		if (textWidth + ol <= w && !text.includes('\n')) {
			x = x + ol
			const rs = Object.keys(rulesObj)
			let _text = text.split('')
			if(rs) {
				for (let i = 0; i < rs.length; i++) {
					const index = rs[i]
					const t = _text[index]
					let char = _setText(rulesObj[index], t) 
					_text[index] = char
					_setRulesObj(t, index, x + this.measureText(text.substring(0, index), fontSize), y + inlinePaddingTop)
				}
				_reset()
			}
			ctx.fillText(_text.join(''), x, y + inlinePaddingTop)
			y += lineHeight
			_drawLine(x, y, textWidth)
			ctx.restore()
			return
		}
		// 多行文本
		const chars = text.split('')
		const _y = y
		let _x = x
		// 逐行绘制
		let line = ''
		let lineIndex = 0
		let textArray = []
		
		for(let index = 0 ; index <= chars.length; index++){
			let ch = chars[index] 
			const isLine = ch === '\n'
			const isRight = index === chars.length - 1
			ch = isLine ? '' : ch
			let textline = line + _setText(rulesObj[index], ch)
			let testWidth = this.measureText(textline, fontSize)
			if(rulesObj[index]) {
				_setRulesObj(ch, index, _x + testWidth - this.measureText(ch, fontSize), y + inlinePaddingTop)
			}
			// 绘制行数大于最大行数，则直接跳出循环
			if (lineIndex >= maxLines) {
				break;
			}
			if(lineIndex == 0) {
				testWidth = testWidth + ol
				_x = x + ol
			} else {
				_x = x
			}
			if (testWidth > w || isLine || isRight) {
				lineIndex++
				line = isRight && testWidth <= w ? textline : line
				if(lineIndex === maxLines && testWidth > w) {
					while( this.measureText(`${line}...`, fontSize) > w) {
						if (line.length <= 1) {
							// 如果只有一个字符时，直接跳出循环
							break;
						}
						line = line.substring(0, line.length - 1);
						if(rulesObj[index - 1]) {
							rulesObj[index - 1].char = ''
						}
					}
					
					line += '...'
				}
				textArray.push(line)
				ctx.fillText(line, _x, y + inlinePaddingTop)
				y += lineHeight
				_drawLine(_x, y, testWidth)
				line = ch
				if ((y + lineHeight) > (_y + h)) break
			} else {
				line = textline
			}
		}
		const rs = Object.keys(rulesObj)
		if(rs) {
			_reset()
		}
		ctx.restore()
	}
	async findNode(element, parent = {}, index = 0, siblings = [], source) {
		let computedStyle = Object.assign({}, this.getComputedStyle(element, parent, index));
		let attributes = await this.getAttributes(element)
		let node = {
			id: id++,
			parent,
			computedStyle,
			rules: element.rules,
			attributes: Object.assign({}, attributes),
			name: element?.type || 'view',
		}
		if(JSON.stringify(parent) === '{}') {
			const {left = 0, top = 0, width = 0, height = 0 } = computedStyle
			node.layoutBox = {left, top, width, height }
		} else {
			node.layoutBox = Object.assign({left: 0, top: 0}, this.getLayoutBox(node, parent, index, siblings, source))
		}
		
		if (element?.views) {
			let childrens = []
			node.children = []
			for (let i = 0; i < element.views.length; i++) {
				let v = element.views[i]
				childrens.push(await this.findNode(v, node, i, childrens, element))
			}
			 node.children = childrens
		}
		return node
	}
	getLineHeight(lineHeight = '1.4em', fontSize = 14) {
		if(/em$/.test(lineHeight)) {
			return Math.ceil(parseFloat(lineHeight.replace('em')) * toPx(fontSize))
		} else {
			return /px$/.test(lineHeight) ? toPx(lineHeight) : lineHeight
		}
	}
	getComputedStyle(element, parent = {}, index = 0) {
		const style = {}
		const node = JSON.stringify(parent) == '{}' ? element :  element.css ;
		if(parent.computedStyle) {
			for (let value of Object.keys(parent.computedStyle)){
				const item = parent.computedStyle[value]
				if(['color', 'fontSize', 'lineHeight', 'verticalAlign', 'fontWeight', 'textAlign'].includes(value)) {
					if(/em$/.test(item) && 'lineHeight'.includes(value)) {
						style[value] = this.getLineHeight(item, node?.fontSize)
					} else {
						style[value] = /px$/.test(item) ? toPx(item) : item
					}
				}
			}
		}
		if(!node) return style
		for (let value of Object.keys(node)) {
			const item = node[value]
			if(value == 'views') {
				continue
			}
			if (['boxShadow', 'shadow'].includes(value)) {
				let shadows = item.split(' ').map(v => /^\d/.test(v) ? toPx(v) : v)
				style.boxShadow = shadows
				continue
			}
			if (value.includes('border') && !value.includes('adius')) {
				const prefix = value.match(/^border([BTRLa-z]+)?/)[0]
				const type = value.match(/[W|S|C][a-z]+/)
				let v = item.split(' ').map(v => /^\d/.test(v) ? toPx(v) : v)
				
				if(v.length > 1) {
					style[prefix] = {
						[prefix + 'Width'] : v[0] || 1,
						[prefix + 'Style'] : v[1] || 'solid',
						[prefix + 'Color'] : v[2] || 'black'
					}
				} else {
					style[prefix] = {
						[prefix + 'Width'] :  1,
						[prefix + 'Style'] : 'solid',
						[prefix + 'Color'] : 'black'
					}
					style[prefix][prefix + type[0]] = v[0]
				}
				continue
			}
			if (['background', 'backgroundColor'].includes(value)) {
				style['backgroundColor'] = item
				continue
			}
			if(value.includes('padding') || value.includes('margin') || value.includes('adius')) {
				let isRadius = value.includes('adius')
				let prefix = isRadius ? 'borderRadius' : value.match(/[a-z]+/)[0]
				let pre = [0,0,0,0].map((item, i) => isRadius ? ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'][i] : [prefix + 'Top', prefix + 'Right', prefix + 'Bottom', prefix + 'Left'][i] )
				if(value === 'padding' || value === 'margin' || value === 'radius' || value === 'borderRadius') {
					let v = item?.split(' ').map((item) => /^\d/.test(item) && toPx(item, node['width']), []) ||[0];
					let type = isRadius ? 'borderRadius' : value;
					if(v.length == 1) {
						style[type] = v[0]
					} else {
						let [t, r, b, l] = v
						style[type] = {
							[pre[0]]: t,
							[pre[1]]: isNumber(r) ? r : t,
							[pre[2]]: isNumber(b) ? b : t,
							[pre[3]]: isNumber(l) ? l : r
						}
					}
				} else {
					if(typeof style[prefix] === 'object') {
						style[prefix][value] = toPx(item, node['width'])
					} else {
						style[prefix] = {
							[pre[0]]: style[prefix] || 0,
							[pre[1]]: style[prefix] || 0,
							[pre[2]]: style[prefix] || 0,
							[pre[3]]: style[prefix] || 0
						}
						style[prefix][value] = toPx(item, node['width'])
					}
				}
				continue
			}
			if(value.includes('width') || value.includes('height')) {
				if(/%$/.test(item)) {
					style[value] = toPx(item, parent.layoutBox[value])
				} else {
					style[value] = /px|rpx$/.test(item) ? toPx(item) : item
				}
				continue
			}
			if(value.includes('transform')) {
				style[value]= {}
				item.replace(/([a-zA-Z]+)\(([0-9,-\.%rpxdeg\s]+)\)/g, (g1, g2, g3) => {
					const v = g3.split(',').map(k => k.replace(/(^\s*)|(\s*$)/g,''))
					const transform = (v, r) => {
						return v.includes('deg') ? v * 1 : toPx(v, r)
					}
					if(g2.includes('matrix')) {
						style[value][g2] = v.map(v => v * 1)
					} else if(g2.includes('rotate')) {
						style[value][g2] = g3.match(/\d+/)[0] * 1
					}else if(/[X, Y]/.test(g2)) {
						style[value][g2] = /[X]/.test(g2) ? transform(v[0], node['width']) : transform(v[0], node['height'])
					} else {
						style[value][g2+'X'] = transform(v[0], node['width'])
						style[value][g2+'Y'] = transform(v[1] || v[0], node['height'])
					}
				})
				continue
			}
			if(/em$/.test(item) && !value.includes('lineHeight')) {
				style[value] =  Math.ceil(parseFloat(item.replace('em')) * toPx(node['fontSize'] || 14))
			} else {
				style[value] = /%|px|rpx$/.test(item) ? toPx(item, node['width']) : item
			}
		}
		if((element.name == 'image' || element.type == 'image') && !style.mode) {
			style.mode = 'aspectFill'
			if((!node.width || node.width == 'auto') && (!node.height || node.width == 'auto') ) {
				style.mode = ''
			} 
		}
		return style
	}
	getLayoutBox(element, parent = {}, index = 0, siblings = [], source = {}) {
		let box = {}
		let {name, computedStyle: cstyle, layoutBox, attributes} = element || {}
		if(!name) return box
		const {ctx} = this
		
		const pbox = parent.layoutBox
		const pstyle = parent.computedStyle
		const { verticalAlign: va, left: x, top: y }  = cstyle;
		
		const { paddingTop: pt = 0, paddingRight: pr = 0, paddingBottom: pb = 0, paddingLeft: pl = 0, } = cstyle.padding || {}
		const { marginTop: mt = 0, marginRight: mr = 0, marginBottom: mb = 0, marginLeft: ml = 0, } = cstyle.margin || {}
		
		if(name === 'text') {
			let {
				fontSize = 14,
				lineHeight = '1.4em',
				fontWeight,
				fontFamily,
				textStyle
			} = cstyle || {}
			
			lineHeight = this.getLineHeight(lineHeight, fontSize)
			ctx.save()
			this.setFont({fontFamily, fontSize, fontWeight, textStyle})
			const {layoutBox: lbox, computedStyle: ls} = siblings[index - 1] || {}
			const isLeft = index == 0
			const isblock = cstyle.display === 'block'
			const isLblock = ls?.display === 'block'
			
			const lboxR = (isLeft || isblock ? 0 : lbox.offsetRight || 0)
			let texts = (attributes.text||'').split('\n')
			let length = texts.length
			let widths = texts.map((text, i) => {
				let o = this.measureText(text, fontSize)
				let w = o
				if(i == 0) {
					w = lboxR + o
					if(length > 1) {
						w = Math.ceil(w / pbox.width) * pbox.width
					}
				} else if(i < length - 1) {
					w = Math.ceil(w / pbox.width) * pbox.width //w
				} else {
					w = o
				}
				// if(pbox.width - w < this.measureText(' ', fontSize)) {
				// 	w = w + this.measureText(' ', fontSize)
				// }
				return Math.ceil(w)
			}).reduce((c, v) => c + v , 0)
			let width = widths;
			const line = `${width / pbox.width}`
			const lines = Math.ceil(line)
			const ceill = Math.ceil(`${line}`.replace(/\d+/, '0') * pbox.width) || 0
			box.offsetRight = cstyle.width ? cstyle.width : isblock ? pbox.width : ceill ;
			box.offsetLeft = (isNumber(x) || isblock || isLblock ? 0 : lboxR)  +  (cstyle.textIndent || 0)
			const _getLeft = () => {
				return (cstyle.left || pbox.left) + pl + ml
			}
			const _getWidth = () => {
				return cstyle.width || (isblock ? pbox.width : (width > pbox.width - box.left || lines > 1 ?  pbox.width - box.left : width))
			}
			const _getHeight = () => {
				// pbox.height = pbox.height > lineHeight ? pbox.height : lineHeight;
				if(width > pbox.width) {
					return lines * lineHeight + pt + pb + mt + mb
				} else {
					return lineHeight + pt + pb + mt + mb
				}
			}
			const _getTop = () => {
				let _top = y
				if(_top) {
					return _top + pt + mt
				}
				if(isLeft) {
					_top = pbox.top
				} else if(lbox.width < pbox.width) {
					_top = lbox.top
				} else {
					_top = lbox.top + lbox.height - (ls?.lineHeight || 0)
				}
				if (va === 'bottom') {
					_top = pbox?.top + (pbox?.height - box.height || 0)
				}
				if (va === 'middle') {
					_top = pbox?.top + (pbox?.height - box.height || 0) / 2
				}
				return _top + pt + mt + ((isblock || isLblock) && ls?.lineHeight || 0 )
			}
			box.left = _getLeft() 
			box.width = _getWidth() 
			box.height = _getHeight()
			box.top = _getTop()
			ctx.restore()
		} else if(name === 'view') {
			box.left = x || pbox.left
			box.width = (cstyle.width || pbox?.width) - pl - pr
			box.height = cstyle.height || 0
			box.top = cstyle.top || pbox.top
		} else if(name === 'image') {
			box.left = x || pbox.left
			box.width = (cstyle.width || pbox?.width) - pl - pr
			const {
				width: rWidth,
				height: rHeight
			} = attributes
			box.height = cstyle.height || box.width * rHeight / rWidth // pbox?.height - pl - pr
			box.top = cstyle.top || pbox.top
		}
		return box
	}
	getImageInfo(img) {
		return new Promise(async (resolve, reject) => {
			const base64Reg = /^data:image\/(\w+);base64/
			const localReg = /^\.|^\/(?=[^\/])/;
			const networkReg = /^(http|\/\/)/
			// #ifdef H5
			if(networkReg.test(img) && this.isH5PathToBase64) {
				img = await pathToBase64(img)
			}
			// #endif
			// #ifndef MP-ALIPAY 
			if(base64Reg.test(img)) {
				if(!cache[img]) {
					const imgName = img
					img = await base64ToPath(img)
					cache[imgName] = img
				} else {
					img = cache[img]
				}
			}
			// #endif
			if(cache[img] && cache[img].errMsg) {
				resolve(cache[img])
			} else {
				uni.getImageInfo({
					src: img,
					success: (image) => {
						// #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ || MP-TOUTIAO
						image.path = localReg.test(img) ?  `/${image.path}` : image.path;
						// #endif
						// image.path = /^(http|\/\/|\/|wxfile|data:image\/(\w+);base64|file|bdfile|ttfile|blob)/.test(image.path) ? image.path : `/${image.path}`;
						cache[img] = image
						resolve(cache[img])
					},
					fail(err) {
						resolve({path: img})
						console.error(`getImageInfo:fail ${img} failed ${JSON.stringify(err)}`);
					}
				})
			}
			
		})
		
	}
	getParent(element, name) {
		if(element.name === name) {
			return element
		} else if(element.parent){
			return this.getParent(element.parent, name)
		}
	}
	async getAttributes(element) {
		let arr = { }
		if(element?.url || element?.src) {
			arr.src = element.url || element?.src;
			const {width = 0, height = 0, path: src} = await this.getImageInfo(arr.src) || {}
			arr = Object.assign({}, arr, {width, height, src})
		}
		if(element?.text) {
			arr.text = element.text
		}
		return arr
	}
	async drawBoard(element) {
		const node = await this.findNode(element)
		return this.drawNode(node)
	}
	async drawNode(element) {
		const {
			layoutBox,
			computedStyle,
			name,
			rules
		} = element
		const {
			src,
			text
		} = element.attributes
		if (name === 'view') {
			this.drawView(layoutBox, computedStyle)
		} else if (name === 'image' && src) {
			await this.drawImage(element.attributes, layoutBox, computedStyle)
		} else if (name === 'text') {
			this.drawText(text, layoutBox, computedStyle, rules)
		}
		if (!element.children) return
		const childs = Object.values ? Object.values(element.children) : Object.keys(element.children).map((key) => element.children[key]);
		for (const child of childs) {
			await this.drawNode(child)
		}
	}
}