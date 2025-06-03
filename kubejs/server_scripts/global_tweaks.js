// KubeJS Server Script: global_tweaks.js (or your file name)

ServerEvents.recipes(event => {
    console.log('KubeJS: Processing recipes...'); // Consolidated log message

    // --- User's Original Recipe Removals & Additions ---
    console.log('KubeJS: Removing specified item recipes...');
    const itemsToRemoveRecipes = [
        'minecraft:shield',
        'minecraft:elytra',
        'minecraft:crossbow',
        'minecraft:trident',
        'minecraft:phantom_membrane'
    ];
    itemsToRemoveRecipes.forEach(id => {
        event.remove({ output: id });
        event.remove({ input: id }); // Note: removing by input might be too broad, ensure this is intended.
        console.log(` KJS: Removed recipes related to ${id}`);
    });
    event.remove({ id: /minecraft:shield_decoration/ }); // Regex for shield decoration recipes
    console.log(' KJS: Removed shield decoration recipes.');

    // Shaped recipe for Shulker Shell from Amethyst and Diamond
    event.shaped(
        Item.of('minecraft:shulker_shell'),
        [
            'AAA',
            'ADA',
            '   '  // Ensure spaces if row is intended to be truly empty or define keys for spaces if needed by pattern.
        ],
        {
            A: 'minecraft:amethyst_shard',
            D: 'minecraft:diamond'
        }
    );
    console.log(' KJS: Added shaped recipe for Shulker Shell.');

    // Shapeless recipe for 1 Bamboo from 2 Bamboo Blocks
    event.shapeless(
        Item.of('minecraft:bamboo', 1),
        [
            'minecraft:bamboo_block',
            'minecraft:bamboo_block'
        ]
    );
    console.log(' KJS: Added shapeless recipe for Bamboo from Bamboo Blocks.');

    // --- Merged Custom Crafting and Smelting Recipes ---

    // --- Part 1: Rotten Flesh to Leather (Smelting/Smoking) ---
    console.log(' KJS: Adding Rotten Flesh to Leather recipes...');
    // Smoker recipe (5 seconds)
    event.smoking('minecraft:leather', 'minecraft:rotten_flesh') // Output, Input
         .xp(0.35) // Experience gained
         .cookingTime(100) // 5 seconds * 20 ticks/second = 100 ticks
         .id('kubejs:smoking_rotten_flesh_to_leather');

    // Furnace recipe (10 seconds)
    event.smelting('minecraft:leather', 'minecraft:rotten_flesh') // Output, Input
         .xp(0.35) // Same experience as smoker
         .cookingTime(200) // 10 seconds * 20 ticks/second = 200 ticks
         .id('kubejs:smelting_rotten_flesh_to_leather');

    // --- Part 2: Shaped Sapling Dyeing Recipes ---
    console.log(' KJS: Adding Sapling Dyeing recipes...');
    const inputSaplingTag = '#minecraft:saplings';

    event.shaped('minecraft:oak_sapling', ['BBB','BSB','BBB'], {B: 'minecraft:brown_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_oak_sapling');
    event.shaped('minecraft:spruce_sapling', ['GGG','GSG','GGG'], {G: 'minecraft:green_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_spruce_sapling');
    event.shaped('minecraft:birch_sapling', ['WWW','WSW','WWW'], {W: 'minecraft:white_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_birch_sapling');
    event.shaped('minecraft:jungle_sapling', ['LLL','LSL','LLL'], {L: 'minecraft:lime_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_jungle_sapling');
    event.shaped('minecraft:acacia_sapling', ['OOO','OSO','OOO'], {O: 'minecraft:orange_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_acacia_sapling');
    event.shaped('minecraft:dark_oak_sapling', ['KKK','KSK','KKK'], {K: 'minecraft:black_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_dark_oak_sapling');
    event.shaped('minecraft:mangrove_propagule', ['RRR','RSR','RRR'], {R: 'minecraft:red_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_mangrove_propagule');
    event.shaped('minecraft:cherry_sapling', ['PPP','PSP','PPP'], {P: 'minecraft:pink_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_cherry_sapling');
    event.shaped('minecraft:azalea', ['UUU','USU','UUU'], {U: 'minecraft:purple_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_azalea');
    event.shaped('minecraft:flowering_azalea', ['MMM','MSM','MMM'], {M: 'minecraft:magenta_dye', S: inputSaplingTag}).id('kubejs:shaped_dye_to_flowering_azalea');

    // --- Part 3: Rail Modification Recipes ---
    console.log(' KJS: Adding Rail Modification recipes...');
    event.remove({ id: 'minecraft:rail' }); // Remove default vanilla iron rail recipe
    const ironRegularRailOutput = 16;
    event.shaped(Item.of('minecraft:rail', ironRegularRailOutput), ['I I','ISI','I I'], {I: 'minecraft:iron_ingot',S: 'minecraft:stick'}).id('kubejs:custom_iron_regular_rail');
    const copperRegularRailOutput = 8;
    event.shaped(Item.of('minecraft:rail', copperRegularRailOutput), ['C C','CSC','C C'], {C: 'minecraft:copper_ingot',S: 'minecraft:stick'}).id('kubejs:custom_copper_regular_rail_alternative');

    const copperDetectorRailOutput = 4;
    event.shaped(Item.of('minecraft:detector_rail', copperDetectorRailOutput), ['C C','CPC','CRC'], {C: 'minecraft:copper_ingot',P: 'minecraft:stone_pressure_plate',R: 'minecraft:redstone'}).id('kubejs:custom_copper_detector_rail_alternative');

    const copperActivatorRailOutput = 4;
    event.shaped(Item.of('minecraft:activator_rail', copperActivatorRailOutput), ['CSC','CTC','CSC'], {C: 'minecraft:copper_ingot',S: 'minecraft:stick',T: 'minecraft:redstone_torch'}).id('kubejs:custom_copper_activator_rail_alternative');

    console.log('KubeJS: Finished processing recipes.');
}); // End of ServerEvents.recipes

ServerEvents.loaded(event => {
    event.server.runCommandSilent('/gamerule doInsomnia false');
    event.server.runCommandSilent('/gamerule playersSleepingPercentage 50');
    // Corrected the disableEnd gamerule if it was intended to be a vanilla one.
    // If 'disableEnd' is a custom gamerule from a mod, it's fine.
    // If you meant to disable Endermen griefing or similar, the command is different.
    // For example, to stop Endermen picking up blocks: /gamerule mobGriefing false (this affects all mobs)
    // There isn't a vanilla gamerule named 'disableEnd'.
    // I'll leave your original line, assuming it's intentional or for a mod.
    event.server.runCommandSilent('/gamerule disableEnd ');

    console.log('KJS: Set gamerules (doInsomnia, playersSleepingPercentage, disableEnd).');
});

// --- Datapack Modification Section (Advancements & Structures) ---
// NOTE: Commented out due to "Unknown event 'ServerEvents.highPriorityData'" error.
// The correct event for datapack modification in this KJS version is unclear.
// For KubeJS 6+, datapack modification often uses `ServerEvents.highPriorityData(event => { ... })`
// or `ServerEvents.datapack(event => { ... })`. If using an older version, the method might be different
// or might require placing files directly into the `kubejs/data/` folder.
/*
ServerEvents.highPriorityData(event => { // This event name might be incorrect for your KJS version
    if (!event.server) return;

    // --- Remove Advancements ---
    console.log('KJS: Removing specified advancements via highPriorityData...');
    const advancementsToRemove = [
        'minecraft:end/root',
        // ... (rest of your advancement list) ...
        'minecraft:adventure/arbalistic'
    ];
    advancementsToRemove.forEach(advancementId => {
        const path = `data/${advancementId.substring(0, advancementId.indexOf(':'))}/advancements/${advancementId.substring(advancementId.indexOf(':') + 1)}.json`;
        try {
            // For KubeJS 6+, event.addJson or event.remove might be used differently for datapacks.
            // event.remove usually takes a resource location string like "namespace:path/to/file_without_extension"
            // For advancements, it would be something like: event.remove(advancementId);
            // The path construction below is more akin to manual file deletion, which isn't how KJS data events work.
            // Let's assume you mean to remove the advancement by its ID if the event supports it directly.
            // Example for KubeJS 6.1+ event.removeJson(advancementIdAsResourceLocation);
            // Or, if it's about removing files KJS itself would generate:
            // event.remove(`data/${namespace}/advancements/${fileName}.json`);
            console.log(` KJS: (Simulated) Would attempt to remove advancement: ${advancementId}`);
        } catch (advError) {
            console.error(` KJS Error removing advancement ${advancementId}: ${advError}`);
        }
    });
    console.log('KJS: Finished removing advancements.');

    // --- Remove Stronghold Structure Set ---
    console.log('KJS: Attempting to remove Stronghold structure set via highPriorityData...');
    const strongholdStructureSetId = 'minecraft:worldgen/structure_set/strongholds'; // As ResourceLocation
    try {
        // event.removeJson(strongholdStructureSetId); or similar for structure sets
        console.log(` KJS: (Simulated) Would attempt to remove structure set file: ${strongholdStructureSetId}`);
    } catch (structError) {
        console.error(` KJS Error removing structure set ${strongholdStructureSetId}: ${structError}`);
    }
    console.log('KJS: Finished attempting to remove Stronghold structure set.');
});
*/
// --- End of Datapack Modification Section ---

console.log('KubeJS: Server scripts loaded (global_tweaks.js - Updated).');