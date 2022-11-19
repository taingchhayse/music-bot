const { Permissions } = require("discord.js")
global.Interaction = module.exports = class Interaction {
    constructor(options) {
        this.name = options.name || 'Etc'
        this.type = options.type || 1
        this.description =
            this.type === 1
                ? options.description || "No description provided"
                : undefined
        this.options = options.options || []
    }

    async exec(...args) {
        console.log(1231312313123131231313);
        throw new Error(`${this.name} does not provide exec method !`)
    }
}
