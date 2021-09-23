/*
 *    Project Name    : Visual Python
 *    Description     : GUI-based Python code generator
 *    File Name       : com_Config.js
 *    Author          : Black Logic
 *    Note            : Configuration and settings control
 *    License         : GNU GPLv3 with Visual Python special exception
 *    Date            : 2021. 09. 16
 *    Change Date     :
 */
//============================================================================
// Load extension
//============================================================================
define([], function() {
	'use strict';
    //========================================================================
    // Define Inner Variable
    //========================================================================
    /**
     * Type of mode
     */
    const _MODE_TYPE = {
        DEVELOP : 0,
        RELEASE : 1
    }

    //========================================================================
    // Declare Class
    //========================================================================
    /**
     * Configuration and settings
     */
    class Config {
        //========================================================================
        // Constructor
        //========================================================================
        constructor(initialData) {
            // initial configuration
            this.data = {
                // Configuration
                'vpcfg': {

                },
                // User defined code for Snippets
                'vpudf': {

                }
            }

            this.data = {
                ...this.data,
                ...initialData
            }

            
        }

        getData(key) {
            // TODO: get data using key
        }

        setData(dataObj) {
            // TODO: set data using key
        }


    }

    //========================================================================
    // Define static variable
    //========================================================================
    /**
     * FIXME: before release, change it to _MODE_TYPE.RELEASE
     */
    Config.serverMode = _MODE_TYPE.DEVELOP;

    /**
     * Type of mode
     */
    Config.MODE_TYPE = _MODE_TYPE;

    /**
     * Frame size settings
     */
    Config.VP_MIN_WIDTH = 400;
    Config.MENU_MIN_WIDTH = 200;
    Config.BOARD_MIN_WIDTH = 200;
    Config.MENU_BOARD_SPACING = 2;

    return Config;
});