const dbClient = require('./db.functions')

async function main() {
    let result = await dbClient.findDevices()
    result.data.forEach(element => {
        console.log(element)
    });
}

main()