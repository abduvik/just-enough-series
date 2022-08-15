class TreePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('TreePlugin', (stats) => {
            const treesCreated = stats.compilation.modules.filter(module => /.*?\.tree$/.test(module.resourceResolveData && module.resourceResolveData.path))
            console.log('\x1b[33m%s\x1b[0m', `Found ${treesCreated.length} .tree files`)
        })
    }
}

module.exports = { TreePlugin }