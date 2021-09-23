/*
 *    Project Name    : Visual Python
 *    Description     : GUI-based Python code generator
 *    File Name       : mainFrame.js
 *    Author          : Black Logic
 *    Note            : Render and load main frame
 *    License         : GNU GPLv3 with Visual Python special exception
 *    Date            : 2021. 09. 13
 *    Change Date     :
 */

//============================================================================
// Load extension
//============================================================================
define([
    'text!../html/mainFrame.html!strip',
    'css!../css/mainFrame.css',

    // load module
    './com/com_Config',
    './menu/MenuFrame',
    './board/BoardFrame'
], function(vpHtml, vpCss, com_Config, MenuFrame, BoardFrame) {
	'use strict';
    //========================================================================
    // Define Variable
    //========================================================================
    var pageDom = '';
    var menuFrame;
    var boardFrame;

    // FIXME: test id of jupyter area
    // jupyter body which contain jupyterNotebook and visualpython
    const ID_JUPYTER_BODY = 'jupyterBody';          
    // jupyter notebook placed next to visualpython
    const ID_JUPYTER_NOTEBOOK = 'jupyterNotebook';
    // visualpython minimum width
    const { 
        VP_MIN_WIDTH, 
        BOARD_MIN_WIDTH,
        MENU_BOARD_SPACING 
    } = com_Config;
	
    //========================================================================
    // Internal call function
    //========================================================================
	/**
     * Bind event for inner components under vp_wrapper
     */
     var _bindEvent = function() {
        // toggle visualpython area
        $('#visualpython').on('click', function() {
            $('#vp_wrapper').toggle();

            let vpWidth = $('#vp_wrapper')[0].clientWidth;
            _resizeNotebook(vpWidth);

            vpLog.display(VP_LOG_TYPE.DEVELOP, 'vp toggled');
        });

        $(window).resize(function(){
            $('#vp_boardFrame').width($("#vp_wrapper").width() - $("#vp_menuFrame").width()); 
            $('#vp_menuFrame').height($("#vp_wrapper").height()); 
         });
    }

    /**
     * Bind $.resizable event
     * // TODO: get a param to re-position vp_wrapper to the left or right
     */
    var _bindResizable = function() {
        // get visualpython minimum width
        // resizable setting
        // $('#vp_wrapper').resizable('disable');
        $('#vp_wrapper').resizable({
            // alsoResize: '#vp_menuFrame',
            helper: 'vp-wrapper-resizer',
            handles: 'w',
            // resizeHeight: false,
            minWidth: VP_MIN_WIDTH,
            // maxWidth: 0,
            start: function(event, ui) {
                
            },
            resize: function(event, ui) {
                // resize #vp_wrapper with currentWidth and resize jupyter area
                var currentWidth = ui.size.width;
                
                // calculate inner frame width
                var menuWidth = $('#vp_menuFrame').width();
                var boardWidth = currentWidth - menuWidth - MENU_BOARD_SPACING;
                if (boardWidth < BOARD_MIN_WIDTH + MENU_BOARD_SPACING) {
                    menuWidth -= (BOARD_MIN_WIDTH - boardWidth);
                    boardWidth = BOARD_MIN_WIDTH;
                }
                $('#vp_menuFrame').width(menuWidth);
                $('#vp_boardFrame').width(boardWidth);
                
                vpLog.display(VP_LOG_TYPE.DEVELOP, 'resizing wrapper to ', currentWidth, 'with', menuWidth, boardWidth);

                $('#vp_wrapper').width(currentWidth);
                _resizeNotebook(currentWidth);
            },
            stop: function(event, ui) {
                $('#vp_wrapper').css({'left': ''});
            },
        });            
    }

    /**
     * Resize jupyternotebook
     */
     var _resizeNotebook = function(vpWidth) {
        let baseWidth = $('#' + ID_JUPYTER_BODY).width();
        // manual padding between notebook and visualpython area
        const DIV_PADDING = 2;
        // if vp area is available, add padding
        if (vpWidth > 0) {
            vpWidth += DIV_PADDING;
        }
        // calculate notebook resizing width
        let nbWidth = baseWidth - vpWidth;
        // apply resized width
        $('#' + ID_JUPYTER_NOTEBOOK).css({ 'width': nbWidth + 'px' });
    }

    //========================================================================
    // External call function
    //========================================================================
    /**
     * Load main frame
     */
	var loadMainFrame = function() {
        // load vp_wrapper into jupyter base
        pageDom = $(vpHtml);
        // $('#' + ID_JUPYTER_BODY).append(pageDom);
        $(pageDom).prependTo(document.body);

        // resize jupyterNotebook area
        let vpWidth = $('#vp_wrapper')[0].clientWidth;
        _resizeNotebook(vpWidth);
        
        // load menu & board
        menuFrame = new MenuFrame(pageDom);
        boardFrame = new BoardFrame(pageDom);
        
        // render and append
        // $('#vp_wrapper').append(menuFrame.render());
        // $('#vp_wrapper').append(boardFrame.render());

        // bind event
        menuFrame.load();
        boardFrame.load();

        _bindEvent();
        _bindResizable();
    }

    return {
        loadMainFrame: loadMainFrame
    };
});