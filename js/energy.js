addLayer("e", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('sac', 10) || player.e.unlocked || player["sac"].points.gte(10)) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasUpgrade('e', 33)) return 100
        if (hasMilestone('sac', 10)) return 20
        return 0
    },
    doReset(e) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[e].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        if (hasMilestone('sac', 13)) keptUpgrades.push(11);
        if (hasMilestone('sac', 13)) keptUpgrades.push(12);
        if (hasMilestone('sac', 13)) keptUpgrades.push(13);
        if (hasMilestone('sac', 13)) keptUpgrades.push(14);
        if (hasMilestone('sac', 13)) keptUpgrades.push(21);
        if (hasMilestone('sac', 13)) keptUpgrades.push(22);
        if (hasMilestone('sac', 13)) keptUpgrades.push(23);
        if (hasMilestone('sac', 13)) keptUpgrades.push(24);
        if (hasMilestone('sac', 17)) keptUpgrades.push(31);
        if (hasMilestone('sac', 17)) keptUpgrades.push(32);
        if (hasMilestone('sac', 17)) keptUpgrades.push(33);
        if (hasMilestone('sac', 17)) keptUpgrades.push(34);
        if (hasMilestone('sac', 22)) keptUpgrades.push(41);
        if (hasMilestone('sac', 22)) keptUpgrades.push(42);
        if (hasMilestone('sac', 22)) keptUpgrades.push(43);
        if (hasMilestone('sac', 22)) keptUpgrades.push(44);
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },  
    tabFormat: {
        "Upgrades": {
            content: [
                ["infobox", "info"],
                "main-display",
                "blank",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "blank",
                "blank",
                "upgrades"
            ],
        },
        "Milestones": {
            content: [
                "main-display",
                "blank",
                "blank",
                "blank",
                "milestones"
            ],
        },
    },
    infoboxes: {
        info: {
            title: "NOTE",
            body() { return "Click energy button to be able to buy upgrades. [Won't reset sacs]" },
        },
    },   
    color: "yellow",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of currency
    baseResource: "Sacrifice", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 10,  // Balance is needed. Balanced to SAC 3. Have to balance to sac 4 // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade('e', 11)) mult = mult.times(2)
        if (hasUpgrade('e', 13)) mult = mult.times(3)
        if (hasUpgrade('e', 14)) mult = mult.times(upgradeEffect('e', 14))
        if (hasUpgrade('e', 21)) mult = mult.times(4)
        if (hasUpgrade('e', 22)) mult = mult.times(1.5)
        if (hasUpgrade('e', 23)) mult = mult.times(4)
        if (hasUpgrade('e', 24)) mult = mult.times(upgradeEffect('e', 24))
        if (hasMilestone('sac', 11)) mult = mult.times(5)
        if (hasUpgrade('mega', 51)) mult = mult.times(8)
        if (hasUpgrade('basic', 45)) mult = mult.times(1.185)
        if (hasMilestone('e', 1)) mult = mult.times(3.5)
        if (hasMilestone('sac', 12)) mult = mult.times(10)
        if (hasUpgrade('mega', 53)) mult = mult.times(25)
        if (hasMilestone('e', 4)) mult = mult.times(9)
        if (hasMilestone('sac', 13)) mult = mult.times(25)
        if (hasUpgrade('prestige', 42)) mult = mult.times(1000)
        if (hasUpgrade('e', 34)) mult = mult.times(250)
        if (hasMilestone('sac', 14)) mult = mult.times(1000)
        if (hasAchievement('a', 75)) mult = mult.times(100)
        if (hasMilestone('sac', 15)) mult = mult.times(10000)
        if (hasUpgrade('e', 42)) mult = mult.times(10000)
        if (hasMilestone('sac', 17)) mult = mult.times(1e6)
        if (hasMilestone('sac', 19)) mult = mult.times(100)
        if (hasMilestone('sac', 20)) mult = mult.times(2000)
        if (hasChallenge('sac', 11)) mult = mult.times(1e10)
        if (hasUpgrade('e', 51)) mult = mult.times(100000)
        if (hasMilestone('sac', 21)) mult = mult.times(1e10)
        if (hasMilestone('e', 8)) mult = mult.times(1e12)
        if (hasUpgrade('e', 54)) mult = mult.times(1000000)
        if (inChallenge("sac", 11)) {
            if (hasUpgrade('e', 112)) mult = mult.times(5000)
        }
        if (inChallenge("sac", 12)) {
            if (hasUpgrade('e', 121)) mult = mult.times(25000)
            if (hasUpgrade('e', 122)) mult = mult.times(175000)
            if (hasUpgrade('e', 124)) mult = mult.times(4800000)
        }
        if (inChallenge("sac", 13)) {
            if (hasUpgrade('e', 131)) mult = mult.times(7777)
            if (hasUpgrade('e', 132)) mult = mult.times(250e6)
            if (hasUpgrade('e', 135)) mult = mult.times(800e3)
        }
        if (hasUpgrade('e', 71)) mult = mult.times(upgradeEffect('e', 71))
        if (hasUpgrade('e', 72)) mult = mult.times(10e12)
        if (hasUpgrade('e', 74)) mult = mult.times(1e6)
        mult = mult.times(buyableEffect('mega', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('prestige', 43)) exp = exp.add(0.01)
        return exp
    },
    upgrades: {
            11: {
                title: "What is this, exactly?",
                description: "x2 Energy, and x1e250 PF",
                cost: new Decimal(500),
            },
            12: {
                title: "Still, another upgrade.",
                description: "x1e250 BP",
                cost: new Decimal(1000),
                unlocked() { return hasUpgrade("e", 11) },
            },
            13: {
                title: "Trip Energy",
                description: "x3 Energy, and x1e25 MP",
                cost: new Decimal(1050),
                unlocked() { return hasUpgrade("e", 12) },
            },
            14: {
                title: "Compounding 6",
                description: "Energy gets boosted based on itself.",
                cost: new Decimal(3300),
                unlocked() { return hasUpgrade("e", 13) },
                effect() {
                    let e4exp = 0.125
                    if (hasUpgrade('e', 33)) e4exp = 0.16
                    if (hasMilestone('e', 9)) e4exp = 0.195
                    return player["e"].points.add(1).pow(e4exp)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            21: {
                title: "Quadra Energy",
                description: "x4 Energy, and x1e100 PP",
                cost: new Decimal(11111),
                unlocked() { return hasUpgrade("e", 14) },
            },
            22: {
                title: "Megar",
                description: "Mega Buyable 2 formula is weaker. Also x1.5 Energy.",
                cost: new Decimal(250e3),
                unlocked() { return hasUpgrade("e", 21) },
            },
            23: {
                title: "Quadra Energy 2",
                description: "x4 Energy, x1e700 PF",
                cost: new Decimal(400e3),
                unlocked() { return hasUpgrade("e", 22) },
            },
            24: {
                title: "Boost Boost",
                description: "A gigawatt of energy. That can power 750K Homes. That's a lot. Anyways, Mega Points now boost energy, by a little. x1e40 MP.",
                cost: new Decimal(1e9),
                effect() {
                    let e8exp = 0.00075
                    if (hasMilestone('e', 5)) e8exp = 0.001
                    if (hasMilestone('e', 6)) e8exp = 0.00125
                    if (hasMilestone('sac', 16)) e8exp = 0.00165
                    if (inChallenge("sac", 13)) {
                        if (hasUpgrade('e', 134)) e8exp = 0.005
                    }
                    return player["mega"].points.add(1).pow(e8exp)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                unlocked() { return hasUpgrade("e", 23) },
            },
            31: {
                title: "Mega CostDown",
                description: "Mega Buyable 1 cost is less.",
                cost: new Decimal(1e15),
                unlocked() { return hasUpgrade("e", 24) },
            },
            32: {
                title: "PFx",
                description: "xe7500 More PF",
                cost: new Decimal(1.25e15),
                unlocked() { return hasUpgrade("e", 31) },
            },
            33: {
                title: "No need to click to be better",
                description: "Energy Passive Generation is now 100x, and Energy Upgrade 4 is stronger.",
                cost: new Decimal(2.25e17),
                unlocked() { return hasUpgrade("e", 32) },
            },
            34: {
                title: "Energy Big Boost",
                description: "x250 Energy, and mega buyable 1 is stronger",
                cost: new Decimal(8e23),
                unlocked() { return hasUpgrade("e", 33) },
            },
            41: {
                title: "PFx 2",
                description: "x1e10K PF",
                cost: new Decimal(4e35),
                unlocked() { return hasUpgrade("e", 34) },
            },
            42: {
                title: "Both Big",
                description: "Mega Buyable 2 formula is weaker and x10,000 energy",
                cost: new Decimal(3.5e41),
                unlocked() { return hasUpgrade("e", 41) },
            },
            43: {
                title: "PFx 3",
                description: "xe25K PF",
                cost: new Decimal(6e51),
                unlocked() { return hasUpgrade("e", 42) },
            },
            44: {
                title: "Crazy Boost",
                description: "Mega Buyables 1 and 2 are much stronger",
                cost: new Decimal(9e81),
                unlocked() { return hasUpgrade("e", 43) },
            },
            51: {
                title: "EneX",
                description: "x100K Energy",
                cost: new Decimal(1.9e112),
                unlocked() { return hasUpgrade("e", 44) },
            },
            52: {
                title: "A nerf?",
                description: "/e50 MP, BUT xe20K PF",
                cost: new Decimal(4.2e118),
                unlocked() { return hasUpgrade("e", 51) },
            },
            53: {
                title: "Capping",
                description: "Prestige Softcap is weaker",
                cost: new Decimal(1.2e144),
                unlocked() { return hasUpgrade("e", 52) },
            },
            54: {
                title: "Hire workers to generate energy",
                description: "x1M Energy",
                cost: new Decimal(7.5e156),
                unlocked() { return hasUpgrade("e", 53) },
            },
            61: {
                title: "Fragments Duplicate Wildly",
                description: "xe126.5K PF",
                cost: new Decimal(3e171),
                unlocked() { return hasUpgrade("e", 54) },
            },
            62: {
                title: "Fragments Insane Boost",
                description: "xe100K PF",
                cost: new Decimal(5.1e173),
                unlocked() { return hasUpgrade("e", 61) },
            },
            63: {
                title: "Fragments Insane Boost II",
                description: "xe100K PF",
                cost: new Decimal(1.6e174),
                unlocked() { return hasUpgrade("e", 62) },
            },
            64: {
                title: "Prestiger",
                description: "Mega Upgrade 4 is stronger, Mega Points -^0.025",
                cost: new Decimal(1.4e198),
                unlocked() { return hasUpgrade("e", 63) },
            },
            71: {
                title: "e200 Energy - Compounding 7",
                description: "Energy gets boosted based on itself, but starts at 1e175.",
                cost: new Decimal(2e200),
                unlocked() { return hasUpgrade("e", 64) },
                effect() {
                    let e200EUExp = 0.125
                    return player["e"].points.add(1).div(1e175).pow(e200EUExp)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            72: {
                title: "Use the energy to generate insane tech for our workers",
                description: "x10T Energy",
                cost: new Decimal(8.5e204),
                unlocked() { return hasUpgrade("e", 71) },
            },
            73: {
                title: "Mega Power!",
                description: "xe350 MP",
                cost: new Decimal(2.3e224),
                unlocked() { return hasUpgrade("e", 72) },
            },
            74: {
                title: "Energy and Mega Boosters",
                description: "xe150 MP, x1M Energy",
                cost: new Decimal(1.25e235),
                unlocked() { return hasUpgrade("e", 73) },
            },
            111: {
                title: "Challenge 1-Specific Upgrades (Only can be get in Challenge 1, only boosts Challenge 1)",
                description: "xe2.5K BP",
                cost: new Decimal(4e49),
                unlocked() { return inChallenge("sac", 11) },
            },
            112: {
                title: "Energy Bar Increase",
                description: "x5000 Energy",
                cost: new Decimal(5.5e49),
                unlocked() { return inChallenge("sac", 11) && hasUpgrade("e", 111) },
            },
            113: {
                title: "Basically",
                description: "xe4K BP",
                cost: new Decimal(1.4e54),
                unlocked() { return inChallenge("sac", 11) && hasUpgrade("e", 112) },
            },
            121: {
                title: "Challenge 2-Specific Upgrades (Only can be get in Challenge 2, only boosts Challenge 2)",
                description: "x25,000 Energy",
                cost: new Decimal(7.5e76),
                unlocked() { return inChallenge("sac", 12)  },
            },
            122: {
                title: "Power Surge",
                description: "x175,000 Energy",
                cost: new Decimal(6e84),
                unlocked() { return inChallenge("sac", 12) && hasUpgrade("e", 121) },
            },
            123: {
                title: "Prestiging Mastery",
                description: "xe1.5K PP",
                cost: new Decimal(1.5e91),
                unlocked() { return inChallenge("sac", 12) && hasUpgrade("e", 122) },
            },
            124: {
                title: "Energy Hunting",
                description: "After this successful hunt, you multiplied your energy gain by 4.8M!",
                cost: new Decimal(6.5e91),
                unlocked() { return inChallenge("sac", 12) && hasUpgrade("e", 123) },
            },
            131: {
                title: "Challenge 3-Specific Upgrades (Only can be get in Challenge 3, only boosts Challenge 3)",
                description: "x7777 Energy, x7.77e77 MP",
                cost: new Decimal(3.5e84),
                unlocked() { return inChallenge("sac", 13) },
            },
            132: {
                title: "Drilling for extra energy",
                description: "You multiplied your energy production by 250M!!",
                cost: new Decimal(2.5e89),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 131) },
            },
            133: {
                title: "PF Power UP!",
                description: "^1.05 PF",
                cost: new Decimal(3.33e99),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 132) },
            },
            134: {
                title: "Mega boosts energy GREATLY!",
                description: "Energy Upgrade 8 is MUCH stronger",
                cost: new Decimal(4.44e99),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 133) },
            },
            135: {
                title: "Energy Reserves",
                description: "Take some energy from the energy reserves. This leads to a x800K Energy.",
                cost: new Decimal(1e122),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 134) },
            },
    },
    milestones: {
        1: {
            requirementDescription: "50,000 Energy. (50 kW)",
            effectDescription: "x1e1,000 PF, +^0.02 PP and MP",
            done() { return player["e"].points.gte(50000) }
        },
        2: {
            requirementDescription: "250 MW Energy, or 250M energy.",
            effectDescription: "x3.5 Energy. Energy Effect is also stronger.",
            done() { return player["e"].points.gte(250e6) }
        },
        3: {
            requirementDescription: "20B Watts, or 20 GW of energy.",
            effectDescription: "Energy effect is stronger.",
            done() { return player["e"].points.gte(20e9) }
        },
        4: {
            requirementDescription: "110 TW of Energy - 1.10e14",
            effectDescription: "1e7,500 PF, x9 Energy",
            done() { return player["e"].points.gte(1.1e14) }
        },
        5: {
            requirementDescription: "1E19 Energy [10 Qt Energy]",
            effectDescription: "x1e10,000 PF, Energy Upgrade 8 is stronger",
            done() { return player["e"].points.gte(1e19) }
        },
        6: {
            requirementDescription: "1E34 Energy [10 Decillion Energy]",
            effectDescription: "Energy boost is stronger, Energy Upgrade 8 is stronger",
            done() { return player["e"].points.gte(1e34) }
        },
        7: {
            requirementDescription: "3e61 Energy",
            effectDescription: "Energy boost is ^2 stronger",
            done() { return player["e"].points.gte(3e61) }
        },
        8: {
            requirementDescription: "5e128 Energy: BIG TRADE-OFF",
            effectDescription: "Energy boost is ^0.4, BUT xe100K PF and x1T Energy",
            done() { return player["e"].points.gte(5e128) }
        },
        9: {
            requirementDescription: "1.7e164 Energy",
            effectDescription: "'Compounding 6' is stronger.",
            done() { return player["e"].points.gte(1.7e164) }
        },
    },
    branches: ["sac", "mega"],
    effect(){
    let enpow = 50
    if (hasMilestone('e', 2)) enpow = 90
    if (hasMilestone('e', 3)) enpow = 200
    if (hasMilestone('sac', 12)) enpow = 250
    if (hasMilestone('e', 6)) enpow = 350
    if (hasMilestone('e', 7)) enpow = 700
    if (hasUpgrade('basic', 55)) enpow = 1200
    if (hasMilestone('e', 8)) enpow = 400
        let eff = player.e.points.add(1).pow(enpow)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Point Fragments by x" + format(tmp[this.layer].effect);
            return desc;
        },
    row: 4, // Row the layer is in on the tree (0 is the first row)
})