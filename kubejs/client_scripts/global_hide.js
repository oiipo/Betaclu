// File: kubejs/client_scripts/global_hide.js (For MC 1.21+)

// Uses RecipeViewerEvents.removeEntriesCompletely to hide items fully from EMI/JEI/REI
RecipeViewerEvents.removeEntriesCompletely('item', event => {
    console.log('KubeJS Client: Completely removing item entries via RecipeViewerEvents (MC 1.21+)...');

    const itemsToHide = [
        'minecraft:shield',
        'minecraft:elytra',
        'minecraft:crossbow',
        'minecraft:trident',
        'minecraft:phantom_membrane'
    ];

    // Use event.remove(itemId) within this event to completely hide the item entry
    itemsToHide.forEach(id => {
        event.remove(id);
        console.log(` KJS Client: Completely removed entry for ${id} using RecipeViewerEvents`);
    });
});

console.log('KubeJS: Client scripts loaded (global_hide.js - RecipeViewerEvents.removeEntriesCompletely).');