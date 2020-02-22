import AppsterModel from '../appster/AppsterModel.js'
import {AppsterGUIId, AppsterHTML} from '../appster/AppsterConstants.js'
import GoLogoLoLogo from './GoLogoLoLogo.js'
import AppsterController from '../appster/AppsterController.js'
import AppsterView from '../appster/AppsterView.js'

export default class GoLogoLoModel extends AppsterModel {
    constructor() {
        super();
        this.currentWork = null;
    }

    createNewWork(workName) {
        let newRandomText = new GoLogoLoText(workName);
        return newRandomText;
    }

    loadWorkData(workToLoad) {
        console.log("load " + workToLoad.getName());
    }

    makeColor(colorData) {
        return "rgb(" + colorData.red + ", " + colorData.green + ", " + colorData.blue + ")";
    }

    buildAppWork(workArray, name) {
        let appWork = new GoLogoLoLogo();

        // FIND THE WORK DATA FROM THE JSON OBJECT
        for (let i = 0; i < workArray.length; i++) {
            let jsonWork = workArray[i];
            if (jsonWork.name === name) {
                // WE'VE FOUND IT, NOW LOAD ALL OF ITS DATA
                appWork.setName(name);
                appWork.setText(jsonWork.text);
                appWork.setFontSize(jsonWork.font_size);
                appWork.setTextColor(jsonWork.text_color);
                appWork.setBackgroundColor(jsonWork.background_color);
                appWork.setBorderColor(jsonWork.border_color);
                appWork.setBorderRadius(jsonWork.border_radius);
                appWork.setBorderThickness(jsonWork.border_thickness);
                appWork.setPadding(jsonWork.padding);
                appWork.setMargin(jsonWork.margin);
            }
        }

        return appWork;
    }

    updateText() {
        this.view.updateText()
    }

    updateFontSize(){
        this.view.updateFontSize()
    }

    updateTextColor(){
        this.view.updateTextColor()
    }

    updateBackgroundColor(){
        this.view.updateBackgroundColor()
    }

    updateBorderColor(){
        this.view.updateBorderColor()
    }

    goList(title){
        console.log("In goList")
        let hold = true

        
        let nullCheck = this.getRecentWork(title)
        document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD).value = ""
        document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD_TO_SHORT).value = ""
        document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD_INVALID).value = ""
        
        
            
        if(title.length > 0 && nullCheck == null){
            hold = false
        }else{
            if(title.length <= 0){
                this.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL)
                this.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_INVALID)
                this.showDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TO_SHORT)
            }else{
                this.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL)
                this.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TO_SHORT)
                this.showDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_INVALID)
                
            }
        }
        
        if(!hold){
            this.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL)
            this.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TO_SHORT)
            this.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_INVALID)
            //create new Appwork object && prepend it to the list
            let logo_obj = new GoLogoLoLogo(title)
            this.prependWork(logo_obj)
             //go to the edit screen
            this.editWork(title)
        }
        

    }

    getWorkToEdit(){
        return this.currentWork
    }

    hideDialog(id){
        this.view.hideDialog(id)
    }

    showDialog(id){
        this.view.showDialog(id)
    }

    showEditTextDialog(id){
        let text = this.view.getText()
        document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD_NEW_NAME).value = text
        this.view.showDialog(id)

    }

    gologoloLogoEventHandler(){
        this.view.setupHandlers()
    }

    getCurrentWork(){
        return super.getCurrentWork()
    }

    

}