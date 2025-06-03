ServerEvents.recipes(event => {
    console.log('KubeJS: Removing specified item recipes...');
    const itemsToRemoveRecipes = [
        'minecraft:shield',
        'minecraft:elytra',
        'minecraft:crossbow',
        'minecraft:totem_of_undying',
        'minecraft:trident',
        'minecraft:phantom_membrane'
    ];
    itemsToRemoveRecipes.forEach(id => {
        event.remove({ output: id });
        event.remove({ input: id });
        console.log(` KJS: Removed recipes related to ${id}`);
    });
    event.remove({ id: /minecraft:shield_decoration/ });
    console.log(' KJS: Removed shield decoration recipes.');
});

LootJS.modifiers(event => {
    console.log('KubeJS: Modifying loot tables using event.modify()...');
    try {
        event.modify('minecraft:chests/end_city_treasure', table => {
            table.removeLoot('minecraft:elytra');
            console.log(' KJS: Modified minecraft:chests/end_city_treasure');
        });
        event.modify('minecraft:entities/evoker', table => {
            table.removeLoot('minecraft:totem_of_undying');
            console.log(' KJS: Modified minecraft:entities/evoker');
        });
        event.modify('minecraft:entities/drowned', table => {
            table.removeLoot('minecraft:trident');
            console.log(' KJS: Modified minecraft:entities/drowned');
        });
        event.modify('minecraft:entities/pillager', table => {
            table.removeLoot('minecraft:crossbow');
            console.log(' KJS: Modified minecraft:entities/pillager');
        });
        event.modify('minecraft:chests/pillager_outpost', table => {
            table.removeLoot('minecraft:crossbow');
            console.log(' KJS: Modified minecraft:chests/pillager_outpost');
        });
        event.modify('minecraft:gameplay/piglin_bartering', table => {
            table.removeLoot('minecraft:crossbow');
            table.removeLoot('minecraft:potion', itemStack => itemStack.hasNBT() && itemStack.nbt.contains('Potion') && itemStack.nbt.getString('Potion') == 'minecraft:slow_falling');
            table.removeLoot('minecraft:splash_potion', itemStack => itemStack.hasNBT() && itemStack.nbt.contains('Potion') && itemStack.nbt.getString('Potion') == 'minecraft:slow_falling');
            console.log(' KJS: Modified minecraft:gameplay/piglin_bartering');
        });
        event.modify('minecraft:entities/phantom', table => {
            table.removeLoot('minecraft:phantom_membrane');
            console.log(' KJS: Modified minecraft:entities/phantom');
        });
        event.modify('minecraft:gameplay/cat_morning_gift', table => {
            table.removeLoot('minecraft:phantom_membrane');
            console.log(' KJS: Modified minecraft:gameplay/cat_morning_gift');
        });
MoreJSEvents.wandererTrades(event => {
    console.log('KubeJS: Adding Wandering Trader trades...');
    event.addTrade({ tier: 1, input: [Item.of('minecraft:emerald', 4)], output: Item.of('minecraft:sea_lantern', 1), max_uses: 8 });
    event.addTrade({ tier: 1, input: [Item.of('minecraft:emerald', 1)], output: Item.of('minecraft:prismarine_shards', 4), max_uses: 12 });
    event.addTrade({ tier: 1, input: [Item.of('minecraft:emerald', 3)], output: Item.of('minecraft:prismarine', 1), max_uses: 8 });
    event.addTrade({ tier: 1, input: [Item.of('minecraft:emerald', 1)], output: Item.of('minecraft:mud', 8), max_uses: 16 });
    event.addTrade({ tier: 1, input: [Item.of('minecraft:emerald', 1)], output: Item.of('minecraft:end_stone', 6), max_uses: 12 });
    event.addTrade({ tier: 2, input: [Item.of('minecraft:emerald', 5)], output: Item.of('minecraft:purpur_block', 2), max_uses: 6 });
    event.addTrade({ tier: 2, input: [Item.of('minecraft:emerald', 8)], output: Item.of('minecraft:end_rod', 1), max_uses: 18 });
    event.addTrade({ tier: 2, input: [Item.of('minecraft:emerald', 12)], output: Item.of('minecraft:frog_spawn_egg', 1), max_uses: 2 });
    console.log(' KJS: Finished adding Wandering Trader trades.');
});

ServerEvents.loaded(event => {
    event.server.runCommandSilent('/gamerule doInsomnia false');
    event.server.runCommandSilent('/gamerule playersSleepingPercentage 50');
    console.log('KJS: Set gamerule doInsomnia to false (Vanilla Phantom spawning disabled).');
});

ServerEvents.highPriorityData(event => {
    if (!event.server) return;
    console.log('KJS: Removing specified advancements...');
    const advancementsToRemove = [
        'minecraft:end/root',
        'minecraft:end/kill_dragon',
        'minecraft:end/dragon_egg',
        'minecraft:end/enter_end_gateway',
        'minecraft:end/respawn_dragon',
        'minecraft:end/dragon_breath',
        'minecraft:end/find_end_city',
        'minecraft:adventure/elytra_flight',
        'minecraft:adventure/throw_trident',
        'minecraft:adventure/very_very_frightening',
        'minecraft:adventure/two_birds_one_arrow',
        'minecraft:adventure/whos_the_pillager_now',
        'minecraft:adventure/arbalistic'
    ];
    advancementsToRemove.forEach(advancementId => {
        const path = `advancements/${advancementId.substring(advancementId.indexOf(':') + 1)}.json`;
        const namespace = advancementId.substring(0, advancementId.indexOf(':'));
        event.remove(`${namespace}:${path}`);
        console.log(` KJS: Removed advancement: ${advancementId}`);
    });
    console.log('KJS: Finished removing advancements.');
});

console.log('KubeJS: Server scripts loaded (global_tweaks.js - Updated).');
