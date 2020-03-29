/**
 * 存储localStorage
 */

export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	return window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

export const parseTimeStamp = isoString => {
	const to = localDate().slice(0, 7)
	const from = isoString.slice(0, 7)
	const res = genDaysArr(from, to).map(v => dateFormat(v))
	return res	
}

export const localDate = (v) => {
	const d = new Date(v || Date.now());
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	return d.toISOString();
}

export const parseToday = () => {
	const map = {
		"01": "January", "02": "February", "03": "March",
		"04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"
	}
	const todayList = localDate().slice(5, 10).split('-')
	const month = map[todayList[0]]
	const day = parseInt(todayList[1])
	return `${month} ${day}`
}

export const debounce = (func, delay=1000) => {
	let timer;
	return function(){
	  let args = arguments;
	  if(timer){
		clearTimeout(timer)
	  }
	  timer = setTimeout(function(){
		func.apply(this, args)
	  }, delay)
	}
}

const dateFormat = isoString => {

	const map = {
		"01": "Jan", "02": "Feb", "03": "March",
		"04": "April", "05": "May", "06": "June", "07": "July", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
	}
	const dateArr = isoString.split('-')
	const year = dateArr[0]  // '2020;
	const month = map[dateArr[1]] // March
	const dayOfMonth = new Date(parseInt(year), parseInt(dateArr[1]), 0).getDate()
	const res = {month : `${month} ${year}`, days: dayOfMonth}
	return res
}

const genDaysArr = (from , to) => {
	const result = [];
	const s = from.split("-");
	const e = to.split("-");
	let min = new Date();
	let max = new Date();
	min.setFullYear(s[0], s[1] * 1 - 1, 1)
	max.setFullYear(e[0], e[1] * 1 - 1, 1)
	let curr = min;
	while (curr <= max) {
		let month = curr.getMonth();
		let realMonth = month + 1
		let year = curr.getFullYear();
		if(realMonth < 10){
			result.push(`${year}-0${realMonth}`);
		}else{
			result.push(`${year}-${realMonth}`);
		}
		curr.setMonth(realMonth);
	}
	return result;
}