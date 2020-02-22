import AppsterController from '../appster/AppsterController.js'
import {AppsterGUIId, AppsterHTML} from '../appster/AppsterConstants.js'


export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    processEditText() {
        this.model.updateText();
    }

    getGoloGoloCurentWork(){
        return this.model.getCurrentWork()
    }

    processFontSize = (event) =>{
        let currentWork = this.model.getCurrentWork()
        this.model.updateFontSize()
        console.log("processing Font Size")
    }


    processChangeName = (event) => {

        this.model.showEditTextDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_NEW_NAME)

    }

    processCancelChangeText = (event) => {
        this.model.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_NEW_NAME)
    }

    processContinueChangeText = (event) => {
        this.processEditText()
    }

    outsideRegisterAppsterHandler(id, eventName, callback){

        super.registerEventHandler(id, eventName, this[callback] )

    }

    
    // registerEventHandler(id, eventName){
                                    
    // }



}