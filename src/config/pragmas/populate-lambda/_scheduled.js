let { join } = require('path')

module.exports = function populateScheduled ({ item, dir, cwd }) {
  let rate = null
  let cron = null
  if (Array.isArray(item) && item.length >= 3) {
    let name = item[0]

    // Handle rate + cron
    let sched = item.slice(1).join(' ').split('(')
    let schedType = sched[0]
    let schedValue = sched[1].replace(')', '')
    if (schedType === 'rate') rate = schedValue
    if (schedType === 'cron') cron = schedValue

    let src = join(cwd, dir, name)
    return { name, src, rate, cron }
  }
  else if (typeof item === 'object' && !Array.isArray(item)) {
    let name = Object.keys(item)[0]

    // Handle rate + cron
    if (item[name].rate) rate = item[name].rate.join(' ')
    if (item[name].cron) cron = item[name].cron.join(' ')

    let src = item[name].src
      ? join(cwd, item[name].src)
      : join(cwd, dir, name)
    return { name, src, rate, cron }
  }
  throw Error(`Invalid @scheduled item: ${item}`)
}
