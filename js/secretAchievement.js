addLayer("sa", {
    startData() { return {
        unlocked: true,
        minigameNum: new Decimal(1),
        pdx: new Decimal(0),
        bp: new Decimal(0)
    }},
    color: "grey",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Secret Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
                "blank", 
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
            ],
        },
        "Minigame": {
            content: [
                ["clickables", [1, 2, 3, 4, 5, 6, 7, 8]],
                "blank",
                "blank",
                ["achievements", [11, 12, 13, 14, 15, 16, 17]],
            ],
        },
    },
    achievements: {
        rows: 11,
        cols: 6,
        11: {
            name: "Aquarium-like",
            done() {
                if (options.theme == "aqua") {
                    return true
                }
            },
            tooltip() {
                if (hasAchievement('sa', 11)) {
                    return "Switch to aqua mode"
                }
                else {
                    return "Peace and quiet"
                }
            },
        },
        12: {
            name: "Ahh!! My eyes!",
            done() {
                 if (options.theme == "light") {
                    return true
                 }
            },
            tooltip() {
                if (hasAchievement('sa', 12)) {
                    return "Switch to light mode."
                }
                else {
                    return "really blinding"
                }
            },
        },
        13: {
            name: "The intended way to play",
            done() {
                 if(options.offlineProd == false) {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 13)) {
                    return "Turn off offline progress"
                }
                else {
                    return "In Settings"
                }
            },
        },
        14: {
            name: "Not annoying anymore",
            done() {
                if(options.hideMilestonePopups == true) {
                   return true
                }
               },
           tooltip() {
               if (hasAchievement('sa', 14)) {
                   return "Hide popups"
               }
               else {
                   return "In Settings"
               }
           },
        },
        15: {
            name: "Infinite possibilities",
            done() {
                if(options.notation == 'infinity') {
                   return true
                }
               },
           tooltip() {
               if (hasAchievement('sa', 15)) {
                   return "Infinite Notation"
               }
               else {
                   return "Antimatter Dimensions"
               }
           },
        },
        16: {
            name: "Verdantly beautiful",
            done() {
                 if(options.theme == "verdant") {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 16)) {
                    return "Switch to Verdant theme"
                }
                else {
                    return "Trees."
                }
            },
        },
        21: {
            name: "no rebirth basic",
            done() {
                 if(player.rebirth.best.lte(0)) {
                    if (player.points.gte(5e8)) {
                        return true
                    }
                 }
            },
            tooltip() {
                if (hasAchievement('sa', 21)) {
                    return "Req: 5e8 PF, without any best RP. (Reward: x1.1 RP)"
                }
                else {
                    return "no rebirth get point (Reward: x1.1 RP)"
                }
            },
        },
        22: {
            name: "no rebirth rebirth",
            done() {
                 if(player.rebirth.best.lte(0)) {
                    if (player.points.gte(4e9)) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 22)) {
                    return "Req: 4e9 PF, without any best RP. (Reward: x1.25 RP)"
                }
                else {
                    return "=XReb (Reward: x1.25 RP)"
                }
            },
        },
        23: {
            name: "e78,000 PF but... (find the catch)",
            done() {
                 if(player.sac.best.lte(1)) {
                    if (player.points.gte("e78000")) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 23)) {
                    return "Req: e78K PF, with less than 2 Sacrifice. (Reward: x1.2 MP)"
                }
                else {
                    return "e78000 point fragments. (Reward: x1.2 MP)"
                }
            },
        },
        24: {
            name: "It's just e250 higher. What's the big deal?",
            done() {
                if (!(hasChallenge('sac', 13))) {
                    if (inChallenge("sac", 13)) {
                        if (player.points.gte("e191450")) {
                            return true
                        }
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 24)) {
                    return "Req: In Sac Challenge 3, without completing it before, get e191,450 PF. (Reward: x1.1 Energy)"
                }
                else {
                    return "soCmething3. (Reward: x1.1 Energy)"
                }
            },
        },
        25: {
            name: ".--- ..- ... - / ... - .- .-.. .-.. / ... ..- .--. .-. . -- .",
            done() {
                if(player.s.best.lte(0)) {
                   if (player.points.gte("e152980000")) {
                       return true
                   }
                }
            },
            tooltip() {
                if (hasAchievement('sa', 25)) {
                    return "Req: Get e152,980,000 PF, without any supreme (Reward: x1.04 SP)"
                }
                else {
                    return "Morse Code (Reward: x1.04 SP)"
                }
            },
        },
        26: {
            name: "Something to do with DS3, well, we gotta wait and see",
            done() {
                if(!(hasUpgrade('prestige', 55))) {
                   if (player.points.gte("e388100000")) {
                       return true
                   }
                }
            },
            tooltip() {
                if (hasAchievement('sa', 26)) {
                    return "Req: Before Getting Pres Upg 55, get e388.1M PF. (Reward: x1.05 SP)"
                }
                else {
                    return " (Reward: x1.05 SP)"
                }
            },
        },
        31: {
            name: "I'm scared of this imminent thing. Let's not.",
            done() {
                if(!(hasChallenge('m', 11))) {
                    if (player.m.points.gte(100000)) {
                        return true
                    }
                }
                if (hasMilestone("era", 1)) {
                    return true
                }
            },
            tooltip() {
                if (hasAchievement('sa', 31)) {
                    return "Get 100K Mastery Points without completing the Mastery Challenge [OR GET ERA 1] (Reward: x1.05 Mastery Points)"
                }
                else {
                    return "(Reward: x1.05 Mastery Points)"
                }
            },
        },
        32: {
            name: "Stall before Era Layer.",
            done() {
                 if(!(player.era.points.gte(1))) {
                    if (player.points.gte("e29245225e6")) {
                        return true
                    }
                 }
                 if (hasAchievement("a", 243)) {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 32)) {
                    return "Get e29,245,225e6 PF before Era 1 (Reward: x1.03 Era Crystals)"
                }
                else {
                    return "It is also High Endgame in v2.5! (Reward: x1.03 Era Crystals)"
                }
            },
        },
        33: {
            name: "Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e2.96732323e21")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 33)) {
                    return "Congrats! You have reached endgame at least once. (Reward: x1.2 Water and SP)"
                }
                else {
                    return "Reach Endgame. (Reward: x1.2 Water and SP)"
                }
            },
        },
        34: {
            name: "High Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e2.967375e21")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 34)) {
                    return "Congrats! You have reached high endgame at least once. (Reward: x1.03 Era Crystals, x1.01 Mastery Points)"
                }
                else {
                    return "Reach High Endgame. (Reward: x1.03 Era Crystals, x1.01 Mastery Points)"
                }
            },
        },
        35: {
            name: "Absolute True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e2.96741721e21")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 35)) {
                    return "Congrats! You have reached Absolute True endgame at least once. (Reward: x1.05 Era Crystals, x1.03 Mastery Points)"
                }
                else {
                    return "Reach Absolute True Endgame. (Reward: x1.05 Era Crystals, x1.03 Mastery Points)"
                }
            },
        },
        36: {
            name: "Insanity True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e2.96755315e21")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 36)) {
                    return "Congrats! You have reached Insanity True endgame at least once. This will be the best endgame tier! (Reward: x1.1 Era Crystals, x1.07 Mastery Points)"
                }
                else {
                    return "Reach Insanity True Endgame. (Reward: x1.1 Era Crystals, x1.07 Mastery Points)"
                }
            },
        },
        111: {
            name: "Reach the nice number",
            done() {
                   if ((player.sa.minigameNum.gte(68.9999)) && (player.sa.minigameNum.lte(69.0001))) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 111)) {
                    return "nice"
                }
                else {
                    return "Which numbers do you think is nice?"
                }
            },
        },
        112: {
            name: "Reach the leet number",
            done() {
                   if ((player.sa.minigameNum.gte(1336.999)) && (player.sa.minigameNum.lte(1337.001))) {
                        if (hasAchievement("sa", 111)) {
                            return true
                        }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 112)) {
                    return "very nsfw"
                }
                else {
                    return "hint: 4 digits"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 111)) return true
            }
        },
        113: {
            name: "Reach the very nice number",
            done() {
                   if ((player.sa.minigameNum.gte(69419.999)) && (player.sa.minigameNum.lte(69420.001))) {
                    if (hasAchievement("sa", 112)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 113)) {
                    return "very nice (Reward: Add a x69 button)"
                }
                else {
                    return "Which numbers do you think is very nice?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 112)) return true
            }
        },
        114: {
            name: "Reach the Dragon Ball Z number",
            done() {
                   if ((player.sa.minigameNum.gte(9000.99)) && (player.sa.minigameNum.lte(9001.001))) {
                    if (hasAchievement("sa", 113)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 114)) {
                    return "funny?"
                }
                else {
                    return "It's over ___! (add 1 to it)"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 113)) return true
            }
        },
        115: {
            name: "Reach the Insanity Number (10^69)",
            done() {
                   if ((player.sa.minigameNum.gte(9.999e68)) && (player.sa.minigameNum.lte(1.0001e69))) {
                    if (hasAchievement("sa", 114)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 115)) {
                    return "funny?"
                }
                else {
                    return "now 10^"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 114)) return true
            }
        },
        116: {
            name: "Reach the ULTIMATE LEET Number",
            done() {
                   if ((player.sa.minigameNum.gte("9.99e1336")) && (player.sa.minigameNum.lte("1.01e1337"))) {
                    if (hasAchievement("sa", 115)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 116)) {
                    return "funny? [Reward: get a x911 button and a /3 button]"
                }
                else {
                    return "now 10^"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 115)) return true
            }
        },
        121: {
            name: "Exceeding 10^10",
            done() {
                   if (player.sa.minigameNum.gte(1e10)) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 121)) {
                    return "a bit big"
                }
                else {
                    return "more"
                }
            },
        },
        122: {
            name: "Exceeding 10^100",
            done() {
                   if (player.sa.minigameNum.gte(1e100)) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 122)) {
                    return "big"
                }
                else {
                    return "even more"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 121)) return true
            }
        },
        123: {
            name: "Exceeding 10^1,000",
            done() {
                   if (player.sa.minigameNum.gte("1e1000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 123)) {
                    return "very big"
                }
                else {
                    return "way more"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 122)) return true
            }
        },
        124: {
            name: "Exceeding 10^4,000",
            done() {
                   if (player.sa.minigameNum.gte("1e4000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 124)) {
                    return "hugely big"
                }
                else {
                    return "grind"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 123)) return true
            }
        },
        125: {
            name: "Exceeding 10^10,000",
            done() {
                   if (player.sa.minigameNum.gte("1e10000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 125)) {
                    return "insanely big (Reward: x1e10 button)"
                }
                else {
                    return "very grindy"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 124)) return true
            }
        },
        126: {
            name: "Exceeding 10^50,000",
            done() {
                   if (player.sa.minigameNum.gte("1e50000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 126)) {
                    return "insanely big (Reward: x3, /2 button)"
                }
                else {
                    return "grind ^2"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 125)) return true
            }
        },
        131: {
            name: "Reach 0.6328125",
            done() {
                   if ((player.sa.minigameNum.gte(0.632812)) && (player.sa.minigameNum.lte(0.632813))) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 131)) {
                    return "good job [1/5 HARD]"
                }
                else {
                    return "how do you get below 1?? Hint: Hard achievements require working backwards, and using different operations."
                }
            },
        },
        132: {
            name: "Reach 0.134765625",
            done() {
                   if ((player.sa.minigameNum.gte(0.13476562)) && (player.sa.minigameNum.lte(0.13476563))) {
                    if (hasAchievement("sa", 131)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 132)) {
                    return "good job [2/5 HARD]"
                }
                else {
                    return "how so specific?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 131)) return true
            }
        },
        133: {
            name: "Reach 446.34375",
            done() {
                   if ((player.sa.minigameNum.gte(446.3437)) && (player.sa.minigameNum.lte(446.3438))) {
                    if (hasAchievement("sa", 132)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 133)) {
                    return "good job [3/5 HARD] (Reward: x10 button)"
                }
                else {
                    return "how?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 132)) return true
            }
        },
        134: {
            name: "Reach 3.74897119 [some buffer] {When all previous achievements are done, Unlock The LAST HARD ACHIEVEMENT.}",
            done() {
                if ((player.sa.minigameNum.gte(3.74897)) && (player.sa.minigameNum.lte(3.748972))) {
                    if (hasAchievement("sa", 133)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 134)) {
                    return "good job [4/5 HARD]"
                }
                else {
                    return "how?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 133)) return true
            }
        },
        135: {
            name: "Reach 1e-200 and lower.",
            done() {
                if (player.sa.minigameNum.lte(1e-200)) {
                    if(hasAchievement("sa", 134) && hasAchievement("sa", 126) && hasAchievement("sa", 116)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 135)) {
                    return "good job [ALL HARD COMPLETE], Unlock ^1.01 button, ^0.99 button"
                }
                else {
                    return "how?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 134) && hasAchievement("sa", 126) && hasAchievement("sa", 116)) return true
            }
        },
        136: {
            name: "Reach 3.029679879579 [some buffer] (Extreme 01/07)",
            done() {
                if ((player.sa.minigameNum.gte(3.02967987)) && (player.sa.minigameNum.lte(3.02967988))) {
                    if (hasAchievement("sa", 146)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 136)) {
                    return "good job [Extreme 01]"
                }
                else {
                    return "Hint: 7 buttons [not including =1], usage of ^0.99 needed"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 146)) return true
            }
        },
        141: {
            name: "Even higher (e1M)",
            done() {
                   if (player.sa.minigameNum.gte("ee6")) {
                    if (hasAchievement("sa", 135)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 141)) {
                    return "megaly big"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 135)) return true
            }
        },
        142: {
            name: "Even higher (e1B)",
            done() {
                   if (player.sa.minigameNum.gte("ee9")) {
                    if (hasAchievement("sa", 141)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 142)) {
                    return "supremely big"
                }
                else {
                    return "grind starts"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 141)) return true
            }
        },
        143: {
            name: "Even higher (e1 Qt)",
            done() {
                   if (player.sa.minigameNum.gte("ee18")) {
                    if (hasAchievement("sa", 142)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 143)) {
                    return "very insanely big (Reward: Unlock ^1.1 button)"
                }
                else {
                    return "long time, isn't it?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 142)) return true
            }
        },
        144: {
            name: "Even higher (ee75)",
            done() {
                   if (player.sa.minigameNum.gte("ee75")) {
                    if (hasAchievement("sa", 143)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 144)) {
                    return "breaking bounds"
                }
                else {
                    return "passing EEs like nothing"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 143)) return true
            }
        },
        145: {
            name: "Even higher (ee200)",
            done() {
                   if (player.sa.minigameNum.gte("ee200")) {
                    if (hasAchievement("sa", 144)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 145)) {
                    return "breaking bounds"
                }
                else {
                    return "theres more???"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 144)) return true
            }
        },
        146: {
            name: "LAST ACHIEVEMENT WOW FOR MINIGAME (EE500)",
            done() {
                   if (player.sa.minigameNum.gte("ee500")) {
                    if (hasAchievement("sa", 145)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 146)) {
                    return "now get all titles [Reward: ^2 button!! and /7]"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 145)) return true
            }
        },
        151: {
            name: "Reach 8.856444797045 [some buffer] (Extreme 02/07)",
            done() {
                if ((player.sa.minigameNum.gte(8.8564447970)) && (player.sa.minigameNum.lte(8.8564447971))) {
                    if (hasAchievement("sa", 136)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 151)) {
                    return "nicely done [Extreme 02]. Unlock /10 button"
                }
                else {
                    return "Hint: 1 button, then press and hold a button"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 136)) return true
            }
        },
        152: {
            name: "Reach pi (wait what, pi??) yes, to 15 digits [3.14159265358979] (Extreme 03/07)",
            done() {
                if ((player.sa.minigameNum.gte(3.14159265358979)) && (player.sa.minigameNum.lte(3.1415926535898))) {
                    if (hasAchievement("sa", 151)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 152)) {
                    return "nicely done [Extreme 03] Unlock pdx value show up"
                }
                else {
                    return "Hint: Only need 2 unique buttons!"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 151)) return true
            }
        },
        153: {
            name: "Get less than 1.0000000001, and more than 1.000000000001, without using more than 3 pdx.",
            done() {
                if ((player.sa.minigameNum.lte(1.0000000001)) && (player.sa.minigameNum.gte(1.000000000001)) && (player.sa.pdx.lte(3))) {
                    if (hasAchievement("sa", 152)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 153)) {
                    return "nicely done [Extreme 04]"
                }
                else {
                    return "Hint: 1 button, then press and hold a button"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 152)) return true
            }
        },
        154: {
            name: "Get less than 1e-1e20",
            done() {
                let MNL = player.sa.minigameNum.layer
                let MNM = player.sa.minigameNum.mag
                if ((MNL >= 2) && (MNM < -20)) {
                    if (hasAchievement("sa", 153)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 154)) {
                    return "nicely done [Extreme 05] Unlock ^10 button :)"
                }
                else {
                    return "might take a while"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 153)) return true
            }
        },
        155: {
            name: "Astronomical (ee70k)",
            done() {
                   if (player.sa.minigameNum.gte("ee70000")) {
                    if (hasAchievement("sa", 154)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 155)) {
                    return "insane [unlock: ^1e10 button]"
                }
                else {
                    return "thats crazy [Extreme 06]"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 154)) return true
            }
        },
        156: {
            name: "UTTER INSANITY (ee1.5M)",
            done() {
                   if (player.sa.minigameNum.gte("ee1.5e6")) {
                    if (hasAchievement("sa", 155)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 156)) {
                    return "stupidly insane [unlock: ^e250 button, -0.01 button, x1.01 PF!!!! wow thats a lot of boosts!!]"
                }
                else {
                    return "who would grind this? [Extreme 07]"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 155)) return true
            }
        },
        161: {
            name: "-Infinity (-1.797693e308, -2^1024)",
            done() {
                   if ((player.sa.minigameNum.gte("-1.797694e308")) && (player.sa.minigameNum.lte("-1.797693e308"))) {
                    if (hasAchievement("sa", 156)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 161)) {
                    return "Row 6: Into the negatives"
                }
                else {
                    return "Negative Error?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 156)) return true
            }
        },
        162: {
            name: "Get -2284.73015 (Some buffer)",
            done() {
                   if ((player.sa.minigameNum.gte("-2284.73016")) && (player.sa.minigameNum.lte("-2284.73015"))) {
                    if (hasAchievement("sa", 161)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 162)) {
                    return "Wow! You master the +1 at random spots feature. Reward: Gain a *-1 button, and a x5 button."
                }
                else {
                    return "Hint: After getting -1, use 9 buttons. "
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 161)) return true
            }
        },
        163: {
            name: "-3^1000 x 5^1000 [-1.23384e1176] [Exactly 1000 presses of x3 and x5 are required]",
            done() {
                   if ((player.sa.minigameNum.gte("-1.233841e1176")) && (player.sa.minigameNum.lte("-1.2338399e1176"))) {
                    if (hasAchievement("sa", 162)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 163)) {
                    return "That's very precise."
                }
                else {
                    return "Torturous. Hint: Get 3^1000 first, which is exactly 1.322e477, then spam x5"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 162)) return true
            }
        },
        164: {
            name: "We love the x5 very much. (Get -6.003e3882)",
            done() {
                   if ((player.sa.minigameNum.gte("-6.004e3882")) && (player.sa.minigameNum.lte("-6.003e3882"))) {
                    if (hasAchievement("sa", 163)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 164)) {
                    return "AAAAAAA (Unlock the x7 button)"
                }
                else {
                    return "Press the x5 button 5,555 times, and then *-1."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 162)) return true
            }
        },
        165: {
            name: "Now PUSH. [Get -1ee20M]",
            done() {
                   if ((player.sa.minigameNum.lte("-ee2e7"))) {
                    if (hasAchievement("sa", 164)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 165)) {
                    return "Unlock the ^1e5,000 button!"
                }
                else {
                    return "Insane, but flipped, so its super bad"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 164)) return true
            }
        },
        166: {
            name: "NYOOM [Get ee1e9]",
            done() {
                   if ((player.sa.minigameNum.gte("ee1e9"))) {
                    if (hasAchievement("sa", 165)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 166)) {
                    return "Great job for spending 8 hours on this minigame. Add a new sub-currency"
                }
                else {
                    return "HOW the fk.."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 165)) return true
            }
        },
        171: {
            name: "Less Button Press 1 (LBP1): Get 8436.57 in less than 5 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(8436.57)) && (player.sa.minigameNum.lt(8436.58)) && (player.sa.bp.lt(5))) {
                    if (hasAchievement("sa", 166)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 171)) {
                    return "Oh, so now you are doing this."
                }
                else {
                    return "Semi-easy Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 166)) return true
            }
        },
        172: {
            name: "LBP2: Get 277585344 in less than 7 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(277585343.999)) && (player.sa.minigameNum.lt(277585344.001)) && (player.sa.bp.lt(7))) {
                    if (hasAchievement("sa", 171)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 172)) {
                    return "Reward: Add 2 buttons"
                }
                else {
                    return "Medium Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 171)) return true
            }
        },
        173: {
            name: "LBP3: Get 5075.57 (+-0.002) in less than 7 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(5075.57)) && (player.sa.minigameNum.lt(5075.572)) && (player.sa.bp.lt(7))) {
                    if (hasAchievement("sa", 172)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 173)) {
                    return "Now more complex!"
                }
                else {
                    return "Looks simple at first"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 172)) return true
            }
        },
        174: {
            name: "LBP4: Get 1718664748210526 (+-1) in less than 8 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(1718664748210526)) && (player.sa.minigameNum.lt(1718664748210527)) && (player.sa.bp.lt(8))) {
                    if (hasAchievement("sa", 173)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 174)) {
                    return "Add 2 more buttons :)"
                }
                else {
                    return "Semi-Hard Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 173)) return true
            }
        },
        175: {
            name: "LBP5: Get 1.621683e16 in less than 9 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(1.621683e16)) && (player.sa.minigameNum.lt(1.621684e16)) && (player.sa.bp.lt(9))) {
                    if (hasAchievement("sa", 174)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 175)) {
                    return "Now you are prepared for the final challenge."
                }
                else {
                    return "Hard Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 174)) return true
            }
        },
        176: {
            name: "LBP6: Get 2.423357e58 in less than 10 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(2.423356e58)) && (player.sa.minigameNum.lt(2.423358e58)) && (player.sa.bp.lt(10))) {
                    if (hasAchievement("sa", 175)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 176)) {
                    return "CONGRATS! You finished Minigame Part 5: LBP! Minigame Part 6 will be the last part, encompassing what you have done across grinds and strategic manipulation. It will also feature some upgrades to push you to the numerical limits!"
                }
                else {
                    return "Very Hard Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 175)) return true
            }
        },
    },
    clickables: {
        11: {
            title(){
                title = notationChooserMinigame(player[this.layer].minigameNum)
                return title
            },
            display() { dis = ""
                if (player.sa.minigameNum.eq(0)) dis = "how"
                if (player.sa.minigameNum.eq(1)) dis = "The Start"
                if (player.sa.minigameNum.eq(2)) dis = "Doing a double (or +1)"
                if (player.sa.minigameNum.eq(10)) dis = "10^Start"
                if (player.sa.minigameNum.eq(10000000000)) dis = "10^10^Start"
                if ((player.sa.minigameNum.gte(0.30102)) && (player.sa.minigameNum.lte(0.30103))) dis = "log(2)"
                if ((player.sa.minigameNum.gte(1.41421)) && (player.sa.minigameNum.lte(1.41422))) dis = "sqrt(2)"
                if ((player.sa.minigameNum.gte(1.61803)) && (player.sa.minigameNum.lte(1.61804))) dis = "The Golden Ratio"
                if ((player.sa.minigameNum.gte(2.71828)) && (player.sa.minigameNum.lte(2.71829))) dis = "e"
                if ((player.sa.minigameNum.gte(3.14159)) && (player.sa.minigameNum.lte(3.1416))) dis = "pi"
                if ((player.sa.minigameNum.gte(6.28318)) && (player.sa.minigameNum.lte(6.28319))) dis = "tau"
                if (player.sa.minigameNum.eq(69)) dis = "nice"
                if (player.sa.minigameNum.eq(100)) dis = "100 years makes a century"
                if (player.sa.minigameNum.eq(365)) dis = "Days in a standard year"
                if (player.sa.minigameNum.eq(404)) dis = "404 ERROR"
                if (player.sa.minigameNum.eq(420)) dis = "not funny"
                if (player.sa.minigameNum.eq(666)) dis = "devil"
                if (player.sa.minigameNum.eq(777)) dis = "lucky"
                if (player.sa.minigameNum.eq(911)) dis = "what's your emergency?"
                if (player.sa.minigameNum.eq(1000)) dis = "The first suffix (K)"
                if (player.sa.minigameNum.eq(1337)) dis = "leet"
                if (player.sa.minigameNum.eq(69420)) dis = "very nice"
                if (player.sa.minigameNum.eq(86400)) dis = "Seconds in a day"
                if (player.sa.minigameNum.eq(31536000)) dis = "Seconds in a year"
                if (player.sa.minigameNum.eq(123456789)) dis = "Every number, 0 to 9"
                if (player.sa.minigameNum.eq(9223372036854775807)) dis = "if you know, you know."
                if (player.sa.minigameNum.eq(new Decimal(10).pow(69))) dis = "10^Nice"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(1024))) dis = "Infinite"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(2).pow(1024))) dis = "Eternal"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(2).pow(2).pow(1024))) dis = "Transcend"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(2).pow(2).pow(2).pow(1024))) dis = "Quantum"
                if (player.sa.minigameNum.gte("1e25")) dis = "Pushing through"
                if (player.sa.minigameNum.gte("1e100")) dis = "Breaking bounds"
                if (player.sa.minigameNum.gte("1e1000")) dis = "Increasing faster"
                if (player.sa.minigameNum.gte("1e10000")) dis = "Order of Exponentiating Magnitude"
                if (player.sa.minigameNum.gte("1e100000")) dis = "Speeding Up"
                if (player.sa.minigameNum.gte("ee6")) dis = "Great."
                if (player.sa.minigameNum.gte("ee8")) dis = "Impressive."
                if (player.sa.minigameNum.gte("ee10")) dis = "Hyperion"
                if (player.sa.minigameNum.gte("ee15")) dis = "Insanity"
                if (player.sa.minigameNum.gte("ee25")) dis = "Super Insanity"
                if (player.sa.minigameNum.gte("ee50")) dis = "Mega Insanity"
                if (player.sa.minigameNum.gte("ee75")) dis = "Giga Insanity"
                if (player.sa.minigameNum.gte("e5.011135425235e19")) dis = "Past the Endgame"
                if (player.sa.minigameNum.gte("ee100")) dis = "Transcending"
                if (player.sa.minigameNum.gte("ee200")) dis = "Transcending Mk.2"
                if (player.sa.minigameNum.gte("ee500")) dis = "Omega"
                if (player.sa.minigameNum.gte("ee1000")) dis = "Epsilon"
                if (player.sa.minigameNum.gte("ee2000")) dis = "Infinite"
                if (player.sa.minigameNum.gte("ee5000")) dis = "Infinite+"
                if (player.sa.minigameNum.gte("ee10000")) dis = "Inter-finite"
                if (player.sa.minigameNum.gte("ee25000")) dis = "Crazed Eternal"
                if (player.sa.minigameNum.gte("ee150000")) dis = "Infinite Eternal"
                if (player.sa.minigameNum.gte("eee6")) dis = "Utter Infinite Eternal"
                if (player.sa.minigameNum.gte("eee7")) dis = "oNlY 1% oF pEoPlE cAn gEt ThIs!"
                if (player.sa.minigameNum.gte("eee8")) dis = "True No-Life"
                if (player.sa.minigameNum.gte("eee9")) dis = "Absolute True No-Life"
                if (player.sa.minigameNum.gte("ee4e9")) dis = "Another 5 more to go!"
                if (player.sa.minigameNum.gte("ee1e10")) dis = "Keep it up!"
                if (player.sa.minigameNum.gte("ee2.5e10")) dis = "Holy Heavens"
                if (player.sa.minigameNum.gte("ee5e10")) dis = "Transcending Eternity"
                if (player.sa.minigameNum.gte("ee7.5e10")) dis = "Meta-Reality"
                if (player.sa.minigameNum.gte("ee1e11")) dis = "Absolute True Insane Transcedental Meta-Reality"
                if (player.sa.minigameNum.gte("ee2e11")) dis = "Crazed Absolute True Insane Transcedental Meta-Reality"
                if (player.sa.minigameNum.lt(0)) dis = "negative?"
                if (player.sa.minigameNum.lt("-1e100")) dis = "big negative"
                if (player.sa.minigameNum.lt("-ee1000")) dis = "huge negative"
                if (player.sa.minigameNum.lt("-ee10000")) dis = "nega-megative"
                if (player.sa.minigameNum.lt("-ee100000")) dis = "nega-hypertive"
                if (player.sa.minigameNum.lt("-eee6")) dis = "negodtive"
                if (player.sa.minigameNum.lt("-eee7")) dis = "negativextreme"
                if (player.sa.minigameNum.lt("-eee8")) dis = "negodtivextreme"
                if (player.sa.minigameNum.lt("-eee9")) dis = "negodtivextremega"
                if (player.sa.minigameNum.lt("-eee10")) dis = "negodtivextremegabsolute"
                if (player.sa.minigameNum.lt("-eee11")) dis = "negodtivextremegabsolutera"
                return dis
            },
            style() {return {
                'width': '267px',
            }},
            canClick() {return false},
        },
        12: {
            title(){
                title = notationChooser(player[this.layer].pdx) + " pdx"
                return title
            },
            display() { 
                dis = "A new feature, pdx, has appeared. PDX is gained by clicking the divide buttons. Some clickables needs you to stay below a certain pdx. /3 and /7: +1 pdx. /2: +3 pdx. /10: +10 pdx"
                return dis
            },
            unlocked() {return hasAchievement("sa", 151)},
            canClick() {return false},
        },
        13: {
            title(){
                title = notationChooser(player[this.layer].bp) + " button presses"
                return title
            },
            display() { 
                dis = "Any operation gives +1 button press."
                return dis
            },
            unlocked() {return hasAchievement("sa", 166)},
            canClick() {return false},
        },
        21: {
            title: "+1",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        22: {
            title: "x2",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(2)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(2)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        23: {
            title: "=1",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = decimalOne
                player[this.layer].pdx = new Decimal(0)
                player[this.layer].bp = new Decimal(0)
            },
        },
        24: {
            title: "-0.01",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.sub(0.01)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 156)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.sub(0.01)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        31: {
            title: "x69",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(69)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 113)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(69)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        32: {
            title: "x911",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(911)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 116)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(911)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        33: {
            title: "/3",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 116)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        34: {
            title: "x(-1)",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(-1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 162)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(-1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        41: {
            title: "x10^10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times("1e10")
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 125)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times("1e10")
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        42: {
            title: "x3",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 126)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        43: {
            title: "/2",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(2)
                player[this.layer].pdx = player[this.layer].pdx.add(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 126)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(2)
                player[this.layer].pdx = player[this.layer].pdx.add(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        44: {
            title: "x5",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(5)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 162)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(5)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        51: {
            title: "x10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 133)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        52: {
            title: "^1.01 [All ^ buttons require a positive number to work]",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.01)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 135)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.01)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        53: {
            title: "^0.99",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.99)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 135)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.99)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        54: {
            title: "x7",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(7)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 164)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(7)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        61: {
            title: "^1.1",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.1)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 143)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.1)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        62: {
            title: "^2",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(2)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 146)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(2)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        63: {
            title: "/7",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(7)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 146)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(7)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        64: {
            title: "^1e5,000",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow("1e5000")
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 165)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow("1e5000")
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        71: {
            title: "/10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(10)
                player[this.layer].pdx = player[this.layer].pdx.add(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 151)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(10)
                player[this.layer].pdx = player[this.layer].pdx.add(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        72: {
            title: "^10",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 154)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        73: {
            title: "^1e10",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 155)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        74: {
            title: "^1e250",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e250)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 156)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e250)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        81: {
            title: "x13",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(13)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 172)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(13)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        82: {
            title: "/99",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(99)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 172)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        83: {
            title: "^3",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(3)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 174)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(3)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        84: {
            title: "^0.5",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.5)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 174)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.5)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
    },
})