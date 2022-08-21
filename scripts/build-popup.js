import { exec } from 'child_process'

const cmd = exec('yarn build', (err) => {
	if (err) return console.log(err)
})

cmd.stdout.on('data', (data) => {
	const consolable = ['vite', 'Done'].some(key => {
		return data.includes(key)
	})
	consolable && console.log(data)
})