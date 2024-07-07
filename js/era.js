addLayer("era", {
    name: "Era", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ERA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        ec: new Decimal(0),
        ecg: new Decimal(0)
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('sac', 73) || player.era.unlocked || player["era"].points.gte(1)) visible = true
       return visible
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                ["display-text", "What's next? How many seconds, years, eras, timelines and infinities of playing to come?"],
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "milestones",
            ],
        },
        "The Tree": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: blue; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${format(player.era.ec)}</span></h2> Era Crystals`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + format(player.era.ecg) + " Era Crystals a second."
                        return a
                    }
                ],
                "blank",
                "blank",
                "blank",
                "upgrades",
            ],
            unlocked() {return player.era.points.gte(1)}
        },
        "Era Buyables": {
            unlocked() { return (hasUpgrade('era', 143))},
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: blue; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${format(player.era.ec)}</span></h2> Era Crystals`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + format(player.era.ecg) + " Era Crystals a second."
                        return a
                    }
                ],
                "blank",
                "blank",
                "buyables"
            ],
        },
        "Info after Era": {
            content: [
                ["display-text", "Firstly, let's talk about softcaps. There are many softcaps after e1T effect, ranging from e1T to e15T. You will see some caps."],
                ["display-text", "Why is there a hardcap for Supreme Buyable 5? It is just TOO OP. Hardcap varies, but starts at ^1.25."],
                ["display-text", "What is Era Crystals? It is an elusive currency for Era, and is generated. This is used to buy Tree Upgrades. These Tree Upgrades have branches connecting to them."],
                ["display-text", "Era Upgrade Naming System: A '+1' to the name will only be added IF the upgrade unlocks other upgrades. If one upgrade unlocks multiple upgrades, it will be 'A', 'B', 'C', 'D', 'E', depending on how many upgrades it unlocks."],
                ["display-text", "Please DO NOT ENTER any Mastery Challenges. Achievements give little to no reward, and when entering Mastery Challenges, it RESETS ERA. Please don't complain. It is what it is."],
                ["display-text", "Common new shortforms: EC = Era Crystals, SBx = Supreme Buyable x, MBx = Mega Buyable x, EBx = Era Buyable x (sneak peek), HC = Hardcap"],
                ["display-text", "Insanitycaps - Occurs to Rebirth at e5e15 effect. It is way stronger than all other caps, at a ^0.2 power!"],
                ["display-text", "There will be a 2nd tree. However, this only happens in Era 3. Up to 30 rows per tree. Don't complain. There is a scrollwheel. At least its not 100 rows"],
            ],
            unlocked() {return player.era.points.gte(1)},
        },
    },
    automate() {
		if (hasMilestone('sac', 89)) {
			if (layers.era.buyables[11].canAfford()) {
				layers.era.buyables[11].buy();
			};
		};
        if (hasMilestone('sac', 89)) {
			if (layers.era.buyables[12].canAfford()) {
				layers.era.buyables[12].buy();
			};
		};
	},
    milestones: {
        1: {
            requirementDescription: "Era One. The start of a new journey.",
            effectDescription: "Start generating Era Crystals, Unlock new tabs. Unlock Auto Sac. ^1.004 PF. Auto-complete SA31 if you have not already.",
            done() { return player["era"].points.gte(1) },
        },
        2: {
            requirementDescription: "Era Two: What's there to come?",
            effectDescription: "Keep Mega Milestones and Buyables on era reset, ^1.015 PF, Less sac scaling, x50 Era Crystals, Unlock more Era Crystal Upgrades and a new DS...",
            done() { return player["era"].points.gte(2) },
            unlocked() { return player["era"].points.gte(1) },
        },
        3: {
            requirementDescription: "Era Three: What more?",
            effectDescription: "Keep all upgrades, milestones and buyables on era reset (excluding sacrifice milestones), ^1.025 PF, x3333 EC, Less Sac Scaling, More EC Ups",
            done() { return player["era"].points.gte(3) },
            unlocked() { return player["era"].points.gte(2) },
        },
    },
    upgrades: {
        11: {
            title: "ErUp 1: The first tree upgrade...?",
            description: "x2 Era Crystals",
            cost: new Decimal(600),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['21', '22', '23']
        },
        21: {
            title: "ErUp 3A: To the left",
            description: "xe5B PF",
            cost: new Decimal(4000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['31', '32', '41'],
            unlocked() {return hasUpgrade("era", 22)}
        },
        22: {
            title: "ErUp 2: Branch??",
            description: "x3 Era Crystals",
            cost: new Decimal(1250),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['21', '23', '31', '32'],
            unlocked() {return hasUpgrade("era", 11)}
        },
        23: {
            title: "ErUp 3B: To the right",
            description: "+^0.05 Water",
            cost: new Decimal(3500),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['31', '32', '44'],
            unlocked() {return hasUpgrade("era", 22)}
        },
        31: {
            title: "ErUp 4A: More Era Crystals, yay!",
            description: "x2 Era Crystals",
            cost: new Decimal(5000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['41', '42', '43', '44', '51'],
            unlocked() {return (hasUpgrade("era", 21) && hasUpgrade("era", 22) && hasUpgrade("era", 23))}
        },
        32: {
            title: "ErUp 4B: Even More Era Crystals",
            description: "x1.5 Era Crystals",
            cost: new Decimal(769),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['41', '42', '43', '44', '52'],
            unlocked() {return (hasUpgrade("era", 21) && hasUpgrade("era", 22) && hasUpgrade("era", 23))}
        },
        41: {
            title: "ErUp 5A: Small PF Power",
            description: "^1.003 PF",
            cost: new Decimal(23000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52', '61'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        42: {
            title: "ErUp 5B: Small EC Mult",
            description: "x1.3 Era Crystals",
            cost: new Decimal(17500),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        43: {
            title: "ErUp 5C: Stronk Buyable (M)",
            description: "Mega Buyables 1-3 are stronger",
            cost: new Decimal(25000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        44: {
            title: "ErUp 5D: Stronk Buyable (S)",
            description: "Supreme Buyables 1-4 are stronger",
            cost: new Decimal(25000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52', '64'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        51: {
            title: "ErUp 6A: Powering It Up!",
            description: "^1.0075 PF",
            cost: new Decimal(30000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['61', '62', '63', '64', '71'],
            unlocked() {return (hasUpgrade("era", 41) && hasUpgrade("era", 42) && hasUpgrade("era", 43) && hasUpgrade("era", 44))}
        },
        52: {
            title: "ErUp 6B: Supreme Extension! And something else",
            description: "xe20B PF",
            cost: new Decimal(33000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['61', '62', '63', '64', '73'],
            unlocked() {return (hasUpgrade("era", 41) && hasUpgrade("era", 42) && hasUpgrade("era", 43) && hasUpgrade("era", 44))}
        },
        61: {
            title: "ErUp 7A: Era Rep Up 1",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        62: {
            title: "ErUp 7B: Era Rep Up 2",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        63: {
            title: "ErUp 7C: Era Rep Up 3",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        64: {
            title: "ErUp 7D: Era Rep Up 4",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        71: {
            title: "ErUp 8A",
            description: "Add +^0.008 to SB5 cap",
            cost: new Decimal(999999),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        72: {
            title: "ErUp 8B",
            description: "^1.01 PF",
            cost: new Decimal(1333333),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        73: {
            title: "ErUp 8C",
            description: "xe60B PF",
            cost: new Decimal(1111111),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        74: {
            title: "ErUp 8D",
            description: "x4 Era Crystals",
            cost: new Decimal(987),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        81: {
            title: "ErUp 10A",
            description: "Mega base effect is better",
            cost: new Decimal(37.5e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '101', '111', '112'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        82: {
            title: "ErUp 10B",
            description: "xe200B PF",
            cost: new Decimal(40e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '101', '111', '112'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        83: {
            title: "ErUp 9",
            description: "x5 Era Crystals",
            cost: new Decimal(7777777),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        84: {
            title: "ErUp 10C",
            description: "SB5 Cap +^0.005",
            cost: new Decimal(35e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '103', '114', '115'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        85: {
            title: "ErUp 10D",
            description: "x1.25 Era Crystals",
            cost: new Decimal(35e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '103', '114', '115'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        91: {
            title: "ErUp 11",
            description: "x4 Era Crystals, ^1.005 PF, Extend Prestige Upgs [Cost: 60M Era Crystals + 1079 Sac]",
            costs: {
                sac: 1079,
                ec: 60e6
              },
              canAfford() {
                return player.sac.points.gte(this.costs.sac)
                    && player.era.ec.gte(this.costs.ec)
              },
              pay() {
                player.sac.points = player.sac.points.minus(this.costs.sac);
                player.era.ec = player.era.ec.minus(this.costs.ec);
              },
            branches: ['101', '102', '103'],
            unlocked() {return (hasUpgrade("era", 81) && hasUpgrade("era", 82) && hasUpgrade("era", 83) && hasUpgrade("era", 84)  && hasUpgrade("era", 85))}
        },
        101: {
            title: "ErUp 12A",
            description: "x1.4 Era Crystals",
            cost: new Decimal(1.7e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114', '115'],
            unlocked() {return hasUpgrade("prestige", 75)}
        },
        102: {
            title: "ErUp 12B",
            description: "SB5 HC +^0.0066",
            cost: new Decimal(2.8e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114', '115'],
            unlocked() {return hasUpgrade("prestige", 75)}
        },
        103: {
            title: "ErUp 12C",
            description: "Basic Upgrade 2 is stronger",
            cost: new Decimal(2.6e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114', '115'],
            unlocked() {return hasUpgrade("prestige", 75)}
        },
        111: {
            title: "ErUp 13A",
            description: "x1.13 Era Crystals",
            cost: new Decimal(2.4e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        112: {
            title: "ErUp 13B",
            description: "x2.8 EC, +^0.0066 SB5 HC",
            cost: new Decimal(1372),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        113: {
            title: "ErUp 13C",
            description: "Sac scaling is slightly weaker",
            cost: new Decimal(3.2e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        114: {
            title: "ErUp 13D",
            description: "xe200B PF",
            cost: new Decimal(2.6e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        115: {
            title: "ErUp 13E",
            description: "^1.01 PF",
            cost: new Decimal(3.75e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        123: {
            title: "ErUp 14",
            description: "The BEST UPGRADE: xE1T PF!!",
            branches: [],
            cost: new Decimal(1.11e10),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['122', '124', '131', '132', '133'],
            unlocked() {return (hasUpgrade("era", 111) && hasUpgrade("era", 112) && hasUpgrade("era", 113) && hasUpgrade("era", 114)  && hasUpgrade("era", 115))}
        },
        122: {
            title: "ErUp 15A",
            description: "Energy effect is better",
            cost: new Decimal(1.75e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 123)}
        },
        124: {
            title: "ErUp 15B",
            description: "Major amount of BP",
            cost: new Decimal(1.75e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['125', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 123)}
        },
        121: {
            title: "ErUp 16A",
            description: "xe10B MP",
            cost: new Decimal(2.25e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 122)}
        },
        125: {
            title: "ErUp 16B",
            description: "xe1T PF",
            cost: new Decimal(2.25e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['125', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 124)}
        },
        131: {
            title: "ErUp 18A",
            description: "SU21 [now every 1/25k sac is 2x], EU14 is stronger",
            cost: new Decimal(1.2e13),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['141', '142', '143'],
            unlocked() {return hasUpgrade("era", 132)}
        },
        132: {
            title: "ErUp 17",
            description: "+^0.005 SB5 HC, x7 Era Crystals",
            cost: new Decimal(1857),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['141', '142', '143'],
            unlocked() {return (hasUpgrade("era", 111) && hasUpgrade("era", 112) && hasUpgrade("era", 113) && hasUpgrade("era", 114)  && hasUpgrade("era", 115))}
        },
        133: {
            title: "ErUp 18B",
            description: "Water effect is stronger",
            cost: new Decimal(1.2e13),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['142', '143', '141'],
            unlocked() {return hasUpgrade("era", 132)}
        },
        141: {
            title: "ErUp 19",
            description: "Extend Rebirth Upgrades, ^1.006 PF",
            branches: ['142', '151', '152', '153', '154', '155'],
            cost: new Decimal(1.8e13),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 132) && hasUpgrade("era", 131) && hasUpgrade("era", 133))}
        },
        142: {
            title: "ErUp 20",
            description: "Sac scaling is weaker",
            cost: new Decimal(2.4e14),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['143', '151', '152', '153', '154', '155'],
            unlocked() {return hasUpgrade("era", 141)}
        },
        143: {
            title: "ErUp 21",
            description: "Unlock a new tab, and a new ??? [Cost: 2192 Sac and 3e14 (300T) Era Crystals",
            costs: {
                sac: new Decimal(2192),
                ec: new Decimal(3e14),
              },
              canAfford() {
                return player.sac.points.gte(this.costs.sac)
                    && player.era.ec.gte(this.costs.ec)
              },
              pay() {
                player.sac.points = player.sac.points.sub(this.costs.sac);
                player.era.ec = player.era.ec.sub(this.costs.ec);
              },
              branches: ['151', '152', '153', '154', '155'],
            unlocked() {return hasUpgrade("era", 142)}
        },
        153: {
            title: "ErUp 22: Compounding XII",
            description: "Era Crystals boost Era Crystals gain",
            cost: new Decimal(4e16),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['152', '154', '161','162','163','164'],
            unlocked() {return hasUpgrade("era", 143)},
            effect() {
                let eracompexp = 0.07
                if (hasUpgrade("era", 242)) eracompexp = 0.095
                if (hasUpgrade("era", 255)) eracompexp = 0.115
                return player["era"].ec.add(1).pow(eracompexp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        151: {
            title: "ErUp 24B",
            description: "+^0.05 MP",
            cost: new Decimal(2e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164'],
            unlocked() {return hasUpgrade("era", 152)}
        },
        152: {
            title: "ErUp 23",
            description: "SB5 HC +^0.005",
            cost: new Decimal(5e18),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164','151' ],
            unlocked() {return hasUpgrade("era", 153)}
        },
        154: {
            title: "ErUp 24A",
            description: "xe2.5T PF",
            cost: new Decimal(1.6e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164', '155'],
            unlocked() {return hasUpgrade("era", 153)}
        },
        155: {
            title: "ErUp 24C",
            description: "^1.01 PF",
            cost: new Decimal(2.5e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164'],
            unlocked() {return hasUpgrade("era", 154)}
        },
        162: {
            title: "ErUp 25A",
            description: "x1.11 Era Crystals",
            cost: new Decimal(1e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161', '171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 151) && (hasUpgrade("era", 155)))}
        },
        163: {
            title: "ErUp 25B",
            description: "xe10T PF",
            cost: new Decimal(3e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['164', '171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 151) && (hasUpgrade("era", 155)))}
        },
        161: {
            title: "ErUp 26A",
            description: "Extend Water Upgrades AND add NEW MILESTONES",
            cost: new Decimal(8e21),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 162))}
        },
        164: {
            title: "ErUp 26B",
            description: "xe20T PF",
            cost: new Decimal(1.3e22),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 163))}
        },
        173: {
            title: "ErUp 27",
            description: "Unlock Era Buyable 2",
            cost: new Decimal(6e23),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 161) && (hasUpgrade("era", 164)))}
        },
        172: {
            title: "ErUp 28A",
            description: "xe1T PP",
            cost: new Decimal(8.888e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 173) && (hasUpgrade("era", 164)))}
        },
        174: {
            title: "ErUp 28B",
            description: "xe11.11T RP",
            cost: new Decimal(8.888e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 173) && (hasUpgrade("era", 164)))}
        },
        171: {
            title: "ErUp 29A",
            description: "xe50T BP, x1.4 Era Crystals",
            cost: new Decimal(9.999e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 172) && (hasUpgrade("era", 174)))}
        },
        175: {
            title: "ErUp 29B",
            description: "xe77.77B MP, x1.4 Era Crystals",
            cost: new Decimal(1.123e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 172) && (hasUpgrade("era", 174)))}
        },
        181: {
            title: "ErUp 30A",
            description: "^1.0111 PF",
            cost: new Decimal(2e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194', '205'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        182: {
            title: "ErUp 30B",
            description: "+^0.055 BP",
            cost: new Decimal(1e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        183: {
            title: "ErUp 30C",
            description: "+^0.07 RP",
            cost: new Decimal(1.2e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        184: {
            title: "ErUp 30D",
            description: "+^0.12 PP",
            cost: new Decimal(1.25e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        185: {
            title: "ErUp 30E",
            description: "+^0.12 MP",
            cost: new Decimal(1.2e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194', '205'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        191: {
            title: "ErUp 31",
            description: "x47.5 EC",
            cost: new Decimal(4754),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 181) && hasUpgrade("era", 182) && hasUpgrade("era", 183) && hasUpgrade("era", 184) && hasUpgrade("era", 185))}
        },
        192: {
            title: "ErUp 32A",
            description: "x1.3 EC, +^0.003 SB5 HC",
            cost: new Decimal(1.5e38),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 191))}
        },
        193: {
            title: "ErUp 32B",
            description: "x1.3 EC, +^0.003 SB5 HC",
            cost: new Decimal(1.5e38),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 191))}
        },
        194: {
            title: "ErUp 33",
            description: "xe33T PF",
            cost: new Decimal(2.5e39),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 192) && hasUpgrade("era", 193))}
        },
        201: {
            title: "ErUp 34A",
            description: "xe20T PF",
            cost: new Decimal(4.5e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        202: {
            title: "ErUp 34B",
            description: "x1.6 EC",
            cost: new Decimal(6e41),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        203: {
            title: "ErUp 34C",
            description: "All Mega Buyables are better",
            cost: new Decimal(7e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        204: {
            title: "ErUp 34D",
            description: "+^0.1 PP",
            cost: new Decimal(5e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        205: {
            title: "ErUp 34E",
            description: "+^0.1 MP",
            cost: new Decimal(5e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        211: {
            title: "ErUp 35: This row will have longer waits, BUT BETTER BOOSTS!",
            description: "x2 EC, ^1.007 PF",
            cost: new Decimal(1e43),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224', '241'],
            unlocked() {return (hasUpgrade("era", 201) && hasUpgrade("era", 202) && hasUpgrade("era", 203) && hasUpgrade("era", 204) && hasUpgrade("era", 205))}
        },
        212: {
            title: "ErUp 36",
            description: "Era Buyable 1 effect increased from 2x to 2.5x per buy",
            cost: new Decimal(2e43),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224'],
            unlocked() {return (hasUpgrade("era", 211))}
        },
        213: {
            title: "ErUp 37",
            description: "x2 EC, xe37T PF",
            cost: new Decimal(1.25e46),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224'],
            unlocked() {return (hasUpgrade("era", 212))}
        },
        214: {
            title: "ErUp 38A",
            description: "Decrease Sacrifice Scaling by quite a lot",
            cost: new Decimal(1.5e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224'],
            unlocked() {return (hasUpgrade("era", 213))}
        },
        215: {
            title: "ErUp 38B",
            description: "^1.01 PF",
            cost: new Decimal(1.5e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224', '245'],
            unlocked() {return (hasUpgrade("era", 213))}
        },
        221: {
            title: "ErUp 39A: Hardening III",
            description: "Remember Hardening I and II? Hardening III Gives: SB1 and SB6 is stronger",
            cost: new Decimal(2e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        222: {
            title: "ErUp 39B",
            description: "+^0.07 MP",
            cost: new Decimal(1.5e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        223: {
            title: "ErUp 39C",
            description: "SB5 HC +^0.01",
            cost: new Decimal(1.9e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        224: {
            title: "ErUp 39D",
            description: "xe750B MP",
            cost: new Decimal(1.9e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        231: {
            title: "ErUp 40",
            description: "Era Buyable 1 effect increased from 2.5x to 3x per buy; Extend Basic Upgrades, +^0.025 BP",
            cost: new Decimal(7e49),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 221) && hasUpgrade("era", 222) && hasUpgrade("era", 223) && hasUpgrade("era", 224))}
        },
        232: {
            title: "ErUp 41",
            description: "SB5 HC +^0.03",
            cost: new Decimal(14210),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 231))}
        },
        233: {
            title: "ErUp 42A",
            description: "Triggering a tsunami: xe50M Water",
            cost: new Decimal(4e55),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 232))}
        },
        234: {
            title: "ErUp 42B",
            description: "^1.005 PF",
            cost: new Decimal(5e55),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 232))}
        },
        241: {
            title: "ErUp 43: ECExp",
            description: "^1.02 Era Crystals",
            cost: new Decimal(4.5e55),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 233) && hasUpgrade("era", 234))}
        },
        242: {
            title: "ErUp 44: ECComp",
            description: "'Compounding XII' is stronger",
            cost: new Decimal(5e56),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 241))}
        },
        243: {
            title: "ErUp 45: EB2+ (1)",
            description: "Era Buyable 2 effect increased from 5x to 6x a buy",
            cost: new Decimal(1.5e58),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 242))}
        },
        244: {
            title: "ErUp 46: EB2+ (2)",
            description: "Era Buyable 2 effect increased from 6x to 7x a buy",
            cost: new Decimal(1.75e61),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 243))}
        },
        245: {
            title: "ErUp 47: Major Stat Boost + Extension?",
            description: "xe350T PF, Sac Scaling is weaker, Mastery Extension?? (1 row only)",
            cost: new Decimal(6e62),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 244))}
        },
        251: {
            title: "Stronger Boosts Series (1)",
            description: "SU51 is stronger",
            cost: new Decimal(4.5e66),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("m", 105))}
        },
        252: {
            title: "Stronger Boosts Series (2)",
            description: "WU13 is stronger",
            cost: new Decimal(4.5e66),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 251))}
        },
        253: {
            title: "Stronger Boosts Series (3)",
            description: "EU71 is stronger",
            cost: new Decimal(6e67),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 252))}
        },
        254: {
            title: "Stronger Boosts Series (4)",
            description: "PU22 is stronger",
            cost: new Decimal(8e67),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 253))}
        },
        255: {
            title: "Stronger Boosts Series (5)",
            description: "'Compounding XII' is stronger",
            cost: new Decimal(9e67),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 254))}
        },
        261: {
            title: "Stronger Boosts Series (6)",
            description: "MU42 is stronger",
            cost: new Decimal(2.7e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 255))}
        },
        262: {
            title: "Stronger Boosts Series (7)",
            description: "BU82 is stronger",
            cost: new Decimal(3e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 261))}
        },
        263: {
            title: "Stronger Boosts Series (8)",
            description: "BU21 is stronger",
            cost: new Decimal(3.2e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 262))}
        },
        264: {
            title: "Stronger Boosts Series (9)",
            description: "Mega Supercap is weaker",
            cost: new Decimal(3.8e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 263))}
        },
        265: {
            title: "Stronger Boosts Series (FINAL)",
            description: "MU31 is better.",
            cost: new Decimal(4.3e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 264))}
        },
        271: {
            title: "ErUp 58: Even more EC!",
            description: "^1.02 EC",
            cost: new Decimal(3e72),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 265))}
        },
        272: {
            title: "ErUp 59A",
            description: "Sac scaling weaker",
            cost: new Decimal(1.4e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        273: {
            title: "ErUp 59B: More SP = More MP = More Sac = More PF",
            description: "+^0.125 SP",
            cost: new Decimal(1.4e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        274: {
            title: "ErUp 59C",
            description: "+^0.09 Water",
            cost: new Decimal(1.3e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        275: {
            title: "ErUp 59D",
            description: "^1.01 PF, Extend Energy Upgrades",
            cost: new Decimal(1.8e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        281: {
            title: "ErUp 60: Highest EVER EC Mult!",
            description: "x1,000 Era Crystals",
            cost: new Decimal(1.8e78),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 272) && hasUpgrade("era", 273) && hasUpgrade("era", 274) && hasUpgrade("era", 275))}
        },
        282: {
            title: "ErUp 61A",
            description: "xe70B Energy",
            cost: new Decimal(4.7e81),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 281))}
        },
        283: {
            title: "ErUp 61B",
            description: "xe1.25e16 BP",
            cost: new Decimal(5.5e81),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 281))}
        },
        284: {
            title: "ErUp 61C",
            description: "xe5e15 PF",
            cost: new Decimal(6.9e81),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 281))}
        },
        285: {
            title: "ErUp 62: The Last Upgrade before Era 3.",
            description: "^1.01 PF!",
            cost: new Decimal(1.5e83),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 282) && hasUpgrade("era", 283) && hasUpgrade("era", 284))}
        },
    },
    buyables: {
        11: {
            title: "Era Buyable 1: Booster",
            unlocked() { return (hasUpgrade('era', 143)) },
            cost(x) {
                let exp2 = new Decimal(1.135)
                return new Decimal(1e14).mul(Decimal.pow(1.15, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(2)
                if (hasUpgrade("era", 212)) base1 = new Decimal(2.5)
                if (hasUpgrade("era", 231)) base1 = new Decimal(3)
                let base2 = x
                let expo = new Decimal(1.003)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
        12: {
            title: "Era Buyable 2: Booster Plus",
            unlocked() { return (hasUpgrade('era', 173)) },
            cost(x) {
                let exp2 = new Decimal(1.215)
                return new Decimal(5e23).mul(Decimal.pow(1.15, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(5)
                if (hasUpgrade("era", 243)) base1 = new Decimal(6)
                if (hasUpgrade("era", 244)) base1 = new Decimal(7)
                let base2 = x
                let expo = new Decimal(1.01)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
    },
    color: "brown",
    requires: new Decimal(761), // Can be a function that takes requirement increases into account
    resource: "Eras", // Name of currency
    baseResource: "Sacrifices", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.4, 
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: ERA!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["w", "sac", "s", "m"],
    update(diff) {
        if (hasMilestone("era", 1)) {
            let gain = new Decimal(15)
            if (hasUpgrade('era', 143)) gain = gain.times(buyableEffect('era', 11))
            if (hasUpgrade('era', 173)) gain = gain.times(buyableEffect('era', 12))
            
            // upgs
            if (hasUpgrade('era', 153)) gain = gain.times(upgradeEffect('era', 153))
            if (hasUpgrade("era", 11)) gain = gain.times(2)
            if (hasUpgrade("era", 22)) gain = gain.times(3)
            if (hasUpgrade("era", 31)) gain = gain.times(2)
            if (hasUpgrade("era", 32)) gain = gain.times(1.5)
            if (hasUpgrade("era", 42)) gain = gain.times(1.3)
            if (hasUpgrade("era", 61)) gain = gain.times(1.3)
            if (hasUpgrade("era", 62)) gain = gain.times(1.3)
            if (hasUpgrade("era", 63)) gain = gain.times(1.3)
            if (hasUpgrade("era", 64)) gain = gain.times(1.3)
            if (hasUpgrade("s", 114)) gain = gain.times(15)
            if (hasUpgrade("era", 74)) gain = gain.times(4)
            if (hasUpgrade("era", 83)) gain = gain.times(5)
            if (hasUpgrade("era", 85)) gain = gain.times(1.25)
            if (hasUpgrade("era", 91)) gain = gain.times(4)
            if (hasUpgrade("era", 101)) gain = gain.times(1.4)
            if (hasUpgrade("era", 111)) gain = gain.times(1.13)
            if (hasUpgrade("era", 112)) gain = gain.times(2.8)
            if (hasUpgrade("era", 132)) gain = gain.times(7)
            if (hasUpgrade("era", 162)) gain = gain.times(1.11)
            if (hasUpgrade("era", 171)) gain = gain.times(1.4)
            if (hasUpgrade("era", 175)) gain = gain.times(1.4)
            if (hasUpgrade("era", 191)) gain = gain.times(47.5)
            if (hasUpgrade("era", 192)) gain = gain.times(1.3)
            if (hasUpgrade("era", 193)) gain = gain.times(1.3)
            if (hasUpgrade("era", 202)) gain = gain.times(1.6)
            if (hasUpgrade("era", 211)) gain = gain.times(2)
            if (hasUpgrade("era", 213)) gain = gain.times(2)
            if (hasUpgrade("era", 281)) gain = gain.times(1000)
            if (hasUpgrade("prestige", 75)) gain = gain.times(17)
            if (hasMilestone("era", 2)) gain = gain.times(50)
            if (hasMilestone("era", 3)) gain = gain.times(3333)
            if (hasMilestone("sac", 80)) gain = gain.times(4)
            if (hasUpgrade("rebirth", 85)) gain = gain.times(18)
            if (hasMilestone("sac", 84)) gain = gain.times(25)
            if (hasMilestone("sac", 85)) gain = gain.times(30)
            if (hasUpgrade("s", 115)) gain = gain.times(115)
            if (hasMilestone("sac", 92)) gain = gain.times(100)
            if(hasMilestone("sac", 93)) gain = gain.times(15)
            if(hasMilestone("sac", 94)) gain = gain.times(180)
            if (hasUpgrade("basic", 115)) gain = gain.times(115)
            if (hasUpgrade("m", 105)) gain = gain.times(105)
            if (hasUpgrade("e", 155)) gain = gain.times(250)
            if(hasMilestone("sac", 97)) gain = gain.times(280)
            if (hasAchievement('sa', 32)) gain = gain.times(1.03)
            if (hasAchievement('sa', 34)) gain = gain.times(1.03)
            if (hasAchievement('sa', 35)) gain = gain.times(1.05)
            if (hasAchievement('sa', 36)) gain = gain.times(1.1)


            // power
            if (hasUpgrade("era", 241)) gain = gain.pow(1.02)
            if (hasUpgrade("era", 271)) gain = gain.pow(1.02)

            // statements above this line
            player.era.ecg = gain
            gain = gain.times(diff)
            player.era.ec = player.era.ec.add(gain)
        }
    },
})