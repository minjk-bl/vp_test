/*
 *    Project Name    : Visual Python
 *    Description     : GUI-based Python code generator
 *    File Name       : MenuFrame.js
 *    Author          : Black Logic
 *    Note            : Render and load menu frame
 *    License         : GNU GPLv3 with Visual Python special exception
 *    Date            : 2021. 09. 13
 *    Change Date     :
 */

//============================================================================
// Load extension
//============================================================================
define([
    'text!../../html/menuFrame.html!strip',
    'css!../../css/menuFrame.css',

    '../com/com_Config'
], function(menuFrameHtml, menuFrameCss, com_Config) {
	'use strict';
    //========================================================================
    // Define Variable
    //========================================================================
    const {
        MENU_MIN_WIDTH,
        BOARD_MIN_WIDTH,
        MENU_BOARD_SPACING 
    } = com_Config
    
    //========================================================================
    // Declare class
    //========================================================================
    /**
     * MenuFrame
     */
    class MenuFrame {
        //========================================================================
        // Constructor
        //========================================================================
        constructor(parentPageDom) {
            this.parentPageDom = parentPageDom;
            this.pageDom = $(menuFrameHtml);
        }

        //========================================================================
        // Internal call function
        //========================================================================
        /**
         * Bind events on menuFrame
         */
         _bindEvent() {

        }

        /**
         * Bind resizable(jquery.ui)
         */
        _bindResizable() {
            // resizable
            $('#vp_menuFrame').resizable({
                // containment: 'parent',
                helper: 'vp-menuframe-resizer',
                handles: 'e',
                resizeHeight: false,
                minWidth: MENU_MIN_WIDTH,
                // maxWidth: 0,
                start: function(event, ui) {
                    
                },
                resize: function(event, ui) {
                    // var parentWidth = $('#vp_wrapper')[0].clientWidth;
                    var parentWidth = $('#vp_wrapper')[0].getBoundingClientRect().width;
                    var currentWidth = ui.size.width;
                    var newBoardWidth = parentWidth - currentWidth - MENU_BOARD_SPACING;

                    vpLog.display(VP_LOG_TYPE.DEVELOP, 'resizing menuFrame');

                    // check board minimum width
                    if (newBoardWidth < BOARD_MIN_WIDTH + MENU_BOARD_SPACING) {
                        currentWidth -= (BOARD_MIN_WIDTH - newBoardWidth);
                        newBoardWidth = BOARD_MIN_WIDTH;
                        // change maxWidth
                        // $('#vp_menuFrame').resizable('option', 'maxWidth', currentWidth);
                        ui.size.width = currentWidth;
                    } 

                    // resize menu frame with current resized width
                    $('#vp_menuFrame').width(currentWidth);
                    // resize board frame with left space
                    $('#vp_boardFrame').width(newBoardWidth); 
                },
                stop: function(event, ui) {
                    
                },
            });
        }


        //========================================================================
        // External call function
        //========================================================================
        render() {
            // some dynamical rendering

            // save current pageDom
            // this.pageDom = ;
            return this.pageDom;
        }

        /**
         * Render and load on parentDom, bind events
         */
        load() {
            $(this.parentPageDom).append(this.render());
            this._bindEvent();
            this._bindResizable();
        }
    }

    return MenuFrame;
	
});