/*
 *    Project Name    : Visual Python
 *    Description     : GUI-based Python code generator
 *    File Name       : BoardFrame.js
 *    Author          : Black Logic
 *    Note            : Render and load board frame
 *    License         : GNU GPLv3 with Visual Python special exception
 *    Date            : 2021. 09. 13
 *    Change Date     :
 */

//============================================================================
// Load extension
//============================================================================
define([
    'text!../../html/boardFrame.html!strip',
    'css!../../css/boardFrame.css'
], function(boardFrameHtml, boardFrameCss) {
	'use strict';
    //========================================================================
    // Define Variable
    //========================================================================

	
    /**
     * BoardFrame
     */
     class BoardFrame {
        //========================================================================
        // Constructor
        //========================================================================
        constructor(parentPageDom) {
            this.parentPageDom = parentPageDom;
            this.pageDom = $(boardFrameHtml);
        }

        //========================================================================
        // Internal call function
        //========================================================================
        
        //========================================================================
        // External call function
        //========================================================================
        /**
         * Render and load on parentDom, bind events
         */
        render() {
            // some dynamical rendering

            // save current pageDom
            // this.pageDom = ;
            return this.pageDom;
        }

        load() {
            $(this.parentPageDom).append(this.render());
        }
    } // class

    return BoardFrame;
});
/* End of file */