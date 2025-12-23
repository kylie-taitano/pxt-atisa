var pxtTargetBundle = {
    "id": "maker",
    "platformid": "codal",
    "nickname": "maker",
    "name": "MakeCode Maker (Cortex class)",
    "title": "MakeCode Maker - Blocks / Javascript editor",
    "description": "A Blocks / JavaScript code editor for MakeCode Maker Boards",
    "corepkg": "core",
    "serial": {
        "useHF2": true,
        "useEditor": true,
        "log": true,
        "editorTheme": {
            "graphBackground": "#d9d9d9",
            "lineColors": [
                "#CC2936",
                "#FFC914",
                "#2EB7ED",
                "#FB48C7",
                "#08415C",
                "#C200C0"
            ]
        }
    },
    "simulator": {
        "autoRun": true,
        "streams": false,
        "aspectRatio": 1,
        "parts": true,
        "partsAspectRatio": 0.69,
        "dynamicBoardDefinition": true,
        "defaultBoard": {
            "name": "ItsyBitsy M0 Express",
            "url": "libs/kwanzaa-kinara-lantern",
            "variant": "samd21"
        },
        "boardDefinitions": [
            {
                "name": "ItsyBitsy M0 Express",
                "url": "libs/kwanzaa-kinara-lantern",
                "variant": "samd21",
                "cardImage": "/pxt-atisa/docs/static/libs/kwanzaa-kinara-lantern.jpg"
            },
            {
                "name": "Menorah PCB v1",
                "url": "libs/chanukah-menorah-lantern",
                "variant": "samd21",
                "cardImage": "/pxt-atisa/docs/static/libs/chanukah-menorah-lantern.jpg"
            },
            {
                "name": "Philippine Parol PCB v1",
                "url": "libs/philippine-parol-lantern",
                "variant": "samd21",
                "cardImage": "/pxt-atisa/docs/static/libs/philippine-parol-lantern.jpg"
            },
            {
                "name": "Holiday Ornament PCB v1",
                "url": "libs/christmas-ornament-lantern",
                "variant": "samd21",
                "cardImage": "/pxt-atisa/docs/static/libs/christmas-ornament-lantern.jpg"
            }
        ],
        "messageSimulators": {
            "jacdac": {
                "url": "https://microsoft.github.io/jacdac-docs/tools/makecode-sim?webusb=0&parentOrigin=$PARENT_ORIGIN$",
                "localHostUrl": "http://localhost:8000/tools/makecode-sim?webusb=0&parentOrigin=$PARENT_ORIGIN$",
                "aspectRatio": 0.89,
                "permanent": true
            }
        }
    },
    "cloud": {
        "workspace": false,
        "packages": true,
        "sharing": true,
        "thumbnails": true,
        "publishing": true,
        "importing": true,
        "preferredPackages": [],
        "githubPackages": true,
        "cloudProviders": {
            "github": {}
        }
    },
    "runtime": {
        "mathBlocks": true,
        "loopsBlocks": true,
        "logicBlocks": true,
        "variablesBlocks": true,
        "textBlocks": true,
        "listsBlocks": true,
        "functionBlocks": true,
        "functionsOptions": {
            "useNewFunctions": true,
            "extraFunctionEditorTypes": []
        },
        "onStartNamespace": "loops",
        "onStartColor": "#40bf4a",
        "onStartWeight": 100,
        "pauseUntilBlock": {},
        "breakBlock": true,
        "continueBlock": true
    },
    "compile": {
        "isNative": true,
        "useUF2": true,
        "webUSB": true,
        "hasHex": true,
        "saveAsPNG": true,
        "deployDrives": ".*",
        "deployFileMarker": "INFO_UF2.TXT",
        "driveName": "DRIVE",
        "openocdScript": "source [find interface/cmsis-dap.cfg]; set CHIPNAME at91samd21g18; source [find target/at91samdXX.cfg]",
        "flashChecksumAddr": 8372,
        "flashCodeAlign": 256,
        "upgrades": [
            {
                "type": "package",
                "map": {
                    "circuit-playground": "adafruit-circuit-playground"
                }
            }
        ],
        "patches": {
            "0.0.0 - 0.6.8": [
                {
                    "type": "package",
                    "map": {
                        "arduino-mkr": "arduino-mkr1000"
                    }
                }
            ]
        },
        "nativeType": "thumb",
        "switches": {},
        "jsRefCounting": false,
        "utf8": true
    },
    "compileService": {
        "buildEngine": "codal",
        "codalTarget": {
            "name": "missing",
            "url": "https://github.com/microsoft/pxt-does-not-exist",
            "branch": "v0",
            "type": "git"
        },
        "codalBinary": "CIRCUIT_PLAYGROUND",
        "yottaConfig": {
            "pxt": {
                "board": {
                    "id": "BOARD_ID_CPLAY"
                }
            }
        },
        "githubCorePackage": "lancaster-university/codal",
        "gittag": "v0.9.0",
        "serviceId": "codal2cp",
        "dockerImage": "pext/yotta:latest"
    },
    "variants": {
        "samd51": {
            "compile": {
                "hasHex": true,
                "openocdScript": "source [find interface/cmsis-dap.cfg]; set CHIPNAME at91samd51g19; source [find target/atsame5x.cfg]",
                "openocdScriptAlt": "source [find interface/stlink-v2.cfg]; set CPUTAPID 0x2ba01477; set CHIPNAME at91samd51g19; source [find target/at91samdXX.cfg]",
                "ramSize": 196608,
                "flashEnd": 524288,
                "uf2Family": "0x55114460"
            },
            "compileService": {
                "codalTarget": {
                    "name": "codal-itsybitsy-m4",
                    "url": "https://github.com/lancaster-university/codal-itsybitsy-m4",
                    "branch": "v0.2.7",
                    "type": "git"
                },
                "codalBinary": "ITSYBITSY_M4",
                "serviceId": "codal2samd51"
            }
        },
        "nrf52840": {
            "serial": {
                "useHF2": false
            },
            "compile": {
                "openocdScript": "source [find interface/cmsis-dap.cfg]; source [find target/nrf52.cfg]",
                "flashChecksumAddr": 0,
                "webUSB": false,
                "flashEnd": 1007616,
                "uf2Family": "0xada52840"
            },
            "compileService": {
                "codalTarget": {
                    "name": "codal-nrf52840-dk",
                    "url": "https://github.com/mmoskal/codal-nrf52840-dk",
                    "branch": "v1.1.8",
                    "type": "git"
                },
                "codalBinary": "NRF52840_DK",
                "serviceId": "codal2nrf52840",
                "dockerImage": "pext/yotta:latest",
                "yottaConfig": {
                    "pxt": {
                        "board": {
                            "id": "BOARD_ID_NRF52840"
                        }
                    }
                }
            }
        },
        "nrf52833": {
            "serial": {
                "useHF2": true
            },
            "compile": {
                "openocdScript": "source [find interface/cmsis-dap.cfg]; source [find target/nrf52.cfg]",
                "flashChecksumAddr": 0,
                "webUSB": true,
                "flashEnd": 475136,
                "uf2Family": "0xada52840"
            },
            "compileService": {
                "codalTarget": {
                    "name": "codal-makeable",
                    "url": "https://github.com/jamesadevine/codal-makeable",
                    "branch": "v0.0.8",
                    "type": "git"
                },
                "codalBinary": "NRF52",
                "serviceId": "codal2nrf52",
                "dockerImage": "pext/yotta:latest",
                "yottaConfig": {
                    "pxt": {
                        "board": {
                            "id": "BOARD_ID_NRF52833"
                        }
                    }
                }
            }
        },
        "stm32f103": {
            "compile": {
                "hasHex": true,
                "openocdScript": "source [find interface/stlink-v2.cfg]; source [find target/stm32f1x.cfg]",
                "uf2Family": "0x5ee21072",
                "webUSB": false,
                "flashChecksumAddr": 0,
                "utf8": true
            },
            "compileService": {
                "codalTarget": {
                    "name": "codal-jacdac-feather",
                    "url": "https://github.com/lancaster-university/codal-jacdac-feather",
                    "branch": "v1.1.2",
                    "type": "git"
                },
                "codalBinary": "STM32",
                "serviceId": "codal2stm32",
                "dockerImage": "pext/yotta:latest"
            }
        },
        "stm32f401": {
            "compile": {
                "hasHex": true,
                "openocdScript": "source [find interface/cmsis-dap.cfg]; source [find target/stm32f4x.cfg]",
                "flashChecksumAddr": 0,
                "flashEnd": 524288,
                "uf2Family": "0x57755a57"
            },
            "compileService": {
                "codalTarget": {
                    "name": "codal-big-brainpad",
                    "url": "https://github.com/lancaster-university/codal-big-brainpad",
                    "branch": "v1.3.4",
                    "type": "git"
                },
                "codalBinary": "STM32",
                "serviceId": "codal2stm32",
                "dockerImage": "pext/yotta:latest"
            }
        },
        "samd21": {
            "compile": {
                "hasHex": true,
                "openocdScript": "source [find interface/cmsis-dap.cfg]; set CHIPNAME at91samd21g18; source [find target/at91samdXX.cfg]",
                "openocdScriptAlt": "source [find interface/stlink-v2.cfg]; set CPUTAPID 0x0bc11477; set CHIPNAME at91samd21g18; source [find target/at91samdXX.cfg]",
                "flashEnd": 262144,
                "uf2Family": "0x68ed2b88"
            },
            "compileService": {
                "codalTarget": {
                    "name": "codal-circuit-playground",
                    "url": "https://github.com/lancaster-university/codal-circuit-playground",
                    "branch": "v2.0.4",
                    "type": "git"
                },
                "dockerImage": "pext/yotta:latest",
                "codalBinary": "CIRCUIT_PLAYGROUND"
            }
        },
        "esp32": {
            "compile": {
                "hasHex": true,
                "useESP": true,
                "useUF2": false,
                "flashCodeAlign": 256,
                "webUSB": false,
                "nativeType": "vm",
                "stackAlign": 2
            },
            "compileService": {
                "buildEngine": "dockerespidf",
                "dockerImage": "pext/esp:latest",
                "dockerArgs": [],
                "serviceId": "espidf"
            }
        },
        "esp32s2": {
            "compile": {
                "hasHex": true,
                "useESP": true,
                "useUF2": true,
                "flashCodeAlign": 256,
                "webUSB": false,
                "nativeType": "vm",
                "uf2Family": "0xbfdd4eee",
                "stackAlign": 2
            },
            "compileService": {
                "buildEngine": "dockerespidf",
                "dockerImage": "pext/esp:latest",
                "dockerArgs": [],
                "serviceId": "espidf"
            }
        },
        "rp2040": {
            "compile": {
                "hasHex": true,
                "openocdScript": "???",
                "flashChecksumAddr": 0,
                "flashEnd": 2097152,
                "uf2Family": "0xe48bff56"
            },
            "compileService": {
                "codalTarget": {
                    "name": "codal-pi-pico",
                    "url": "https://github.com/lancaster-university/codal-pi-pico",
                    "branch": "v0.0.10",
                    "type": "git"
                },
                "codalBinary": "PI-PICO",
                "serviceId": "codal2pico",
                "dockerImage": "pext/arm:gcc9"
            }
        }
    },
    "ignoreDocsErrors": true,
    "uploadDocs": false,
    "versions": {
        "branch": "main",
        "commits": "https://github.com/atisatech/pxt-atisa/commits/664350d09439fc87ce2448bc8506a51bf9db6f55",
        "target": "0.15.2512231830",
        "pxt": "12.1.8"
    },
    "blocksprj": {
        "id": "blocksprj",
        "config": {
            "name": "{0}",
            "dependencies": {
                "core---samd": "*"
            },
            "description": "",
            "files": [
                "main.blocks",
                "main.ts",
                "README.md"
            ],
            "compileServiceVariant": "samd21",
            "core": true,
            "additionalFilePaths": []
        },
        "files": {
            "README.md": "",
            "main.blocks": "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"pxt-on-start\" x=\"0\" y=\"0\"></block>\n  <block type=\"forever\" x=\"176\" y=\"0\"></block>\n</xml>",
            "main.ts": "\n"
        }
    },
    "tsprj": {
        "id": "tsprj",
        "config": {
            "name": "{0}",
            "dependencies": {
                "core---samd": "*"
            },
            "description": "",
            "files": [
                "main.ts",
                "README.md"
            ],
            "compileServiceVariant": "samd21",
            "core": true,
            "additionalFilePaths": []
        },
        "files": {
            "README.md": "",
            "main.ts": "\n"
        }
    },
    "colorThemeMap": {
        "pxt-high-contrast": {
            "id": "pxt-high-contrast",
            "name": "High Contrast",
            "weight": 100,
            "monacoBaseTheme": "hc-black",
            "colors": {
                "pxt-header-background": "#000000",
                "pxt-header-foreground": "#FFFFFF",
                "pxt-header-background-hover": "#000000",
                "pxt-header-foreground-hover": "#FFFFFF",
                "pxt-header-stencil": "#FFFFFF",
                "pxt-primary-background": "#000000",
                "pxt-primary-foreground": "#FFFFFF",
                "pxt-primary-background-hover": "#000000",
                "pxt-primary-foreground-hover": "#FFFFFF",
                "pxt-primary-accent": "#000000",
                "pxt-secondary-background": "#000000",
                "pxt-secondary-foreground": "#FFFFFF",
                "pxt-secondary-background-hover": "#000000",
                "pxt-secondary-foreground-hover": "#FFFFFF",
                "pxt-secondary-accent": "#000000",
                "pxt-tertiary-background": "#000000",
                "pxt-tertiary-foreground": "#FFFFFF",
                "pxt-tertiary-background-hover": "#000000",
                "pxt-tertiary-foreground-hover": "#FFFFFF",
                "pxt-tertiary-accent": "#000000",
                "pxt-target-background1": "#000000",
                "pxt-target-foreground1": "#FFFFFF",
                "pxt-target-background1-hover": "#000000",
                "pxt-target-foreground1-hover": "#cccccc",
                "pxt-target-stencil1": "#FFFFFF",
                "pxt-target-background2": "#000000",
                "pxt-target-foreground2": "#FFFFFF",
                "pxt-target-background2-hover": "#000000",
                "pxt-target-foreground2-hover": "#cccccc",
                "pxt-target-stencil2": "#FFFFFF",
                "pxt-target-background3": "#000000",
                "pxt-target-foreground3": "#FFFFFF",
                "pxt-target-background3-hover": "#000000",
                "pxt-target-foreground3-hover": "#cccccc",
                "pxt-target-stencil3": "#FFFFFF",
                "pxt-neutral-background1": "#000000",
                "pxt-neutral-foreground1": "#FFFFFF",
                "pxt-neutral-background1-hover": "#000000",
                "pxt-neutral-foreground1-hover": "#FFFFFF",
                "pxt-neutral-stencil1": "#FFFFFF",
                "pxt-neutral-background2": "#000000",
                "pxt-neutral-foreground2": "#FFFFFF",
                "pxt-neutral-background2-hover": "#000000",
                "pxt-neutral-foreground2-hover": "#FFFFFF",
                "pxt-neutral-stencil2": "#FFFFFF",
                "pxt-neutral-background3": "#000000",
                "pxt-neutral-foreground3": "#FFFFFF",
                "pxt-neutral-background3-hover": "#000000",
                "pxt-neutral-foreground3-hover": "#FFFFFF",
                "pxt-neutral-stencil3": "#FFFFFF",
                "pxt-neutral-background3-alpha90": "#000000E5",
                "pxt-neutral-base": "rgba(255, 255, 255, 1)",
                "pxt-neutral-alpha0": "rgba(255, 255, 255, 0)",
                "pxt-neutral-alpha10": "rgba(255, 255, 255, 0.1)",
                "pxt-neutral-alpha20": "rgba(255, 255, 255, 0.2)",
                "pxt-neutral-alpha50": "rgba(255, 255, 255, 0.5)",
                "pxt-neutral-alpha80": "rgba(255, 255, 255, 0.8)",
                "pxt-link": "#807FFF",
                "pxt-link-hover": "#1b19ff",
                "pxt-focus-border": "#FFFF00",
                "pxt-success": "#00FF00",
                "pxt-success-foreground": "#000000",
                "pxt-success-hover": "#00FF00",
                "pxt-success-alpha10": "#00FF0019",
                "pxt-warning": "#00FFFF",
                "pxt-warning-foreground": "#FFFFFF",
                "pxt-warning-hover": "#00FFFF",
                "pxt-warning-alpha10": "#00FFFF19",
                "pxt-error": "#880000",
                "pxt-error-foreground": "#FFFFFF",
                "pxt-error-hover": "#880000",
                "pxt-error-alpha10": "#88000019",
                "pxt-colors-purple-background": "#FF00FF",
                "pxt-colors-purple-foreground": "#000000",
                "pxt-colors-purple-hover": "#FF00FF",
                "pxt-colors-purple-alpha10": "#FF00FF19",
                "pxt-colors-orange-background": "#FF7F00",
                "pxt-colors-orange-foreground": "#000000",
                "pxt-colors-orange-hover": "#FF7F00",
                "pxt-colors-orange-alpha10": "#FF7F0019",
                "pxt-colors-brown-background": "#d1b7a3",
                "pxt-colors-brown-foreground": "#FFFFFF",
                "pxt-colors-brown-hover": "#d1b7a3",
                "pxt-colors-brown-alpha10": "#d1b7a319",
                "pxt-colors-blue-background": "#0078D7",
                "pxt-colors-blue-foreground": "#FFFFFF",
                "pxt-colors-blue-hover": "#0086F1",
                "pxt-colors-blue-alpha10": "#0078D719",
                "pxt-colors-green-background": "#00FF00",
                "pxt-colors-green-foreground": "#000000",
                "pxt-colors-green-hover": "#00FF00",
                "pxt-colors-green-alpha10": "#00FF0019",
                "pxt-colors-red-background": "#880000",
                "pxt-colors-red-foreground": "#FFFFFF",
                "pxt-colors-red-hover": "#880000",
                "pxt-colors-red-alpha10": "#88000019",
                "pxt-colors-teal-background": "#5BE0FF",
                "pxt-colors-teal-foreground": "#000000",
                "pxt-colors-teal-hover": "#5BE0FF",
                "pxt-colors-teal-alpha10": "#5BE0FF19",
                "pxt-colors-yellow-background": "#FFFF00",
                "pxt-colors-yellow-foreground": "#000000",
                "pxt-colors-yellow-hover": "#FFFF00",
                "pxt-colors-yellow-alpha10": "#FFFF0019"
            },
            "overrideCss": ".common-button {\n    color: var(--pxt-neutral-foreground2) !important;\n    background-color: var(--pxt-neutral-background2) !important;\n    border-color: var(--pxt-neutral-foreground2) !important;\n}\n\n.common-button:hover, .common-button:focus {\n    outline: 2px solid var(--pxt-colors-yellow-background) !important;\n    z-index: 1;\n}\n\n/*\nOverride default button background for the area menu, which requires transparency,\nbut still use a fairly opaque one to keep focus/visibility on the main buttons.\n*/\n.area-menu-container .area-button {\n    background-color: var(--pxt-neutral-alpha80) !important;\n}\n\n/* \n * \"User-provided content\" header in the import modal.\n */\n.ui.violet.message .header {\n    color: var(--pxt-colors-purple-background) !important;\n}\n\n/* \n * Checkbox styles\n * In HC the neutral and primary colors are the same, so we need to differentiate with\n * a different background color when checked.\n */\n.common-checkbox.toggle input:checked~label:before,\ndiv.field .ui.toggle.checkbox input:checked~label:before {\n    background-color: var(--pxt-colors-purple-background) !important;\n}\n\n.common-checkbox-icon.checked {\n    background-color: var(--pxt-colors-purple-background);\n    color: var(--pxt-colors-purple-foreground);\n    border-color: var(--pxt-colors-purple-hover);\n}\n\n.common-checkbox-icon.checked i.fas.fa-check {\n    color: var(--pxt-colors-purple-foreground);\n}\n\n/*\n * Make toggle \"handle\" more visible for HC\n */\n.common-checkbox.toggle label:after {\n    background-color: var(--pxt-neutral-foreground1) !important;\n}\n\n/*\n * Selection highlights\n */\n\n.blocklyContextMenu {\n    border: 3px solid var(--pxt-colors-yellow-background) !important;\n}\n\n.blocklyWidgetDiv .blocklyMenu.blocklyContextMenu .blocklyMenuItem.blocklyMenuItemHighlight {\n    border: 3px solid var(--pxt-colors-yellow-background) !important;\n}\n\n/*\n * Toolbox\n */\n.blocklyTreeRow:hover {\n    outline: 3px solid var(--pxt-colors-yellow-background) !important;\n}\n\n#blocklySearchInput i {\n    color: var(--pxt-neutral-foreground1);\n    opacity: 1;\n}\n\n/* \n * Inverted image colors\n */\n.barcharticon,\n.blockly-ws-search-next-btn,\n.blockly-ws-search-previous-btn,\n.blockly-ws-search-close-btn {\n    filter: invert(1);\n}\n\n/* Sim toolbar */\n#simulator .editor-sidebar .simtoolbar .debug-button.active,\n#simulator .editor-sidebar .simtoolbar .debug-button.active:hover,\n#simulator .editor-sidebar .simtoolbar .debug-button.active:hover i {\n    /* Make active state more apparent by inverting the colors */\n    background: var(--pxt-neutral-foreground2) !important;\n    color: var(--pxt-neutral-background2) !important;\n}\n\n/* Image Editor */\n.image-editor-topbar, .image-editor-bottombar, .image-editor-sidebar {\n    background: var(--pxt-neutral-background1) !important;\n}\n.image-editor-tool-buttons {\n    background: none !important;\n}\n.image-editor-button,\n.image-editor-input,\n.image-editor-confirm {\n    border: 1px solid var(--pxt-neutral-foreground1);\n}\n.image-editor-canvas, .image-editor-canvas:hover, .image-editor-canvas:focus {\n    outline: none !important;\n}\n.cursor-button {\n    /* remove margin since we now have a border around the cursor buttons and it looks better centered */\n    margin-right: 0;\n}\n\n/* Toolbox */\n.pxtToolbox:not(.invertedToolbox) span.blocklyTreeLabel {\n    color: var(--pxt-target-foreground3);\n}\n\n.pxtToolbox:not(.invertedToolbox) .blocklyTreeSelected span.blocklyTreeLabel,\n.pxtToolbox:not(.invertedToolbox) .blocklyTreeSelected span.blocklyTreeIcon {\n    color: var(--pxt-target-foreground3);\n}\n\n.pxtToolbox:not(.invertedToolbox) .blocklyTreeRow:not(.blocklyTreeSelected) .blocklyTreeLabel {\n    color: var(--pxt-target-foreground3);\n}\n\n.pxtToolbox:not(.invertedToolbox) .blocklyTreeRow:not(.blocklyTreeSelected):hover,\n.pxtToolbox:not(.invertedToolbox) .blocklyTreeRow:not(.blocklyTreeSelected):focus {\n    background-color: #404040;\n}\n\n.blocksEditorOuter #blocklyTrashIcon {\n    color: var(--pxt-primary-foreground);\n}\n\n/*\n * Teaching Bubbles\n */\n.teaching-bubble,\n.teaching-bubble .teaching-bubble-navigation-buttons > .common-button {\n    background: var(--pxt-neutral-background1) !important;\n    color: var(--pxt-neutral-foreground1) !important;\n    border: solid var(--pxt-neutral-foreground1) !important;\n}\n\n.teaching-bubble-cutout {\n    border: 0.25rem solid var(--pxt-neutral-alpha20);\n}\n\n.teaching-bubble .ai-footer {\n    opacity: 1 !important;\n}\n\n.teaching-bubble-arrow,\n.teaching-bubble .ai-footer-text,\n.teaching-bubble .feedback-button,\n.teaching-bubble .feedback-button.disabled,\n.teaching-bubble .teaching-bubble-steps {\n    color: var(--pxt-neutral-foreground1) !important;\n}\n\n/*\n * Side Docs\n */\n\n#sidedocs {\n    background-color: var(--pxt-neutral-foreground1);\n}\n\n#sidedocsbar a i,\n#sidedocsbar a span {\n    color: var(--pxt-neutral-background1) !important;\n}\n\n#sidedocsbar a:hover,\n#sidedocsbar a:focus {\n    /* Yellow does not contrast well against white background */\n    outline: 3px solid var(--pxt-neutral-background1) !important;\n}\n\n#sidedocsbar a:hover i,\n#sidedocsbar a:focus i,\n#sidedocsbar a:hover span,\n#sidedocsbar a:focus span {\n    color: var(--pxt-link-hover) !important;\n}\n\n/*\n * Editor Toggle\n */\n#editortoggle .selected.item {\n    transition: none;\n    &:focus {\n        box-shadow: inset 0 0 0 6px #000000 !important;\n    }\n    >.icon {\n        color: #000000 !important;\n    }\n}\n\n#editordropdown.ui.button.active > .icon {\n    color: #000000 !important;\n}\n\n"
        }
    }
}