class Support {
    constructor(){
        // Set Intercom Settings (Before it is initialized)
        window.intercomSettings = window.intercomSettings || {};
        window.intercomSettings.hide_default_launcher = true;
    }
}

export default new Support();
