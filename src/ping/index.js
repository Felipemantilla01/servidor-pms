let icmp = require('./ping.functions')

async function main() {
    let result = await icmp.ping('10.41.14.6')
    console.log(result)
}

main()