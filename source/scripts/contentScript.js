import browser from 'webextension-polyfill';
import { Indeed } from './sites/indeed';


window.onload = function() {
    
    const startup_msg = "========= Removature started up ========="; 
    const error_msg   = "=========== Removature Error ============";
    const finish_msg  = "==== Removature has finished running ====";

    console.log(startup_msg);

    main()
        .then(amount => { console.log("Removed", amount, "job listings from Revature"); })
        .catch(err => {
            console.log(error_msg);
            console.error(err);
        })
        .finally(() => {
            console.log(finish_msg);
        });
    
    /**
     * @returns {Promise<number>}
     */
    function main() {
        return browser.runtime.sendMessage(null, { request: "get-tab" }, null)
            .then(tab => {
                switch(true) {
                    case (tab.indexOf("indeed.com") > -1): return Indeed.removeElems();
                    default: return Promise.reject(new Error("Removature Error: Could not match url to supported site."))
                }
            });
    }
}