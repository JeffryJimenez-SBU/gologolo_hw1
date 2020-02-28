import {AppsterCallback, AppsterGUIId, AppsterHTML} from './AppsterConstants.js'
import AppsterView from '../appster/AppsterView.js'

export default class AppsterController {
    constructor() {
        this.model = null;
    }

    setModel(initModel) {
        this.model = initModel;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback);
    }

    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        //used to be .DIALOG_YES_BUTTON
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        //used to be .DiALOG NO BUTTON
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);

        //AND THE TEXT MODAL BUTTONS ************************
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_ENTER_MODAL]);
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_TEXT_MODAL])

        //AND THE TEXT short input MODAL BUTTONS 
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON_TO_SHORT, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_ENTER_MODAL_TO_SHORT]);
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON_TO_SHORT, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_TEXT_MODAL_TO_SHORT])

        //AND THE TEXT invalid input MODAL BUTTONS 
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON_INVALID, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_ENTER_MODAL_INVALID]);
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON_INVALID, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_TEXT_MODAL_INVALID])

        //test
        this.model.gologoloLogoEventHandler();
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON_NEW_NAME, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_TEXT_MODAL_NEW_NAME_CANCEL])
    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processGoEdit(workToEdit) {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }

    /**
     * This function is called when the user requests to create
     * new work.
     */
    processCreateNewWork = (event) => {
        console.log("processCreateNewWork");

        // PROMPT FOR THE NAME OF THE NEW LIST

        //get the Text Modal
        let modal_TextInput = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL)
        this.model.showDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL)
        
        

        // MAKE A BRAND NEW LIST
        //this.model.goList(workName);
    }

    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        console.log("processEditWork");

        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        console.log(workName + " clicked");

        // START EDITING THE SELECTED WORK
        this.model.editWork(workName);
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork = (event) => {
        // JUST HIDE THE DIALOG
        console.log("Process Cancel Delete Work")
        this.model.hideDialog(AppsterGUIId.APPSTER_YES_NO_MODAL)

    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork = (event) => {
        // DELETE THE WORK
        this.model.removeWork(this.model.getWorkToEdit());

        // GO BACK TO THE HOME SCREEN
        this.model.hideDialog(AppsterGUIId.APPSTER_YES_NO_MODAL)
        this.model.goHome();
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork = (event) => {
        // VERIFY VIA A DIALOG BOX
        console.log("Process  Delete Work")

        this.model.showDialog(AppsterGUIId.APPSTER_YES_NO_MODAL)
        //window.todo.model.view.showDialog();
    }

    /**
     * This function responds when the user presses the continue
     * on the AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON 
     * modal
     */
    processEnterModal = (event) =>{
        console.log("Process Enter Modal")

        this.model.goList(document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD).value)
    }

    /**
     * This function responds when the user presses the continue
     * on the AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON 
     * modal
     */
    processEnterModal_TO_SHORT = (event) =>{
        console.log("Process Enter Modal_TO_SHORT")

        this.model.goList(document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD_TO_SHORT).value)
    }


    /**
     * This function responds when the user presses the continue
     * on the AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON 
     * modal
     */
    processEnterModal_INVALID = (event) =>{
        console.log("Process Enter Modal_TO_SHORT")

        this.model.goList(document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD_INVALID).value)
    }


    /**
     * This function responds when the user presses cancel on 
     * the TextModal, and hides the modal
     */
    processCancelTextModal = (event) =>{
        console.log("Process Close Text Dialog")

       this.model.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL)
        
    }

    /**
     * This function responds when the user presses cancel on 
     * the TextModal, and hides the modal
     */
    processCancelTextModal_TO_SHORT = (event) =>{
        console.log("Process Close Text Dialog")

       this.model.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TO_SHORT)
        
    }

    /**
     * This function responds when the user presses cancel on 
     * the TextModal, and hides the modal
     */
    processCancelTextModal_INVALID = (event) =>{
        console.log("Process Close Text Dialog")

       this.model.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_INVALID)
        
    }

    

}