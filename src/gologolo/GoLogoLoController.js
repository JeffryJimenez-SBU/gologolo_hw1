import AppsterController from '../appster/AppsterController.js'

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

    
    // registerEventHandler(id, eventName){
                                    
    // }



}