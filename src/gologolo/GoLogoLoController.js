import AppsterController from '../appster/AppsterController.js'
import {AppsterGUIId, AppsterHTML} from '../appster/AppsterConstants.js'


export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    /**
     * Processes protocol for when the user clicks (edit text)
     *  on the edit screen
     */
    processEditText() {
        this.model.updateText();
    }

    /**
     * Returns the logo currently being modified
     */
    getGoloGoloCurentWork(){
        return this.model.getCurrentWork()
    }

    /**
     * Processes a request to change a logo's Font Size
     */
    processFontSize = (event) =>{
        let currentWork = this.model.getCurrentWork()
        this.model.updateFontSize()
        console.log("processing Font Size")
    }

    /**
     * Processes the request to changes a logo's text color
     */
    processTextColor = (event) => {
        this.model.updateTextColor()
    }

    /**
     * Processes the request to change a logo's 
     * background color
     */
    processBackgroundColor = (event) => {
        this.model.updateBackgroundColor()
    }

    /**
     * Processes the request to change a logo's 
     * border color
     */
    processBorderColor = (event) => {
        this.model.updateBorderColor()
    }

    /**
     * Processes the request to change a logo's
     * border radius
     */
    porcessBorderRadius = (event) =>{
        this.model.updateBorderRadius()
    }

    /**
     * Processes the request to change a logo's
     * border thicness
     */
    processBorderThickness = (event) =>{
        this.model.updateBorderThickness()
    }

    /**
     * Processes the request to change a logo's padding
     */
    processPadding = (event) => {
        this.model.updatePadding()
    }

    /**
     * Processes the request to change a logo's margin
     */
    processMargin = (event) => {
        this.model.updateMargin()
    }


    /**
     * Processes the request to change a logo's text
     */
    processChangeName = (event) => {

        this.model.showEditTextDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_NEW_NAME)

    }

    /**
     * Cancels logo's change of text
     */
    processCancelChangeText = (event) => {
        this.model.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_NEW_NAME)
    }

    /**
     * continues logo's change of text
     */
    processContinueChangeText = (event) => {
        this.processEditText()
    }

    /**
     * Registers eventListners
     * @param {*} id id of object
     * @param {*} eventName type of event
     * @param {*} callback callback function
     */
    outsideRegisterAppsterHandler(id, eventName, callback){

        super.registerEventHandler(id, eventName, this[callback] )

    }
}